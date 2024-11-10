// proxy.js

const express = require('express');
const request = require('request-promise');
const app = express();
const port = 3000;

// Serve static files (like your HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const url = req.query.url; // Get the URL from the query parameter
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // Fetch the website content and return it as a response
        const html = await request(url);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the website');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});

