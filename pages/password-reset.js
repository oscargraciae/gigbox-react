// import libraries
import React from 'react';

import api from '../api';

// import components
import defaultPage from '../hocs/whitePage';
import ButtonApp from '../components/general/BlockButton';
import TextFieldGroup from '../components/general/TextFieldGroup';
import validateInput from '../validations/passwordReset';

class PasswordReset extends React.Component {
  static async getInitialProps() {
    return null;
  }

  constructor() {
    super();
    this.state = {
      isLoading: false,
      errors: {},
      password: '',
      passwordConfirm: '',
      token: '',
      userId: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const token = this.props.url.query.t;
    const userId = await api.user.validationToken(token);
    this.setState({ userId, token });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ isLoading: true });
      const id = this.state.userId;
      const data = {
        password: this.state.password,
        password_confirmation: this.state.passwordConfirm,
        token_user: this.state.token,
      };
      const response = await api.user.changePassword(id, data);
      this.setState({ isLoading: false });
      if (response.status === true) {
        location.href = '/login';
      }
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
        <header className="HeaderWelcome">
          <nav>
            <img src="/static/logo-gigbox2.png" alt="Gigbox" height="40" />
          </nav>
        </header>

        <div className="container">
          <div className="container-login">
            <div>
              <h1>Restablecer contraseña</h1>
              <form className="signupForm" onSubmit={this.onSubmit}>
                <TextFieldGroup
                  error={errors.password}
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  label="Nueva contraseña"
                />
                <TextFieldGroup
                  error={errors.passwordConfirm}
                  value={this.state.passwordConfirm}
                  onChange={this.onChange}
                  type="password"
                  name="passwordConfirm"
                  label="Confirmar contraseña"
                />
                <ButtonApp
                  text="Cambiar contraseña"
                  buttonStyle="btn btn-primary btn-large btn-block"
                  click={this.handlerLogin}
                  loading={this.state.isLoading}
                />
              </form>
            </div>
          </div>
        </div>

        <style jsx>{`
          .container-login{
            border-radius: 3px;
            max-width: 400px;
            margin: 60px auto;
            background-color: #fff;
            padding: 24px;
            border: 1px solid #DDD;
          }

          .container-login h1{
            font-size: 28px;
            margin: 0px;
          }
          .container-login h1, .container-login p{
            text-align: center;
            margin-bottom: 10px;
          }

          .input-root{
            margin-bottom: 18px;
            vertical-align: top;
          }

          .input-label{
            color: #2e343b;
            float: left;
            font-weight: bold;
            margin-bottom: 7px;
          }

          .input-margin-left{
            margin-left: 12px;
          }

          .input-form{
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
            color: #2e343b;
            display: block;
            outline: none;
            padding: 10px 12px 11px;
            -webkit-transition: .2s;
            transition: .2s;
            width: 100%;
            height: 42px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }

          .HeaderWelcome {
            padding: 10px;
            text-align: center;
            box-shadow: 0 1px 10px 0 rgba(0,0,0,.1);
          }

          .ComponentCol {
            max-width: 600px;
            padding: 15px;
            margin: 0 auto;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default defaultPage(PasswordReset);
