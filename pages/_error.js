import React from 'react';

import defaultPage from '../hocs/defaultPage';

class Error extends React.Component {
  static getInitialProps({ res, jsonPageRes }) {
    const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null);
    return { statusCode };
  }

  render() {
    return (
      <div className="container-white">
        <div className="container container-margin-top container-padding">
          <h1>Oops! :(</h1>
          <h2>No hemos podido encontrar la página que buscas.</h2>
          <h6>Código de error: 404</h6>
          <a href="/" className="lbl lbl-principal">Inicio</a>
        </div>
        <style jsx>{`
          h1 {
            font-size: 145px;
            font-weight: 700;
          }

          h2 {
            font-size: 32;
          }

          h6 {
            font-size: 14px;
            font-weight: bold;
          }

          .container-padding {
            padding: 80px 10px;
          }

          @media (max-width: 600px) {
            h1 {
            font-size: 32px;
            font-weight: 700;
          }
          }
        `}</style>
      </div>
    )
  }
}

export default defaultPage(Error);
