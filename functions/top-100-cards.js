export const handler = async (event) => {
    console.log('Top 100 Cards function invoked');

    try {
        const fetch = (await import('node-fetch')).default;
        const apiUrl = 'http://yugiohprices.com/api/top_100_cards';
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
        console.log('API response data received');

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