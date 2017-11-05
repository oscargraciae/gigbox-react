import React from 'react';

class Jumbotron extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotronStyle">
          <div className="container">
            <div className="col-md-5 text-left box-landing">
              <h3 className="description-landing">
                Gigbox te permite conectar con profesionales que pueden ayudarte a resolver problemas de una manera rápida, segura y confiable.
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
            margin: 60px 20px 0px 5px;
            width: 100%;
            text-align: center;
            padding-left: 5%;
            padding-right: 5%;
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
            font-size: 36px !important;
            font-weight: 500 !important;
            margin: 0px 60px;
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
