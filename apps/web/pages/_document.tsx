import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oxygen&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="/sigma-logo.svg"
          type="image/x-icon"
          sizes="any"
        />
        <meta
          name="description"
          content="Project Roadmaps is a project management tool that allows you to manage your projects and tasks in a simple and intuitive way"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
