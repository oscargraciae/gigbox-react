import React from 'react';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../store';

import SignupForm from '../components/signup/SignupForm';
import Page from '../components/Page';
import defaultPage from '../hocs/defaultPage';
import MetaPage from '../components/MetaPage';

class Signup extends React.Component {
  static async getInitialProps() {
    return 1;
  }

  render() {
    const serviceRef = this.props.url.query.ref;
    return (
      <div>
        <MetaPage
          title="Gigbox: Registrate y contrata a expertos en linea y encuentra trabajo de independiente"
          description="Gigbox te permite conectar con personas que pueden ayudarte a resolver problemas de una manera rápida, segura y confiable."
          image="../static/facebook-post.png"
          url="https://gigbox.mx/signup"
        />
        <div className="container">
          <div className="container-login">
            <h1>Registrarse</h1>
            <p>¿Ya tienes una cuenta? <a className="lbl-principal" href="login">Iniciar sesión</a></p>
            <SignupForm serviceRef={serviceRef} />
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

          .container-login > h1{
            font-size: 28px;
            margin: 0px;
          }
          .container-login > h1, .container-login > p{
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
export default withRedux(makeStore)(defaultPage(Signup));
