import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import api from '../api';
import defaultPage from '../hocs/defaultPage';
import ServiceCardSmall from '../components/common/ServiceCardSmall';

class User extends React.Component {
  static async getInitialProps({ query }) {
    const [
      user,
      services,
    ] = await Promise.all([
      api.user.get(query.username),
      api.user.getServices(query.username),
    ]);
    return { services, user };
  }

  render() {
    return (
      <div>
        <Head>
          <title>Perfil de {this.props.user.first_name} - Gigbox</title>
          { this.props.user.description ?
            <meta name="description" content={this.props.user.description.substr(0, 156)} /> :
            <meta name="description" content={`Hola soy ${this.props.user.first_name}, únete a gigbox para encontrar y contrata a expertos en eventos, clases, negocios, tecnología, economía, deporte, fotografía y mucho más.`} />
          }
          <link rel="canonical" href={`/u/${this.props.user.username}`} />
        </Head>
        <section className="User">
          <div className="container container-margin-top">
            <div className="User-left col-md-2 text-center">
              <div className="User-avatar">
                <img
                  src={this.props.user.avatar}
                  alt="Oscar Gracia" height="165" width="165"
                />
              </div>
              <a href={`/conversation/${this.props.user.username}`} className="btn btn-principal btn-lg">Contactar</a>
            </div>
            <div className="User-right col-lg-9 col-md-8 col-sm-12 user-profile-info">
              <div className="User-data">
                <h1>¡Hola, soy {this.props.user.first_name}!</h1>
                <div className="User-address">
                  <span>
                    <i className="fa fa-map-marker" aria-hidden="true" /> {this.props.user.address}
                  </span>
                </div>
                <div className="User-description">
                  <p>{this.props.user.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section>
            <div className="row">
              <h3 className="tite">Servicios de {this.props.user.first_name} </h3>
              {this.props.services.slice(0, 16).map(item => (
                <div className="col-md-3" key={item.id}>
                  <ServiceCardSmall service={item} key={item.id} />
                </div>
                ))
              }
            </div>
          </section>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.string,
  }),
  services: PropTypes.arrayOf(
    PropTypes.object,
  ),

};

User.defaultProps = {
  services: {},
  user: {},
};

export default defaultPage(User);
