// import libraries
import React from 'react';
import { Step } from 'semantic-ui-react';

import validateInput from '../validations/serviceNew';
import api from '../api';

// import components
import defaultPage from '../hocs/defaultPage';
import FormResume from '../components/ServiceNew/ResumeForm';
import PriceForm from '../components/ServiceNew/PriceForm';
import MenuSteps from '../components/serviceEdit/MenuSteps';

class ServiceEdit extends React.Component {
  static async getInitialProps({ query }) {
    const service = await api.services.getMyService(query.id);
    return { service };
  }

  constructor() {
    super();
    this.state = {
      service: null,
    };
  }

  createService = async (stateForm) => {
    const service = await api.services.update(stateForm);
    this.setState({ service, step: 2 });
  }

  render() {
    return (
      <div>
        <div className="container container-margin-top">
          <div className="row">
            <div className="col-md-2">
              <MenuSteps step={4} />
            </div>
            <div className="col-md-6">
              { this.props.service && <FormResume createService={this.createService} service={this.props.service} /> }
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
        `}</style>
      </div>
    );
  }
}

export default defaultPage(ServiceEdit);
