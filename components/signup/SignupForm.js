import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';

import ButtonApp from '../general/BlockButton';
import TextFieldGroup from '../general/TextFieldGroup';
import validateInput from '../../validations/signup';

import { userSignupRequest } from '../../actions/signupActions';
import { login } from '../../actions/loginActions';

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      errors: {},
      isLoading: false,
      messageError: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then((res) => {
        if (res.status === 'error') {
          this.setState({ messageError: res.message, isLoading: false });
          return false;
        }
        this.props.login(this.state.email, this.state.password).then(() => {
          Router.push({ pathname: '/welcome', query: { ref: this.props.serviceRef } });
        });
      });
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors } = this.state;
    return (
      <form className="signupForm" onSubmit={this.onSubmit}>
        { this.state.messageError && <div className="alert alert-danger">{ this.state.messageError }</div> }
        <TextFieldGroup
          error={errors.first_name}
          value={this.state.first_name}
          onChange={this.onChange}
          type="text"
          name="first_name"
          label="Nombre"
          focus={true}
        />
        <TextFieldGroup
          error={errors.last_name}
          value={this.state.last_name}
          onChange={this.onChange}
          type="text"
          name="last_name"
          label="Apellido"
        />
        <TextFieldGroup
          error={errors.email}
          value={this.state.email}
          onChange={this.onChange}
          type="email"
          name="email"
          label="Correo electrónico"
        />
        <TextFieldGroup
          error={errors.password}
          value={this.state.password}
          onChange={this.onChange}
          type="password"
          name="password"
          label="Contraseña"
        />
        <ButtonApp
          text="¡Registrarme!"
          buttonStyle="btn btn-primary btn-large btn-block"
          loading={this.state.isLoading}
        />

        {/*<div className="hr">
          <div className="inner">o</div>
        </div>
        <div className="controls controls-small">
          <a className="btn-social btn-social-facebook">Registrarme con Facebook</a>
        </div>*/}

        <div className="controls-small">
          <p className="lbl-terms">
            <span> Al registrarte, confirmas que aceptas los <a className="lbl-principal" href="/app/terms_of_service"> Términos y condiciones </a> y la <a className="lbl-principal" href="/app/privacy-policy"> Política de privacidad</a>.</span>
          </p>
        </div>

        <style jsx>{`
          .lbl-terms{
            font-size: 14px;
            text-align: center;
          }

        `}</style>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.get('auth'),
  };
}


export default connect(mapStateToProps, { userSignupRequest, login })(SignupForm);
