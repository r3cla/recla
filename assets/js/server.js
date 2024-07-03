const express = require('express');
const fetch = require('node-fetch'); // Install this using `npm install node-fetch`
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/proxy/:printTag', async (req, res) => {
    const { printTag } = req.params;
    try {
        const response = await fetch(`https://yugiohprices.com/api/price_for_print_tag/${printTag}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
