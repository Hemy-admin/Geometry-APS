// Import necessary modules
const express = require('express');
const { AuthClientTwoLegged } = require('forge-apis'); // Autodesk Forge SDK (APS SDK)

const app = express();

// Get APS credentials from environment variables
const APS_CLIENT_ID = process.env.APS_CLIENT_ID;
const APS_CLIENT_SECRET = process.env.APS_CLIENT_SECRET;
const APS_CALLBACK_URL = process.env.APS_CALLBACK_URL;

// Verify that all required environment variables are set
if (!APS_CLIENT_ID || !APS_CLIENT_SECRET || !APS_CALLBACK_URL) {
    console.error("ERROR: Missing APS environment variables.");
    process.exit(1); // Exit the app if required environment variables are missing
}

// Configure APS Authentication
const authClient = new AuthClientTwoLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, [
    'data:read',
    'data:write'
], true);

// Example route that uses APS Authentication
app.get('/api/authenticate', async (req, res) => {
    try {
        const credentials = await authClient.authenticate();
        res.json({
            access_token: credentials.access_token,
            expires_in: credentials.expires_in
        });
    } catch (error) {
        console.error("Authentication failed:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
