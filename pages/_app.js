import Head from 'next/head';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      <title>CircleSquare Labs</title>
        <meta name="description" content="CircleSquare Labs is an Austin, Texas based full-service technology firm offering web development, app development, cloud solutions, full-stack engineering, brand design, and data processing to drive business success." />
        <meta name="keywords" content="Full-service technology firm, Web development, Custom software development, Cloud solutions, Full-stack engineering, Brand identity design, Data processing, API development, App development, Business digital transformation, Scalable web apps, Microservices, Data analytics, UX/UI design, Startups tech solutions, Technology consulting, Austin web development" />
        <meta name="author" content="Andres Barrera" />
        <meta property="og:title" content="CircleSquare Labs" />
        <meta property="og:description" content="CircleSquare Labs is an Austin, Texas based full-service technology firm offering web development, app development, cloud solutions, full-stack engineering, brand design, and data processing to drive business success." />
        <meta property="og:image" content="/title_card.png" />
        <meta property="og:url" content="https://www.circlesquarelabs.com" />
        <meta name="twitter:card" content="CircleSquare Labs is an Austin, Texas based full-service technology firm offering web development, app development, cloud solutions, full-stack engineering, brand design, and data processing to drive business success." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
