import React from 'react';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../store';

import LoginForm from '../components/login/LoginForm';
import ResetPassForm from '../components/login/ResetPassForm';
import defaultPage from '../hocs/defaultPage';

class Login extends React.Component {
  static async getInitialProps() {
    return 1;
  }

  constructor() {
    super();

    this.state = {
      resetPassword: false,
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="container-login">
            { !this.state.resetPassword ?
              <div>
                <h1>Iniciar sesión</h1>
                <p>Todavía no tienes cuenta? <a className="lbl-principal" href="signup">Registrate</a></p>
                <LoginForm clickRemember={ () => this.setState({ resetPassword: true }) } />
              </div> :
              <div>
                <h1>Recuperar contraseña</h1>
                <p>Te enviaremos un enlace a tu correo para restablecer la contraseña.</p>
                <ResetPassForm />
              </div>
            }

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

          @media (max-width: 600px) {
            .container-login{
              border-radius: 0px;
              max-width: 400px;
              margin: 65px auto;
              background-color: #fff;
              padding: 0px;
              border: none;
            }

            .container-login > h1{
              font-size: 22px;
              margin: 0px;
            }
          }
        `}</style>
      </div>
    );
  }
}
// export default Login;
export default withRedux(makeStore)(defaultPage(Login));
