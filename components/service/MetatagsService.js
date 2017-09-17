import React from 'react';
import PropTypes from 'prop-types';

function MetatagsService(props) {
  const { service } = props;
  return (
    <meta
      name="language"
      content="es"
    />
    <meta
      name="author"
      content="Gigbox"
    />
    <meta
      name="pagename"
      content="Gigbox"
    />
    <meta
      name="HandheldFriendly"
      content="True"
    />
    <meta
      name="MobileOptimized"
      content="320"
    />
    <meta
      name="apple-mobile-web-app-title"
      content="Gigbox"
    />
    <meta
      content="IE=edge,chrome=1"
      httpEquiv="X-UA-Compatible"
    />
    {/* Twitter Card */}
    <meta
      name="twitter:card"
      value="summary"
    />
    <meta
      name="twitter:site"
      value="@gigbox"
    />
    <meta
      name="twitter:creator"
      value="@gigbox"
    />
    <meta
      name="twitter:url"
      value="https://gigbox.mx/"
    />
    <meta
      name="twitter:title"
      value="Gigbox"
    />
    <meta
      name="twitter:description"
      value="Prueba"
    />
    <meta
      name="twitter:image"
      value="/static/og.png"
    />
    <meta
      name="twitter:summary"
      value="Diplomado de desarrollo de aplicaciones con React.js"
    />
    {/* OpenGraph */}
    <meta
      property="og:type"
      content="website"
    />
    <meta
      property="og:title"
      content="Gigbox"
    />
    <meta
      property="og:description"
      content="Gigbox"
    />
    <meta
      property="og:image"
      content="/static/logo-gigbox2.png"
    />
    <meta
      property="og:url"
      content="https://platzi-music.now.sh/"
    />
    <meta
      property="og:site_name"
      content="Gigbox"
    />
    <meta
      property="og:locale"
      content="es"
    />
  );
}

export default InfoService;
