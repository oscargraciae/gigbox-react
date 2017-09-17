import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import api from '../api';

import SliderServices from '../components/common/SliderServices';
import defaultPage from '../hocs/defaultPage';
import Jumbotron from '../components/home/Jumbotron';
import MetaPage from '../components/MetaPage';

class Home extends React.Component {
  static async getInitialProps() {
    const [serviceRecommended, services1, services2] = await Promise.all([
      api.services.getSample(),
      api.services.getBySubCategory(22),
      api.services.getBySubCategory(16),
    ]);
    return { services: serviceRecommended, services1, services2 };
  }

  constructor() {
    super();
    this.state = {
      query: '',
      services1: [],
      services2: [],
      services3: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [services1, services2, services3, res] = await Promise.all([
      api.services.getBySubCategory(29),
      api.services.getBySubCategory(28),
      api.services.getBySubCategory(21),
      api.categories.getCategories(),
    ]);

    this.setState({
      catHome: res[0].sub_categories,
      catEvents: res[1].sub_categories,
      catCourses: res[2].sub_categories,
      services1,
      services2,
      services3,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    Router.push({
      pathname: '/search',
      query: { text: this.state.query },
    });
  }

  render() {
    return (
      <div>
        <MetaPage
          title="Gigbox: Contrata a expertos en linea y encuentra trabajo de independiente"
          description="Gigbox te permite conectar con personas que pueden ayudarte a resolver problemas de una manera rápida, segura y confiable."
          image="../static/facebook-post.png"
          url="https://gigbox.mx/"
        />
        <Jumbotron />
        <div className="container-white">
          <div className="container container-margin-top">
            <div>
              <form onSubmit={this.onSubmit} className="search-strip">
                <div className="search-input-wrapper">
                  <i className="fa fa-search" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Busca por nombre de servicio"
                    value={this.state.query}
                    onChange={this.onChange}
                    name="query"
                  />
                </div>
                <button className="search-button" onClick={this.onClick}>
                  <span>Buscar</span>
                </button>
              </form>

              <div className="containerFormMobile">
                <div className="homeMobile">
                  <div className="text-center box-mobile">
                    <h1 className="titleMobile">Conectate con personas talentosas, independientes y calificadas.</h1>
                  </div>
                </div>
                <form onSubmit={this.onSubmit} className="searchMobileHome">
                  <input
                    type="text"
                    placeholder="Busca por nombre de servicio"
                    value={this.state.query}
                    onChange={this.onChange}
                    className="inputMobile"
                    name="query"
                  />
                  <button className="btn btnMobileHome" onClick={this.onClick}>
                    <span><i className="fa fa-search" aria-hidden="true" /></span>
                  </button>
                </form>
              </div>

            </div>

            <div className="row row-feature">
              <div className="col-md-12">

                <div className="col-md-3">
                  <div className="infoRow">
                    <div className="infoImage">
                      <i className="fa fa-map-marker fa-lg" aria-hidden="true" />
                    </div>
                    <div className="infoTitle">Ubicación</div>
                  </div>
                  <p className="infoDescription">Gigbox te permite localizar proveedores cercanos a tu ubicación.</p>
                </div>
                <div className="col-md-3">
                  <div className="infoRow">
                    <div className="infoImage">
                      <i className="fa fa-star fa-lg" aria-hidden="true" />
                    </div>
                    <div className="infoTitle">Mayor confianza</div>
                  </div>
                  <p className="infoDescription">Las evaluaciones te permite saber si el proveedor que estas contratando es de confianza.</p>
                </div>
                <div className="col-md-3">
                  <div className="infoRow">
                    <div className="infoImage">
                      <i className="fa fa-map-marker fa-lg" aria-hidden="true" />
                    </div>
                    <div className="infoTitle">Pagos seguros</div>
                  </div>
                  <p className="infoDescription">Paga en linea de manera fácil, rápida y segura.</p>
                </div>
                <div className="col-md-3">
                  <div className="infoRow">
                    <div className="infoImage">
                      <i className="fa fa-certificate fa-lg" aria-hidden="true" />
                    </div>
                    <div className="infoTitle">Garantia</div>
                  </div>
                  <p className="infoDescription">El servicio que contrates será realizado satisfactoriamente o te regresamos el dinero.</p>
                </div>

              </div>
            </div>

            <hr />

            <div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Nuevos en Gigbox</h2>
              <section className="UserServiceListWhite">
                { this.props.services.length > 0 && <SliderServices services={this.props.services} /> }
              </section>
            </div>

            <div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Servicios de Idiomas</h2>
              <section className="UserServiceListWhite">
                { this.props.services1.length > 0 && <SliderServices services={this.props.services1} /> }
              </section>
            </div>

            <div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Servicios de Fotografía Y Video</h2>
              <section className="UserServiceListWhite">
                { this.props.services2.length > 0 && <SliderServices services={this.props.services2} /> }
              </section>
            </div>

            <div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Servicios de Informática Y Tecnología</h2>
              <section className="UserServiceListWhite">
                { this.state.services1.length > 0 && <SliderServices services={this.state.services1} /> }
              </section>
            </div>

            <div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Servicios de Economía Y Empresas</h2>
              <section className="UserServiceListWhite">
                { this.state.services2.length > 0 && <SliderServices services={this.state.services2} /> }
              </section>
            </div>

            <div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Servicios academicos</h2>
              <section className="UserServiceListWhite">
                { this.state.services3.length > 0 && <SliderServices services={this.state.services3} /> }
              </section>
            </div>

            {/*<div className="Main-contentCategory text-center">
              <h2 className="subtitleMain">Explora otros servicios</h2>
            </div>*/}

          </div>
        </div>
        <style jsx>{`
          .form {
            margin-left:25px;
            margin-right:25px;
          }
          .title-h2 {
            margin-top: -20px !important;
            margin-bottom: 40px !important;
          }

          .containerFormMobile {
            display: none;
          }

          .subtitleMain {
            text-align: left;
            font-size: 24px;
            margin: 2px 0px;
            font-weight: 500;
          }

          .search-strip {
            position: relative;
            -moz-transform: translateY(-120%);
            -o-transform: translateY(-120%);
            -ms-transform: translateY(-120%);
            -khtml-transform: translateY(-120%);
            transform: translateY(-120%);
            display: flex;
            justify-content: center;
            z-index: 2;
          }

          .search-input-wrapper {
            padding: 0 2.4em;
            height: 4em;
            display: flex;
            align-items: center;
            border-radius: 3px;
            background: #fff;
            -webkit-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            margin: 0 .4em;
            position: relative;
          }

          .search-input-wrapper input {
            width: 20em;
            outline: 0;
            font-size: 1.4em;
            margin-left: 1em;
            border: none;
            transition: all .3s ease-in-out;
          }

          .search-button {
            cursor: pointer;
            -webkit-transition: all .2s ease-in-out 0s;
            -moz-transition: all .2s ease-in-out 0s;
            -o-transition: all .2s ease-in-out 0s;
            -ms-transition: all .2s ease-in-out 0s;
            transition: all .2s ease-in-out 0s;
            padding: 0 2.4em;
            height: 4em;
            display: flex;
            align-items: center;
            border-radius: 3px;
            background: #ff1940;
            -webkit-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            border: none;
          }

          .search-button span {
            color: #fff;
            font-weight: 500;
            letter-spacing: -.1px;
            line-height: 1.4em;
            height: 1.4em;
            font-size: 14px;
          }

          .MainSearch {
            height: 150px;
          }

          .col-centered{
            text-align: center;
          }

          .btn-principal {
            padding: 6px 12px;
          }

          .row-feature{
            margin-top:10px;
            text-align: left;
          }

          .icon-radius{
            border-radius: 50%;
            padding: 17px 0 0;
            width: 60px;
            height: 60px;
            font-size: 14px;
            margin: 0 5px;
            background: #ff1940;
            color: #fff;
          }

          .infoRow {
            display: flex;
            align-items: center;
            margin-bottom: .75em;
          }

          .infoImage {
            margin-right: 10px;
            display: flex;
            align-items: center;
          }

          .infoTitle {
            font-size: 16px;
            font-weight: 900;
            color: #545454;
          }

          .infoDescription {
            color: #757575;
            font-size: 12px;
            margin-bottom: 0px;
          }

          @media (max-width: 600px) {
            .search-strip {
              display: none;
            }

            .row-feature {
              display: none;
            }

            .subtitleMain {
              text-align: left;
              font-size: 16px;
              margin: 2px 0px;
              font-weight: 500;
              line-height: 21px;
            }

            .containerFormMobile{
              display: block;
            }

            .homeMobile {
              display: block;
            }

            .titleMobile {
              font-size: 14px;
              color: #757575;
            }

            .box-mobile {
              padding: 10px;
              width: 100%;
            }

            .searchMobileHome {
              display: flex;
            }

            .inputMobile {
              width: 100%;
              padding: 9px 12px;
              border: 1px #D2D6DF solid;
              background: #fff;
              color: #45494E;
              font-size: 16px;
              line-height: 24px;
              font-weight: 400;
              letter-spacing: .5px;
            }

            .btnMobileHome {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              display: inline-block;
              margin-top: 0;
              font-weight: 600;
              color: #fff;
              background-color: #FF1940;
            }
          }

        `}</style>
      </div>
    );
  }
}

export default defaultPage(Home);
