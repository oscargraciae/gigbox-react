// import libraries
import React from 'react';

// import local libraries
import api from '../../api';

// import components
import TextFieldGroup from '../general/TextFieldGroup';
import TextAreaGroup from '../general/TextAreaGroup';
import ButtonApp from '../general/ButtonApp';

class PriceForm extends React.Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
      unit_type_id: 0,
      unit_max: 0,
      service_id: 0,
      errors: {},
      unitTypes: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const unitTypes = await api.services.getUnitTypes();
    this.setState({ unitTypes });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const pack = await api.packages.create(this.state);

    console.log("Paquete de respuesta", pack);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="col-md-7 col-md-offset-1">
        <div className="headerPage">
          <div>
            <h3 className="titlePage">Precios {this.props.service.name}</h3>
          </div>
        </div>
        <div>
          <div className="formPriceContainer col-md-11">
            <form className="formService" onSubmit={this.onSubmit}>
              <div className="inputRow">
                <label>Titulo del paquete/precio</label>
                <TextFieldGroup
                  error={errors.name}
                  value={this.state.name}
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  label="Ejemplo: Precio básico, 100 personas, servicio completo, servicio premium, etc…"
                  focus
                />
              </div>
              <div className="inputRow">
                <label>Tipo de precio</label>
                <select name="unitTypes" value={this.state.unit_type} onChange={this.onChange} className="select optional form-control">
                  <option value="">Seleccionar</option>
                  { this.state.unitTypes.map((item, key) => (
                    <option value={item.id} key={key}>{item.description}</option>
                  ))}
              </select>
              </div>
              <div className="inputRow">
                <label>¿Que incluye?</label>
                <TextAreaGroup
                  error={errors.instructions}
                  value={this.state.instructions}
                  onChange={this.onChange}
                  type="text"
                  name="instructions"
                  label=""
                  focus={false}
                  rows={4}
                />
              </div>
              <div className="inputRow">
                <label>Precio</label>
                <div className="inputRowPrice">
                  <span>$</span>
                  <div className="controls controls-small">
                    <input
                      value={this.state.price}
                      onChange={this.onChange}
                      type="text"
                      name="price"
                      placeholder="0.00"
                      className="control-input inputPrice"
                    />
                  </div>
                  <span>MX</span>
                </div>
              </div>
              <div className="inputRow text-right">
                <ButtonApp
                  text="Cancelar"
                  buttonStyle="btn btn-default btn-large btn-block"
                  click={this.handlerLogin}
                  loading={this.state.isLoading}
                />
                <ButtonApp
                  text="Agregar"
                  buttonStyle="btn btn-primary btn-large btn-block"
                  click={this.handlerLogin}
                  loading={this.state.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
        <style jsx>{`
          .inputRow {
            margin: 10px 0px;
          }

          .inputRowPrice {
            display: flex;
            align-items: center;
            background: white;
            padding-right: 10px;
            padding-left: 10px;
            border: 1px solid #c4c4c4;
            font-size: 24px;
          }

          .inputRowPrice > span {
            font-size: 24px;
          }

          .inputPrice {
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            background-color: #fff;
            border-radius: 2px;
            border: 0px solid #c4c4c4;
            color: #565a5c;
            padding: 10px 10px;
            width: 100%;
            font-size: 18px;
          }

          .control-input{
            border: 0px solid #ccc;
            width: 100%;
          }

          .controls-small {
            padding: 5px 0;
            width: 100%;
          }

          input[type=radio] {
            position: absolute;
            clip: rect(0,0,0,0);
            pointer-events: none;
          }

          .formPriceContainer {
            background: #EFEFEF;
            border: 1px solid #DDD;
            border-radius: 2px;
            padding: 0px 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default PriceForm;
