// import libraries
import React from 'react';
import { Step } from 'semantic-ui-react';
import Router from 'next/router';

import validateInput from '../validations/serviceNew';
import api from '../api';

// import components
import defaultPage from '../hocs/defaultPage';
import whitePage from '../hocs/whitePage'
import FormResume from '../components/ServiceNew/ResumeForm';
import PriceForm from '../components/ServiceNew/PriceForm';

class ServiceNew extends React.Component {
  static async getInitialProps() {
    return null;
  }

  constructor() {
    super();
    this.state = {
      service: {},
    };
  }

  // async handleImageChange(e) {
  //   e.preventDefault();

  //   this.setState({ loading: true });
  //   const reader = new FileReader();
  //   const file = e.target.files[0];

  //   let image = null;
  //   reader.onloadend = async () => {
  //     image = reader.result;
  //     this.setState({ cover: image, showModal: false, newImage: image });
  //   };

  //   reader.readAsDataURL(file);
  // }

  createService = async (stateForm) => {
    const service = await api.services.create(stateForm);
    if (service) {
      location.href = `/services/edit/${service.id}`;
      // Router.push({
      //   pathname: ,
      // })
    }
  }

  render() {
    return (
      <div>
        <div className="HeaderWelcome">
          <nav>
            <img src="/static/logo-gigbox2.png" alt="Gigbox" height="40" />
          </nav>
        </div>
        <div className="container container-margin-top">
          <div className="row text-center">
            {/* <div className="col-md-12 col-md-offset-1">
              <Step.Group ordered size="mini">
                <Step active>
                  <Step.Content>
                    <Step.Title>Información</Step.Title>
                  </Step.Content>
                </Step>
                <Step>
                  <Step.Content>
                    <Step.Title>Precios</Step.Title>
                  </Step.Content>
                </Step>

                <Step>
                  <Step.Content>
                    <Step.Title>Galeria</Step.Title>
                  </Step.Content>
                </Step>
                <Step>
                  <Step.Content>
                    <Step.Title>Publicar</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-7 col-centered">
              <FormResume createService={this.createService} />
            </div>
          </div>
        </div>
        <style jsx>{`
          .headerPage {
            padding-left: 5px;
            margin-bottom: 20px;
          }

          .inputRow {
            margin: 25px 0px;
          }

          input[type=radio] {
            position: absolute;
            clip: rect(0,0,0,0);
            pointer-events: none;
          }

          .thumbPreview {
            height: 169px;
            width: 301px;
          }

          .col-centered{
            float: none;
            margin: 0 auto;
          }

          .HeaderWelcome {
            padding: 10px;
            text-align: center;
            box-shadow: 0 1px 10px 0 rgba(0,0,0,.1);
          }
        `}</style>
      </div>
    );
  }
}

export default whitePage(ServiceNew);
