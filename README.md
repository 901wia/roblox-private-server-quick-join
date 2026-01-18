# Roblox Private Server Quicker Join

A fast Roblox private/share server joiner that makes connecting to Roblox servers quicker and easier. This script is designed to work seamlessly on various browsers using Tampermonkey.

![Roblox Quick Join Icon](https://raw.githubusercontent.com/901wia/roblox-private-server-quick-join/refs/heads/main/icon.png)

## Features

* **Fast Roblox Private Server Joining**: Instantly join private servers with a simple click.
* **Support for Share Links**: Join servers directly via share links.
* **Automatic Handling of URL Parameters**: Supports both new and old Roblox server links.
* **Cross-Browser Support**: Works on multiple browsers with Tampermonkey.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Supported Browsers](#supported-browsers)
* [How It Works](#how-it-works)
* [Customization](#customization)
* [Risks and Warnings](#risks-and-warnings)
* [License](#license)

## Installation

### Prerequisites:

1. **Tampermonkey**: A browser extension that allows you to run custom scripts on websites. It is available for all major browsers.

   * **[Tampermonkey for Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome)**
   * **[Tampermonkey for Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox)**
   * **[Tampermonkey for Safari](https://tampermonkey.net/?ext=dhdg&browser=safari)**
   * **[Tampermonkey for Edge](https://tampermonkey.net/?ext=dhdg&browser=edge)**

### Steps:

1. Install **Tampermonkey** on your browser.
2. Visit this GitHub repository: [Roblox Private Server Quick Join](https://github.com/901wia/roblox-private-server-quick-join)
3. Click the **Raw** button to view the script.
4. Tampermonkey will automatically detect the script. Click **Install** to add it to Tampermonkey.
5. Once installed, the script will automatically run whenever you visit a Roblox private/share server link.

## Usage

Once the script is installed, the following steps will guide you through using it:

1. **Open Roblox** in your browser.
2. Navigate to any Roblox private server or share link:

   * A private server link format: `https://www.roblox.com/games/1234567890/PrivateServer?code=XYZ`
   * A share server link format: `https://www.roblox.com/share?code=XYZ`
3. The script will automatically detect the link and prompt the Roblox client to open the private server.
4. You can also navigate directly to private servers via their respective share codes. The script will handle the rest.

### Features in Action:

* **Automatic Server Join**: The script bypasses unnecessary steps and connects you directly to the server.
* **History Cleanup**: After joining, the script removes the server’s URL from the browser history for a cleaner experience.
* **Multi-Server Support**: Whether you're joining a share link or an old-style private server, the script adapts accordingly.

## Supported Browsers

The script is compatible with all major browsers, but requires **Tampermonkey** to function. Here's a list of browsers you can use:

* **Google Chrome**: Supports all features. Install Tampermonkey from [Chrome Web Store](https://tampermonkey.net/?ext=dhdg&browser=chrome).
* **Mozilla Firefox**: Fully supported. Install Tampermonkey from [Firefox Add-ons](https://tampermonkey.net/?ext=dhdg&browser=firefox).
* **Microsoft Edge**: Fully supported. Install Tampermonkey from [Edge Add-ons](https://tampermonkey.net/?ext=dhdg&browser=edge).
* **Safari**: Supported with slight limitations. Install Tampermonkey from [Safari Extensions](https://tampermonkey.net/?ext=dhdg&browser=safari).

**Note**: The script uses features that are best supported in Chromium-based browsers (Chrome, Edge) and Firefox.

## How It Works

1. **Decoding Server Links**: When you visit a Roblox server link with the `code` or `privateServerLinkCode`, the script decodes it to extract the necessary server information.
2. **Fast Joining**: Upon detecting a valid link, the script redirects your browser to launch the Roblox client using a deep link (`roblox://`), joining the server directly.
3. **Broadcast Channel**: The script uses the `BroadcastChannel` API to ensure that multiple tabs can work together efficiently without interfering with each other.

### How the Script Works Behind the Scenes:

* It captures URL parameters like `code`, `privateServerLinkCode`, and `type`.
* Uses **fetch** to decode the share link and get the `placeId`.
* Launches the Roblox game using `roblox://experiences/start`.
* Clears the URL parameters to keep the browser clean.

## Customization

If you'd like to modify the script or adjust its settings, you can change the following parameters inside the code:

```javascript
const CFG = {
    fastLaunch: true,           // Enables fast launch of servers
    fetchTimeout: 220,          // Timeout for fetching the server link
    maxDecode: 2,              // Maximum retries for decoding the link
    lockKey: 'rbx_qj_lock',    // Session lock key for preventing duplicate joins
    channel: 'rbx_qj_bc'       // BroadcastChannel name for multi-tab support
};
```

Feel free to adjust these values to fit your needs. To do this:

1. Open the script in Tampermonkey.
2. Edit the configuration values as needed.
3. Save and refresh your browser for the changes to take effect.

## Risks and Warnings

**Please read carefully before using this script:**

1. **Privacy and Security**: This script interacts with Roblox's URLs and external server links. Ensure that the links you are visiting are from trusted sources. Using the script on untrusted or malicious links could put your personal data or account at risk.

2. **Bypassing Roblox’s Security**: The script bypasses certain steps in joining Roblox servers. While this improves usability, be aware that Roblox may flag accounts that frequently join private servers without following normal procedures. **Use responsibly.**

3. **Tampermonkey Extension Risks**: By installing Tampermonkey and running scripts from the web, you are granting the script certain permissions. Ensure you only install scripts from trusted sources to minimize security risks. **Never share or install untrusted scripts**.

4. **Roblox Terms of Service**: Using this script may violate Roblox's Terms of Service, especially if it automates or bypasses certain platform functions. **Use at your own risk**. Always ensure you're following Roblox's rules and guidelines when using third-party tools or scripts.

5. **Cross-Browser Compatibility**: While the script is designed to be cross-browser compatible, certain features (such as `BroadcastChannel`) may not work perfectly across all browsers. **Test thoroughly** on your preferred browser to ensure functionality.

## License

This project is open-source and released under the [MIT License](LICENSE).
