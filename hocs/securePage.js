import React from 'react';

import NotAuthorized from '../components/NotAuthorized';
import defaultPage from './defaultPage';

const securePageHoc = Page => class SecurePage extends React.Component {
  static getInitialProps (ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx)
  }

  render () {
    if (!this.props.isAuthenticated) {
      return <h2>No autorizado</h2>
    }
    return <Page {...this.props} />
  }
}

export default Page => securePageHoc(Page);
