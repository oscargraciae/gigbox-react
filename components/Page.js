import React from 'react';

import { getUserFromCookie, getUserFromLocalStorage } from '../utils/auth'

import Meta from './Meta';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavbarCategories from './NavbarCategories';

export default class Page extends React.Component {
  static async getInitialProps() {
    const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req);
    // const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
    return {
      loggedUser,
      isAuthenticated: !!loggedUser,
    };
  }

  render() {
    return (
      <div>
        <Meta />
        <Header />
        <div className="page">
          <NavbarCategories />
          { this.props.children }
          <h1>Prueba {this.props.loggedUser}</h1>
        </div>
        <Footer />
        <style jsx>{`
          .page {
            padding-top: 50px;
          }
        `}</style>
      </div>
    );
  }
}
