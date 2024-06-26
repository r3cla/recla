const fetch = require('node-fetch');

exports.handler = async (event) => {
    const secretKey = 'your-secret-key';
    const token = JSON.parse(event.body)['cf-turnstile-response'];

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret: secretKey,
            response: token
        })
    });

    const data = await response.json();

    if (data.success) {
        // Handle successful form submission (e.g., send an email, store in a database, etc.)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Form submitted successfully' })
        };
    } else {
        // Handle failed verification
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Verification failed' })
        };
    }
};
