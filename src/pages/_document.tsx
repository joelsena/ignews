import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="icon" href="/favicon.png" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
