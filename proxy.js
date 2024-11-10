const express = require('express');
const request = require('request-promise');
const app = express();
const port = 3000;

// Serve static files (like index.html, CSS, JS) from the current directory
app.use(express.static('public'));

// Proxy route to handle site redirection
app.get('/proxy', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('No URL provided');
    }

    try {
        // Fetch the content from the provided URL
        const response = await request(url);

        // Send the content back to the client
        res.send(response);
    } catch (error) {
        console.error('Error fetching the URL:', error);
        res.status(500).send('Error fetching the website.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
