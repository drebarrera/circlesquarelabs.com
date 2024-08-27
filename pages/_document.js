import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>CircleSquare Labs</title>
        <meta name="description" content="At CircleSquare Labs, we believe in the power of well-rounded solutions to drive innovation and impact. We are a full-service technology firm dedicated to helping businesses and communities thrive in the digital age." />
        <meta name="keywords" content="Software Engineering, Product Design, Software, Development, Engineering, Product, Design, Startups, Austin, Texas" />
        <meta name="author" content="Andres Barrera" />
        <meta property="og:title" content="CircleSquare Labs" />
        <meta property="og:description" content="At CircleSquare Labs, we believe in the power of well-rounded solutions to drive innovation and impact. We are a full-service technology firm dedicated to helping businesses and communities thrive in the digital age." />
        <meta property="og:image" content="/title_card.png" />
        <meta property="og:url" content="https://www.circlesquarelabs.com" />
        <meta name="twitter:card" content="At CircleSquare Labs, we believe in the power of well-rounded solutions to drive innovation and impact. We are a full-service technology firm dedicated to helping businesses and communities thrive in the digital age." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
