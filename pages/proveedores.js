// import react libraries
import React from 'react';
import Collapsible from 'react-collapsible';
import { Accordion, Panel } from 'react-bootstrap';


// import components
import defaultPage from '../hocs/defaultPage';
import MetaPage from '../components/MetaPage';

class Proveedores extends React.Component {
  static async getInitialProps() {
    return null;
  }

  render() {
    return (
      <div>
        <MetaPage
          title="Gigbox: Gana más dinero y trabaja como te gusta"
          description="Nuestra misión es construir una nueva manera de trabajar, en donde la gente administra su tiempo, dinero y esfuerzo, generando una comunidad de gente confiable que se conecta de manera instantánea para ayudar y colaborar en cualquier trabajo."
          image="../static/facebook-post.png"
          url="https://gigbox.mx/proveedores"
        />
        <div className="jumbotronStyle">
          <div className="container">
            <div className="col-md-5 text-left box-landing">
              <h1 className="title-landing">Gana más dinero y trabaja como te gusta</h1>
              <h3 className="description-landing">
                Tú tienes los conocimientos y habilidades. Nosotros te conectamos con gente que te necesita.
              </h3>
              <a href="/signup?ref=supplier" className="btn btn-primary btn-large btn-landing">¡Regístrate gratis!</a>
            </div>
          </div>
        </div>

        <hr />
        <div className="row row-feature">
          <div className="col-md-12">

            <div className="col-md-3 text-center">
              <div className="">
                <div className="infoTitle">Es gratis unirse a Gigbox.</div>
              </div>
              <p className="infoDescription">No hay ninguna suscripción o comisión para publicar tus servicios. Ganas el 100% del precio de venta en cada transacción.</p>
              <br />
            </div>
            <div className="col-md-3 text-center">
              <div className="">
                <div className="infoTitle">Gana más dinero</div>
              </div>
              <p className="infoDescription">Recibe oportunidades de trabajo de usuarios que buscan servicios como el tuyo.</p>
              <br />
            </div>
            <div className="col-md-3 text-center">
              <div className="">
                <div className="infoTitle">Notificaciones</div>
              </div>
              <p className="infoDescription">Cuando un cliente se ponga en contacto contigo o solicite uno de tus servicios Gigbox te notificara al instante.</p>
              <br />
            </div>
            <div className="col-md-3 text-center">
              <div className="">
                <div className="infoTitle">Mensajes</div>
              </div>
              <p className="infoDescription">Nuestra funcionalidad de chat/mensajes te permitirá estar en constante comunicación con tu cliente.</p>
              <br />
            </div>

          </div>
        </div>

        <div className="container-fluid">
          <div className="row rowLanding background-grey">
            <div className="col-md-10 col-md-offset-1">
              <h2 className="text-center">¿Qué es Gigbox?</h2>
              <p className="textDescription">
                Nuestra misión es construir una nueva manera de trabajar, en donde la gente administra su tiempo, dinero y esfuerzo, generando una comunidad de gente confiable que se conecta de manera instantánea para ayudar y colaborar en cualquier trabajo.
              </p>
            </div>
          </div>

          <div className="row rowLanding">
            <div className="col-md-12">
              <h2 className="text-center">Cómo funciona</h2>

              <div className="col-md-4">
                <img src="../static/laptop.png" width="100" height="100" />
                <h3>1. Publica tus servicios</h3>
                <p>Regístrate de forma gratuita, crea tu servicio y ofrece tu trabajo.</p>
              </div>

              <div className="col-md-4">
                <img src="../static/email.png" width="100" height="100" />
                <h3>2. Recibe solicitud</h3>
                <p>Entérate cuando recibes una solicitud de trabajo y utiliza nuestro sistema de mensajería para contactarte con tu cliente.</p>
              </div>

              <div className="col-md-4">
                <img src="../static/money.png" width="100" height="100" />
                <h3>3. Recibe tu dinero</h3>
                <p>Recibe el dinero por la venta de tu servicio. El pago se transfiere al finalizar el servicio.</p>
              </div>

            </div>
          </div>

          <hr />

          <div className="row rowLanding">
            <div className="col-md-12">
              <h2 className="text-center">Preguntas frecuentes</h2>

              <div className="col-md-6 text-left">
                 <Accordion>
                  <Panel header="¿Qué puedo vender?" eventKey="1">
                    Puedes ofrecer cualquier servicio que quieras siempre y cuando sea legal y cumpla con nuestros términos. Hay una gran variedad de categorías que puede navegar para obtener ideas.
                  </Panel>
                  <Panel header="¿Cuánto dinero puedo ganar?" eventKey="2">
                    Todo depende de ti. Puedes trabajar tanto como quieras. Muchos vendedores trabajan en Gigbox de tiempo completo y algunos mantienen su trabajo mientras utilizan Gigbox para ganar dinero extra.
                  </Panel>
                  <Panel header="¿Cuánto cuesta?" eventKey="3">
                    Es gratis unirse a Gigbox. No hay ninguna suscripción o comisión para publicar tus servicios. Ganas el 100% del precio de venta en cada transacción.
                  </Panel>
                </Accordion>
              </div>

              <div className="col-md-6 text-left">
                <Accordion>
                  <Panel header="¿Cuánto tiempo debo invertir?" eventKey="1">
                    Es muy flexible. Es necesario poner algún tiempo y esfuerzo en el comienzo para aprender del mercado y luego tú puede decidir qué cantidad de trabajo quieres hacer.
                  </Panel>
                  <Panel header="Cuanto puedo cobrar por mis servicio?" eventKey="2">
                    Tú estableces los precios y puedes publicar diferentes paquetes dependiento de como quieras vender tus servicios.
                  </Panel>
                  <Panel header="¿Cómo me pagan?" eventKey="3">
                    Una vez que termines el trabajo, el dinero se transfiere a tú cuenta en un maximo de 24 horas.
                  </Panel>
                </Accordion>
              </div>

            </div>
          </div>

          <hr />

          <div className="row rowLanding">
            <div className="col-md-10 col-md-offset-1">
              <h3 className="text-center">Regístrate y publica tu primer servicio</h3>
              <a href="/signup?ref=supplier" className="btn btn-primary btn-large btn-landing">Empieza a vender</a>

            </div>
          </div>

        </div>

        <style jsx>{`
          .jumbotronStyle {
            padding: 0px;
            margin: 0px;
            position:relative;
            background: #FFFFFF;
          }

          .textDescription {
            color: #757575;
          }

          .rowLanding {
            text-align: center;
            padding: 60px 50px;
          }

          .homeMobile {
            display: none;
          }

          .background-grey {
            background: #EFEFEF;
          }

          .box-landing {
            margin: 40px 20px 0px 5px;
            width: 100%;
            padding: 50px 10%;
            padding-bottom: 10px;
          }

          .btn-landing {
            padding: 15px 30px;
          }

          .title-landing {
            margin-top:65px;
            font-size: 48px !important;
            font-weight: 400 !important;
            text-shadow: none !important;

            font-size: 48px;
            font-weight: bold;
            color: rgb(74, 74, 74) !important;
          }

          .description-landing {
            font-size: 21px !important;
            font-weight: 500 !important;
            margin: 15px 100px;
            color: rgb(74, 74, 74) !important;
            text-shadow: none !important;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: -0;
            background: rgba(22, 30, 44, .4);
          }

          .ityped-cursor {
            font-size: 2.2rem;
            opacity: 1;
            -webkit-animation: blink 0.3s infinite;
            -moz-animation: blink 0.3s infinite;
            animation: blink 0.3s infinite;
            animation-direction: alternate;
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

          @keyframes blink {
            100% {
                opacity: 0;
            }
          }

          @-webkit-keyframes blink {
            100% {
                opacity: 0;
            }
          }

          @-moz-keyframes blink {
            100% {
                opacity: 0;
            }
          }

          .Collapsible {
            background: red;
          }

          @media (max-width: 600px) {
            .box-landing {
              margin: 0px 50px 0px 5px;
              width: 100%;
              padding: 20px 0%;
              padding-bottom: 10px;
            }

            .title-landing {
              margin-top:65px;
              font-size: 21px !important;
              font-weight: 400 !important;
              text-shadow: none !important;
              font-weight: bold;
              color: rgb(74, 74, 74) !important;
            }

            .description-landing {
              font-size: 16px !important;
              margin: 15px 0px;
              color: rgb(74, 74, 74) !important;
              text-shadow: none !important;
            }

            .rowLanding {
              text-align: center;
              padding: 20px 10px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default defaultPage(Proveedores);
