// import libraries
import React from 'react';

// import components
import defaultPage from '../hocs/defaultPage';
import TextFieldGroup from '../components/general/TextFieldGroup';
import TextAreaGroup from '../components/general/TextAreaGroup';

class Account extends React.Component {
  static async getInitialProps() {
    return null;
  }

  constructor() {
    super();

    this.state = {
      first_name: '',
      errors: {},
      messageError: '',
      isLoading: false,
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container container-margin-top">
        <div className="row">
          <div className="col-md-3">
            <ul>
              <li>
                <a>Editar perfil</a>
              </li>
              <li>
                <a>Cuenta</a>
              </li>
              <li>
                <a>Métodos de pago</a>
              </li>
              <li>
                <a>Depósito a proveedores</a>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="panel">
              <div className="panel-header">
                Información basica
              </div>
              <div className="panel-body">
                <div className="row space-4">
                  <div className="col-md-6">
                    <label>Nombre</label>
                    <TextFieldGroup
                      error={errors.password}
                      value={this.state.first_name}
                      onChange={this.onChange}
                      type="text"
                      name="first_name"
                      label="Nombre"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Apellido</label>
                    <TextFieldGroup
                      error={errors.password}
                      value={this.state.first_name}
                      onChange={this.onChange}
                      type="text"
                      name="last_name"
                      label="Apellido"
                    />
                  </div>
                </div>

                <div className="row space-4">
                  <div className="col-md-12">
                    <label>Descripción (Opcional)</label>
                    <TextAreaGroup
                      error={errors.password}
                      value={this.state.first_name}
                      onChange={this.onChange}
                      type="text"
                      name="last_name"
                      label="¡La comunidad quiere conocerte! Cuéntanos más acerca de ti."
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          label {
            padding: 0 5px;
          }
          .panel {
            background: #FFF;
            padding: 5px;
          }

          .panel-header {
            background: #FFF;
            padding: 10px;
            font-size: 18px;
            border-bottom: #DDD;
          }

          .panel-body {

          }

          .space-4 {
            margin-bottom: 24px;
          }
        `}</style>
      </div>
    )
  }
}

export default defaultPage(Account);
