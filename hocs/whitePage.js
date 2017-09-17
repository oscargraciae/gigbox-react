import React from 'react';
import Head from 'next/head';
import axios from 'axios';

import { getTokenFromCookie, getUserFromLocalStorage } from '../utils/auth';

export default View => class WhitePage extends React.Component {
  static async getInitialProps(context) {
    const loggedUser = process.browser ?
      getUserFromLocalStorage() :
      getTokenFromCookie(context.req);

    const props = await View.getInitialProps(context);
    return {
      ...props,
      loggedUser,
      currentUrl: context.pathname,
      isAuthenticated: !!loggedUser,
    };
  }

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  render() {
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" type="image/png" href="/static/favicon.png" />
          <link href="https://unpkg.com/normalize.css@5.0.0/normalize.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
          <link rel="stylesheet" href="static/cropper.css" />

          <script src="https://use.fontawesome.com/f24acb12d1.js" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />

          <title>Gigbox</title>
          <meta
            name="description"
            content="Encuentra y contrata a expertos en eventos, clases, negocios, tecnología, economía, deporte, fotografía y mucho más."
          />
        </Head>
        <div className="page">
          <View {...this.props} />
        </div>

        <style global jsx>{`
          .page {
            background: #FFFFFF;
          }

          .btn-primary {
            border-color: #cc1433 !important;
            background-color: #ff1940 !important;
            color: #fff;
          }

          .btn-primary:hover {
            background-color: #cc1433 !important;
          }

          .btn-large {
            padding: 10px 32px;
            font-size: 16px;
          }

          .btn-block {
            display: block;
            white-space: normal;
            width: 100%;
          }

          @media (max-width: 600px) {
            h1 {
              font-size: 21px;
            }

            h2 {
              font-size: 16px;
            }
          }

        `}</style>
      </div>
    );
  }
};
