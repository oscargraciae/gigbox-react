// import libraries
import React, { Component } from 'react';

import api from '../api';
// import components
import DefaultPage from '../hocs/defaultPage';
import ServiceCardList from '../components/common/ServiceCardList';
import ServiceList from '../components/common/ServiceList';

class Favorites extends Component {
  static async getInitialProps() {
    return null;
  }

  constructor() {
    super();

    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const favorites = await api.services.myfavorites();
    this.setState({ favorites });
  }

  render() {
    return (
      <div>
        <div className="container container-margin-top">
          <div className="containerPage">
            <div className="col-md-12">
              <p className="title">Favoritos</p>
            </div>
            <div className="listFavorites">
              <ServiceList services={this.state.favorites} />
            </div>
          </div>
        </div>
        <style jsx>{`
          .containerPage {
            padding-top: 30px;
          }
          .title {
            font-size: 24px;
            padding:0;
            margin:0;
          }
        `}</style>
      </div>
    );
  }
}

export default DefaultPage(Favorites);
