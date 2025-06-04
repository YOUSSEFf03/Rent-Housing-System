import { WebView } from 'react-native-webview';

const EmbeddedMap = ({ locationLink }) => {
    return (
        <WebView
            style={{ height: 300, width: '100%' }}
            source={{
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width">
                </head>
                <body style="margin:0;padding:0;">
                    <iframe
                        src="${locationLink}"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </body>
                </html>
                `,
            }}
        />
    );
};

export default EmbeddedMap;