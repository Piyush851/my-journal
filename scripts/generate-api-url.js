// scripts/generate-api-url.js

const os = require('os');
const fs = require('fs');
const path = require('path');

// Get the first WiFi IPv4 address
function getLocalIP() {
    const nets = os.networkInterfaces();
    let localIP = null;

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (
                net.family === 'IPv4' &&
                !net.internal &&
                (name.includes("Wi-Fi") || name.includes("Wireless") || name.includes("Ethernet"))
            ) {
                localIP = net.address;
            }
        }
    }

    return localIP;
}

const ip = getLocalIP();
if (!ip) {
    console.error("❌ Could not detect local IP address.");
    process.exit(1);
}

const apiUrl = `http://${ip}:5000/api`;

const outputPath = path.join(__dirname, "../src/config/apiConfig.js");
const fileContent = `export const API_URL = "${apiUrl}";\n`;

fs.writeFileSync(outputPath, fileContent);

console.log(`✅ API URL generated: ${apiUrl}`);
