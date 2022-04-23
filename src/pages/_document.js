import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Kanit&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap"
          />

          {/* Uncomment to add favicons for other platforms */}
          {/* These files can be generated with realfavicongenerator.net */}
          {/*
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/safari-pinned-tab.svg" rel="mask-icon" color="#4a9885" />
          <link href="/site.webmanifest" rel="manifest" />
          */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
