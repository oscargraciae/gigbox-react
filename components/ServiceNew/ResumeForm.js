// import libraries
import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

// import local libraries
import validateInput from '../../validations/serviceNew';
import api from '../../api';

// import local libraries
import TextFieldGroup from '../general/TextFieldGroup';
import TextAreaGroup from '../general/TextAreaGroup';
import ButtonApp from '../general/ButtonApp';

class ResumeForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      category_id: 0,
      sub_category_id: 0,
      instructions: '',
      is_virtual: false,
      errors: {},
      categories: [],
      subcategories: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const categories = await api.categories.getCategories();
    this.setState({ categories }, () => {
      if(this.props.service) {
        const { service } = this.props;
        const { categories } = this.state;
        const category = categories.filter((el) => el.id == service.category.id);

        this.setState({ ...service, category_id: service.category.id, sub_category_id: service.sub_category.id, subcategories: category[0].sub_categories });
      }
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if(this.isValid()) {
      this.props.createService(this.state);
    }
  }

  handleChange = (event) => {
    this.setState({category: event.target.value});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeCategory = (e) => {
    this.setState({ category_id: e.target.value }, () => {
      const { categories, category_id } = this.state;
      const category = categories.filter((el) => el.id == category_id);
      this.setState({ subcategories: category[0].sub_categories })
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="headerPage">
          <div>
            <h3 className="titlePage">Publica tu servicio</h3>
            <div>¡Hola, Oscar! Empecemos a ganar dinero.</div>
          </div>
        </div>
        <div>
          <form className="formService" onSubmit={this.onSubmit}>
            {/* <div className="inputRow">
              <label>Imagen del servicio</label>
              { !this.state.cover &&
                <div className="cover-image-button">
                  <span>AÑADIR UNA IMAGEN DE SERVICIO</span>
                </div>
              }
              { this.state.cover && <div className="thumbPreview"><img src={this.state.cover} className="img-thumbnail" /></div> }

              <input
                id="upload_photo_input"
                className="fileInput"
                type="file"
                onChange={(e) => { return this.handleImageChange(e); }}
              />
              <p className="field-help-2"><i className="fa fa-lightbulb-o text-danger" aria-hidden="true"></i> Directrices importantes: El tamaño mínimo de imagen 750 x 422 píxeles, formato .jpg, .jpeg, o .png.</p>
            </div> */}
            <div className="inputRow">
              <label>Titulo del servicio</label>
              <TextFieldGroup
                error={errors.name}
                value={this.state.name}
                onChange={this.onChange}
                type="text"
                name="name"
                label="Recuerda que los titulos concretos y descriptivos son mas efectivos"
                focus={true}
              />
              <p className="field-help-2"><i className="fa fa-lightbulb-o text-danger" aria-hidden="true"></i> El buscador se orienta por palabras incluidas en el título y la descripción de tu servicio. Tenlo en cuenta y selecciona palabras precisas y descriptivas</p>
            </div>
            <div className="inputRow">
              <label>Tipo de servicio</label>
              <select value={this.state.category_id} onChange={this.onChangeCategory} className="select optional form-control">
                <option value="">Seleccionar</option>
                { this.state.categories.map((item, key) => (
                  <option value={item.id} key={key}>{item.name}</option>
                ))}
              </select>
              { errors.category_id && <span className="lbl lbl-danger">{errors.category_id}</span> }
            </div>
            <div className="inputRow">
              <label>Categoría del servicio</label>
              <select name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChange} className="select optional form-control">
                <option value="">Seleccionar</option>
                { this.state.subcategories.map((item, key) => (
                  <option value={item.id} key={key}>{item.name}</option>
                ))}
              </select>
              { errors.sub_category_id && <span className="lbl lbl-danger">{errors.sub_category_id}</span> }
            </div>
            <div className="inputRow">
              <label>Descripción</label>
              <TextAreaGroup
                error={errors.description}
                value={this.state.description}
                onChange={this.onChange}
                type="text"
                name="description"
                label=""
                focus={false}
                rows={4}
              />
              <p className="field-help-2"><i className="fa fa-lightbulb-o text-danger" aria-hidden="true"></i>  Procura explicar claramente lo que ofreces, incluye detalles y lo que incluye tu servicio. También puedes incluir aquellas cosas que no están consideradas dentro del servicio.</p>
            </div>
            <div className="inputRow">
              <label>Requisitos e instrucciones <small>(opcional)</small></label>
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
              <label>¿Puedes realizar este servicio virtualmente?</label>
              <br />
              <div className="btn-group">
                <label className="btn btn-default btn-lg">
                  <input className="required" id="virtual_0" name="service[virtual]" type="radio" value="1" />
                  <span>Sí</span>
                </label>
                <label className="btn btn-default btn-lg">
                  <input className="required" id="virtual_1" name="service[virtual]" type="radio" value="0" />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="inputRow">
              <ButtonApp
                text="Guardar y continuar"
                buttonStyle="btn btn-primary btn-large btn-block"
                click={this.handlerLogin}
                loading={this.state.loading}
              />
            </div>
          </form>
        </div>
        <style jsx>{`
          .inputRow {
            margin: 25px 0px;
          }

          input[type=radio] {
            position: absolute;
            clip: rect(0,0,0,0);
            pointer-events: none;
          }
        `}</style>
      </div>
    )
  }
}

export default ResumeForm;
