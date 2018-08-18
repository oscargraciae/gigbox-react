import React from 'react';
import Head from 'next/head';
// import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import { removeDiacritics } from '../utils/removeAccents';

import api from '../api';
import defaultPage from '../hocs/defaultPage';
import ServiceCard from '../components/common/ServiceCard';
import MetaPage from '../components/MetaPage';

const removeCharter = function(string) {
  return string.replace(/-/g, " ");
}

class Categories extends React.Component {
  static async getInitialProps({ query }) {
    const location = 'Monterrey, Nuevo León, México';
    const lat = 25.6866142;
    const lng = -100.3161126;
    let services = [];

    if(query.subcategory !== undefined) {
       services = await api.categories.getServices(
        removeDiacritics(query.category),
        removeDiacritics(query.subcategory),
        lat,
        lng
      );
    }else {
      services = await api.categories.getServices(
        removeDiacritics(query.category),
        '',
        lat,
        lng
      );
    }

    return { services, query, location };
  }

  constructor(props) {
    super(props);
    this.state = { address: props.location, services: props.services };

    this.onChange = (address) => this.setState({ address })
  }

  // handleSelect = (address, placeId) => {
  //   this.setState({ address: address });

  //   geocodeByAddress(address,  (err, latLng) => {
  //     if (err) { console.log('Oh no!', err) }
  //     api.categories.getServices(
  //       removeDiacritics(this.props.query.category),
  //       removeDiacritics(this.props.query.subcategory),
  //       latLng.lat,
  //       latLng.lng
  //     ).then((data) => {
  //       this.setState({ services: data });
  //     })
  //   });
  // }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Ciudad, dirección',
     };

     const title = this.props.query.subcategory !== undefined ? `${removeCharter(this.props.query.subcategory)} en ${this.props.location}` : `${removeCharter(this.props.query.category)} en ${this.props.location}`;

    return (
      <div>
        <MetaPage
          title={`Gigbox: ${title}`}
          description="Gigbox te permite conectar con personas que pueden ayudarte a resolver problemas de una manera rápida, segura y confiable."
          image="../static/facebook-post.png"
          url={`https://gigbox.mx/categories/${this.props.query.category}/${this.props.query.subcategory}`}
        />
        <section className="User">
          <div className="container container-margin-top">
            <ol className="breadcrumb">
              <li>
                <a href="/" title="Inicio">
                  <i className="fa fa-home" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a> {removeCharter(this.props.query.category)} </a>
              </li>
              <li className="active">
                { this.props.query.subcategory &&
                  <span>{removeCharter(this.props.query.subcategory)}</span>
                }
              </li>
            </ol>
            <h1 className="title-h1">
              { this.props.query.subcategory ?
                <span className="categoryName">{removeCharter(this.props.query.subcategory)} en {this.state.address}</span> :
                <span className="categoryName">{removeCharter(this.props.query.category)} en {this.state.address}</span>
              }
            </h1>
          </div>
        </section>
        <section className="UserServiceListWhite">
          <section className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="controls">
                  <span>Ciudad o dirección</span>
                  <div>
                    <form onSubmit={this.handleFormSubmit}>
                      {/* <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} /> */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
              {this.state.services.slice(0, 16).map(item => (
                <div className="col-md-4" key={item.id}>
                  <ServiceCard service={item} key={item.id} />
                </div>
              ))}
              {!this.state.services.length &&
                <div className="col-md-7">
                  <h4> ¡Lo sentimos! </h4>
                  <p className="text-lead">No hemos obtenido ningún resultado que se ajuste a tus criterios de búsqueda. Si los modificas, puede que tengas más suerte.</p>
                </div>
              }
              </div>
            </div>
          </section>
        </section>
        <style jsx>{`
          title-h1 {
            font-size: 28px;
          }

          .categoryName {
            text-transform: capitalize;
          }
        `}</style>
      </div>
    );
  }
}

export default defaultPage(Categories);
