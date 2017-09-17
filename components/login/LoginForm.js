import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { login } from '../../actions/loginActions';

import ButtonApp from '../general/BlockButton';
import TextFieldGroup from '../general/TextFieldGroup';
import validateInput from '../../validations/login';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      messageError: '',
      isLoading: false,
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
      this.props.login(this.state.email, this.state.password).then((res) => {
        if (res.data.status === 'error') {
          this.setState({ messageError: res.data.message, isLoading: false });
          return;
        }
        this.setState({ isLoading: false });
        Router.push({ pathname: '/' });
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
          error={errors.email}
          value={this.state.email}
          onChange={this.onChange}
          type="email"
          name="email"
          label="Correo electrónico"
          focus={true}
        />
        <TextFieldGroup
          error={errors.password}
          value={this.state.password}
          onChange={this.onChange}
          type="password"
          name="password"
          label="Contraseña"
        />
        <div className="lblRemember">
          <a onClick={this.props.clickRemember}>¿Olvidaste tu contraseña?</a>
        </div>
        <ButtonApp
          text="¡Ingresar!"
          buttonStyle="btn btn-primary btn-large btn-block"
          click={this.handlerLogin}
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

          .lblRemember {
            text-align: right;
          }

          .lblRemember > a {
            color: #757575;
            text-decoration: underline;
          }
        `}</style>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.get('auth'),
  };
}

export default connect(mapStateToProps, { login })(LoginForm);;
