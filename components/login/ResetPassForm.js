import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { login } from '../../actions/loginActions';
import api from '../../api';

import ButtonApp from '../general/BlockButton';
import TextFieldGroup from '../general/TextFieldGroup';
import validateInput from '../../validations/resetPassword';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      messageError: '',
      isLoading: false,
      send: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      const response = await api.user.sendPasswordEmail(this.state.email);
      if (response.status === false) {
        this.setState({ messageError: response.message, isLoading: false });
        return;
      }

      this.setState({ send: true, isLoading: false });
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
      <div>
        { !this.state.send ?
        <form className="signupForm" onSubmit={this.onSubmit}>
          { this.state.messageError && <div className="alert alert-danger">{ this.state.messageError }</div> }
          <TextFieldGroup
            error={errors.email}
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
            label="Correo electrónico"
            focus={true}
          />
          <ButtonApp
            text="Enviar correo"
            buttonStyle="btn btn-primary btn-large btn-block"
            click={this.handlerLogin}
            loading={this.state.isLoading}
          />
        </form> :
        <div>
          <h5 className="lbl-success">Correo electrónico enviado.</h5>
        </div>
        }
        <style jsx>{`
            .lbl-terms{
              font-size: 14px;
              text-align: center;
            }

            .lbl-success {
              color: green;
              text-align: center;
            }
          `}</style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.get('auth'),
  };
}

export default connect(mapStateToProps, { login })(LoginForm);
