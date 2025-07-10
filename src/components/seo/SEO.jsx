// src/components/SEO.jsx
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
}) {
  const fullTitle = `${title} | GST Global Standard Technology Saudi Arabia`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="GST Global Standard Technology Saudi Arabia" />
      {image && <meta property="og:image" content={image} />}
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="GST Global Standard Technology Saudi Arabia" />
      <link rel="icon" href="/Logo.png" />
    </Helmet>
  );
}
