// import libraries
import React from 'react';

// import local libraries
import api from '../api';

// import componets
import defaultPage from '../hocs/defaultPage';
import TableServices from '../components/services/TableServices';

class Services extends React.Component {
  static async getInitialProps() {
    const services = await api.services.getMyServices();
    return { services };
  }

  render() {
    return (
      <div>
        <div className="container container-margin-top">
          <div className="headerPage">
            <h2 className="titlePage">Mis servicios</h2>
            <a className="btn btn-principal">Crear nuevo servicio</a>
          </div>
          <div className="contentPage">
            <TableServices services={this.props.services} />
          </div>
        </div>
        <style jsx>{`
          .headerPage {
            padding: 10px 0px;
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </div>
    );
  }
}

export default defaultPage(Services);
