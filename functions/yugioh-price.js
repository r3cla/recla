const fetch = require('node-fetch');

exports.handler = async function(event) {
    // Get the print tag from the query string
    const printTag = event.queryStringParameters.printTag;

    if (!printTag) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Print tag is required" })
        };
    }

    try {
        const response = await fetch(`https://yugiohprices.com/api/price_for_print_tag/${printTag}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data", details: error.message })
        };
    }
};