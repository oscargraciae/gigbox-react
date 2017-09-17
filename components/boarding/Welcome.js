import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonApp from '../general/ButtonApp';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };

    this.save = this.save.bind(this);
  }

  save() {
    this.props.nextSlide();
  }

  render() {
    const user = this.props.currentUser;
    return (
      <div>
        <h1 className="BoardingTitle">¡Bienvenido! Estamos contentos de que estes aquí {user.first_name}.</h1>
        {/*<p className="BoardingDescription">Gigbox te permite conectar con personas que pueden ayudarte a resolver tus problemas de una manera segura y confiable.</p>*/}
        <ButtonApp
          text="¡Comenzar!"
          buttonStyle="btn btn-primary btn-large"
          click={this.save}
          loading={this.state.isLoading}
        />

        <style jsx>{`
          .BoardingDescription {
            color: #333;
            font-size: 21px;
          }

          @media (max-width: 600px) {
            .BoardingDescription {
              color: #333;
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    );
  }
}

Welcome.propTypes = {
  currentUser: PropTypes.shape({}),
  nextSlide: PropTypes.func,
};

Welcome.defaultProps = {
  nextSlide: null,
  currentUser: {},
};

export default Welcome;
