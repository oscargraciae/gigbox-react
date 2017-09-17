import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import ReactGA from 'react-ga';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NavbarCategories from '../components/NavbarCategories';
import NavCategories from '../components/NavCategories';

import { getTokenFromCookie, getUserFromLocalStorage } from '../utils/auth';
import { initGA, logPageView } from '../config/analytics';


export default Page => class DefaultPage extends React.Component {
  static async getInitialProps(context) {
    const loggedUser = process.browser ?
      getUserFromLocalStorage() :
      getTokenFromCookie(context.req);

    const props = await Page.getInitialProps(context);
    const token = loggedUser;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    return {
      ...props,
      loggedUser,
      currentUrl: context.pathname,
      isAuthenticated: !!loggedUser,
    };
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-site-verification" content="lBu2nAe5n_H7IUWfZGAKyQ19J0G6lTE1WHK21-pdx2w" />
          {/*<meta name="google-site-verification" content="FDESHW7SpKGoCTPm-N6NrNzOugFkhQhaxYkJpCnnxBs" />*/}
          <link href="https://unpkg.com/normalize.css@5.0.0/normalize.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

          <link rel="stylesheet" href="/static/style.css" />
          <link rel="shortcut icon" type="image/png" href="/static/favicon.png" />

          <script src="https://use.fontawesome.com/f24acb12d1.js" />
          <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-yTAH4cD5Lq3VDwysl-Me5bBek1phNBY&libraries=places" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/1.1.7/typed.min.js" />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />

        </Head>
        <Header {...this.props} />
        <div className="page">
          <NavCategories />
          <Page {...this.props} />
          <Footer />
        </div>

        <style jsx global>{`
          .page {
            background: #FFFFFF;
          }

          .lbl-blue {
            color: #24a1b2;
          }

          .lbl-danger {
            color: #ed5a5a;
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
              font-size: 16px;
            }

            h2 {
              font-size: 14px;
            }
          }

        `}</style>
      </div>
    );
  }
};

