/**
 * @typedef {Object} NetlifyEvent
 * @property {Object} queryStringParameters
 * @property {string} queryStringParameters.printTag
 */

/**
 * @param {NetlifyEvent} event
 */
export const handler = async (event) => {
    console.log('Function invoked with event:', JSON.stringify(event));

    const printTag = event.queryStringParameters?.printTag;

    if (!printTag) {
        console.log('Error: Print tag is required');
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Print tag is required" })
        };
    }

    console.log(`Fetching data for print tag: ${printTag}`);

    try {
        const fetch = (await import('node-fetch')).default;
        const apiUrl = `https://yugiohprices.com/api/price_for_print_tag/${printTag}`;
        console.log(`Calling API: ${apiUrl}`);

        const response = await fetch(apiUrl);
        console.log(`API response status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API error: ${errorText}`);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "API request failed", details: errorText })
            };
        }

        const data = await response.json();
        console.log('API response data:', JSON.stringify(data));

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Unexpected error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "An unexpected error occurred", details: error.message })
        };
    }
};