import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

// Title, Description, image, url

function MetaPage(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <link rel="canonical" href={props.url} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="language" content="es" />
      <meta name="author" content="Gigbox" />
      <meta name="pagename" content="Gigbox" />
      <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

      {/* Twitter Card */}
      <meta name="twitter:card" value="summary" />
      <meta name="twitter:site" value="@gigbox_mx" />
      <meta name="twitter:creator" value="@gigbox_mx" />
      <meta name="twitter:url" value={`${props.url}`} />
      <meta name="twitter:title" value={`${props.title}`} />
      <meta name="twitter:description" value={`${props.description}`} />
      <meta name="twitter:image" value={props.image} />
      <meta name="twitter:summary" value={props.description} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${props.title}`} />
      <meta property="og:description" content={`${props.description}`} />
      <meta property="og:image" content={`${props.image}`} />
      <meta property="og:url" content={`${props.url}`} />
      <meta property="og:site_name" content="Gigbox" />
      <meta property="og:locale" content="es" />
    </Head>
  );
}

export default MetaPage;
