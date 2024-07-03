const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Get the print tag from the query string
    const printTag = event.queryStringParameters.printTag;

    if (!printTag) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Print tag is required" })
        };
    }

    try {
        const response = await fetch(`http://yugiohprices.com/api/price_for_print_tag/${printTag}`);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" })
        };
    }
};