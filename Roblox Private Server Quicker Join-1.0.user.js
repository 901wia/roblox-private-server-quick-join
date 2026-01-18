// ==UserScript==
// @name         Roblox Private Server Quicker Join
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  fast Roblox private/share server joiner (open-source)
// @author       901wia
// @match        https://www.roblox.com/*
// @match        http://www.roblox.com/*
// @grant        none
// @run-at       document-start
// @icon         https://raw.githubusercontent.com/901wia/roblox-private-server-quick-join/refs/heads/main/icon.png
// ==/UserScript==

(function () {
    'use strict';

    const CFG = {
        fastLaunch: true,
        fetchTimeout: 220,
        maxDecode: 2,
        lockKey: 'rbx_qj_lock',
        channel: 'rbx_qj_bc'
    };

    const lock = {
        set: () => { try { sessionStorage.setItem(CFG.lockKey, '1'); } catch {} },
        clr: () => { try { sessionStorage.removeItem(CFG.lockKey); } catch {} },
        has: () => { try { return !!sessionStorage.getItem(CFG.lockKey); } catch { return false; } }
    };

    let bc;
    try {
        bc = new BroadcastChannel(CFG.channel);
        bc.onmessage = e => {
            if (e.data === 1) lock.set();
            if (e.data === 0) lock.clr();
        };
    } catch {}

    if (lock.has()) return;
    lock.set();
    if (bc) try { bc.postMessage(1); } catch {}

    const u = new URL(location.href);
    const p = u.pathname;
    const sp = u.searchParams;

    const code = sp.get('code');
    const pslc = sp.get('privateServerLinkCode');
    const type = sp.get('type') || 'Server';

    const isShare = p === '/share' && code;
    const isOld = p.startsWith('/games/') && pslc;

    if (!isShare && !isOld) {
        lock.clr();
        if (bc) try { bc.postMessage(0); } catch {}
        return;
    }

    const launch = url => { try { location.href = url; } catch {} };

    const clean = url => {
        try { history.replaceState(null, '', url || u.origin + '/'); } catch {}
    };

    const fetchTO = (url, opt, t) => {
        const c = new AbortController();
        const id = setTimeout(() => c.abort(), t);
        return fetch(url, { ...opt, signal: c.signal }).finally(() => clearTimeout(id));
    };

    const decode = async link => {
        for (let i = 0; i < CFG.maxDecode; i++) {
            try {
                const r = await fetchTO(
                    u.origin + '/sharing/link/decode',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ link }),
                        credentials: 'same-origin'
                    },
                    CFG.fetchTimeout
                );
                if (!r.ok) continue;
                const j = await r.json();
                return j?.encodedPlaceId || j?.placeId || null;
            } catch {
                await new Promise(r => setTimeout(r, 30));
            }
        }
        return null;
    };

    (async () => {
        try {
            if (isOld) {
                const parts = p.split('/').filter(Boolean);
                const placeId = parts[1];
                launch(`roblox://experiences/start?placeId=${placeId}&privateServerLinkCode=${pslc}`);
                clean(`${u.origin}/games/${placeId}/`);
                return;
            }

            if (isShare) {
                launch(`roblox://navigation/share_links?code=${code}&type=${type}`);
                launch(`roblox://navigation/share_links?code=${code}`);

                const shareUrl = `${u.origin}/share?code=${code}&type=${type}`;
                const placeId = await decode(shareUrl);

                if (placeId) {
                    launch(`roblox://experiences/start?placeId=${placeId}`);
                    clean(`${u.origin}/games/${placeId}/`);
                } else {
                    clean(shareUrl);
                }

                const scrub = () => {
                    try {
                        const x = new URL(location.href);
                        if (x.searchParams.has('privateServerLinkCode')) {
                            x.searchParams.delete('privateServerLinkCode');
                            history.replaceState(null, '', x.toString());
                        }
                    } catch {}
                };

                const mo = new MutationObserver(scrub);
                mo.observe(document, { childList: true, subtree: true });
                setTimeout(() => mo.disconnect(), 1200);
            }
        } finally {
            lock.clr();
            if (bc) try { bc.postMessage(0); } catch {}
        }
    })();
})();
