import React from 'react';
import PropTypes from 'prop-types';

import api from '../api';

import Meta from '../components/Meta';
import defaultPage from '../hocs/defaultPage';
import InfoService from '../components/service/InfoService';
import ServiceCheckout from '../components/service/ServiceCheckout';
import UserContainer from '../components/service/UserContainer';
import SliderServices from '../components/common/SliderServices';
import FavoritePanel from '../components/service/FavoritePanel';
import ShareButtons from '../components/service/ShareButtons';

class Service extends React.Component {

  static async getInitialProps({ query }) {
    const service = await api.services.get(query.id);
    const serviceRecommended = await api.services.getBySubCategory(service.sub_category.id);

    return { service, serviceRecommended, id: query.id };
  }

  constructor() {
    super();
    this.state = {
      evaluations: [],
      serviceRecommended: [],
      userServices: [],
      currentUser: {},
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [comments, services] = await Promise.all([
      api.services.getEvaluations(this.props.id),
      api.user.getServices(this.props.service.user.username),
    ]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    this.setState({ evaluations: comments, userServices: services, currentUser });
  }

  render() {
    return (
      <div>
        <Meta service={this.props.service} />
        <div className="container container-margin-top">
          <div className="row">
            <div className="col-md-8 col-xs-12">
              <InfoService service={this.props.service} evaluations={this.state.evaluations} />
            </div>

            <div className="col-md-4 col-xs-12 col-fixed">
              <ShareButtons service={this.props.service} />
              <UserContainer user={this.props.service.user} service={this.props.service} isAuthenticated={this.props.isAuthenticated} />

              { this.props.isAuthenticated && this.state.currentUser.id !== this.props.service.user.id &&
                <ServiceCheckout service={this.props.service} />
              }
              {/* <FavoritePanel service={this.props.service} /> */}
            </div>
          </div>
        </div>
        <div className="container">
          <h3>Otros servicios relacionados</h3>
          { this.props.serviceRecommended.length > 0 && <SliderServices services={this.props.serviceRecommended} /> }
        </div>
        <style jsx>{`
          h3{
            font-size: 18px;
          }
          .cover-color{
            background: red; /* For browsers that do not support gradients */
            background: linear-gradient(to right, #353F60 , #6C6C93); /* Standard syntax */
          }

          .col-fixed {
            position: sticky !important;
            right: 0;
            top: 80px;
            padding-top: 20px;
          }
        `}
        </style>
      </div>
    );
  }
}

Service.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.description,
    user: PropTypes.shape({
      address: PropTypes.string,
    }),
  }),
  serviceRecommended: PropTypes.arrayOf(
    PropTypes.object,
  ),
  id: PropTypes.string,

};

Service.defaultProps = {
  service: {},
  user: {},
  serviceRecommended: [],
  id: '',
};

export default defaultPage(Service);
