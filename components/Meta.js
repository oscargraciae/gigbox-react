import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function Meta(props) {
  return (
    <Head>
      <title>{props.service.name} en {props.service.user.address} - Gigbox</title>
      <meta name="description" content={props.service.description.substr(0, 155)} />
      <link rel="canonical" href={`https://gigbox.mx/service/${props.service.id}`} />

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
      <meta name="twitter:url" value={`https://gigbox.mx/service/${props.service.id}`} />
      <meta name="twitter:title" value={`${props.service.name} en www.gigbox.mx`} />
      <meta name="twitter:description" value={`${props.service.description.substr(0, 80)}`} />
      <meta name="twitter:image" value={props.service.cover} />
      <meta name="twitter:summary" value={props.service.description.substr(0, 80)} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${props.service.name} en www.gigbox.mx`} />
      <meta property="og:description" content={`${props.service.description.substr(0, 80)}`} />
      <meta property="og:image" content={`${props.service.cover}`} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta property="og:url" content={`https://gigbox.mx/service/${props.service.id}`} />
      <meta property="og:site_name" content="Gigbox" />
      <meta property="og:locale" content="es" />
    </Head>
  );
}

Meta.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
    user: PropTypes.shape({ address: PropTypes.string }),
  }),
};

Meta.defaultProps = {
  service: {},
  name: '',
  user: {},
};

export default Meta;
