// globalSetup.js
const { FullConfig } = require("@playwright/test");
const dotenv = require('dotenv');
const path = require('path');

async function globalSetup(config) {
    try {
        // Load .env file with error handling
        const result = dotenv.config({
            path: path.resolve(process.cwd(), '.env'),
            override: true
        });

        // Check if there was an error loading the .env file
        if (result.error) {
            throw new Error(`Error loading .env file: ${result.error.message}`);
        }
        console.log("Environment variables loaded successfully.");
        
    } catch (error) {
        console.error("Failed to set up environment variables:", error.message);
        throw error;  
    }
}

module.exports = globalSetup;