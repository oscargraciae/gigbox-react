import React from 'react';

class Jumbotron extends React.Component {
  componentDidMount() {
    $(function() {
      $('.rotating-text').typed({
        strings: ['Clases de Inglés.', 'Fotografía para Eventos.', 'Servicio de Contabilidad.', 'Clases de Música.', 'Audio e Iluminación.', 'Clases de Piano.', 'Deporte y Salud.', 'Asesorías para Niños.', 'Marketing Digital.', 'Informatica', 'Artes'],
        typeSpeed: 50,
        backDelay: 800,
        shuffle: false,
        loop: true,
      });
    });
  }

  render() {
    return (
      <div>
        <div className="jumbotronStyle">
          <div className="container">
            <div className="col-md-5 text-left box-landing">
              <h1 className="title-landing">Encuentra y contrata a expertos</h1>
              <h2 className="title-landing">En <span className="rotating-text"></span></h2>
              <h3 className="description-landing">
                Gigbox te permite conectar con personas que pueden ayudarte a resolver problemas de una manera rápida, segura y confiable.
              </h3>
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

          .homeMobile {
            display: none;
          }

          .box-landing {
            margin: 40px 20px 10px 5px;
            width: 100%;
            padding: 50px 10%;
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
            margin: 0px 60px;
            margin-top: 60px;
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

          @media (max-width: 600px) {
            .jumbotronStyle {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Jumbotron;
