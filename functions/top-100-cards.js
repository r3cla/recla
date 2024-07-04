export const handler = async (event) => {
    console.log('Top 100 Cards function invoked');

    try {
        const fetch = (await import('node-fetch')).default;
        const apiUrl = 'http://yugiohprices.com/api/top_100_cards';
        console.log(`Calling API: ${apiUrl}`);

        const response = await fetch(apiUrl);
        console.log(`API response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response received successfully');

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error in Top 100 Cards function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', error: error.message })
        };
    }
};