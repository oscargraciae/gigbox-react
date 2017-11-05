// iport libraries
import React from 'react';
import PropTypes from 'prop-types';

import api from '../../api';

class FavoritePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false,
    };

    this.clickFavorite = this.clickFavorite.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const serviceId = this.props.service.id;
      const favorites = await api.services.myfavorites();
      if (favorites) {
        for (let i = 0; i < favorites.length; i++) {
          if (serviceId === favorites[i].id) {
            this.setState({ liked: true });
          }
        }
      }
    }
  }

  async clickFavorite() {
    this.setState({ liked: !this.state.liked });
    const favorite = await api.services.favorite(this.props.service.id);
  }

  render() {
    return (
      <div>
        <div className="userDataContainer panelContainer UserServicePanel">
          <div className="btnLike" onClick={this.clickFavorite}>
            { this.state.liked ? <i className="fa fa-heart red" aria-hidden="true" /> :
            <i className="fa fa-heart-o" aria-hidden="true" />
            }

            <span>Me gusta</span>
          </div>
          { this.props.service.favorite_count > 0 &&
            <span className="spanMessage">A {this.props.service.favorite_count} personas le gusta este servicio</span>
          }
        </div>

        <style jsx>{`
          .userDataContainer {
            background: #fff;
            border: 1px solid #DDDDDD;
            color: #333;
            text-align: left;
            padding-left: 12.5px;
            padding-right: 12.5px;
            padding-bottom: 10px;
            padding-top: 10px;
            float: left;
            width: 100%;
            box-shadow: 0 4px 12px 0 rgba(182, 184, 200, 0.4);
            text-align: center;
          }

          .red {
            color: red;
          }

          .shareButton {
            padding: 5px 10px;
          }

          .btnLike {
            cursor: pointer !important;
            padding: 12px 28px !important;
            border: 1px solid #DBDBDB !important;
            border-radius: 4px !important;
          }

          .social-button {
            border-radius: 50%;
            border: 1px solid #757575;
            padding: 9px 0 0;
            width: 40px;
            height: 40px;
            margin-bottom: 0;
            text-align: center;
            display: inline-block;
            font-size: 14px;
            float: left;
            margin: 5px 5px;
            color: #757575;
          }

          .social-button:hover {
            color: #3b5998;
            border: 1px solid #3b5998;
          }

          .btnLike:hover {
            opacity: 0.7;
          }

          .btnLike > span {
            padding: 10px;
          }

          .btnSahred {
            position: fixed;
            left: 10px;
            top: 170px;
          }

          .btnSahred > i {
            padding: 5px 10px;
            color: #757575;
          }

          .spanMessage{
            font-weight: normal !important;
            color: #767676 !important;
            font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
            margin: 0px !important;
            word-wrap: break-word !important;
            font-size: 12px !important;
            line-height: 16px !important;
            letter-spacing: 0.4px !important;
            padding-top: 10px !important;
            padding-bottom: 0px !important;
            display: flex;
            flex: 1;
            justify-content: center;
          }

          @media (max-width: 600px) {
            .btnSahred {
              position: fixed;
              left: 10px;
              top: auto;
              bottom: 5px;
            }
          }

        `}</style>
      </div>
    );
  }

}

FavoritePanel.propTypes = {
  service: PropTypes.shape({
    favorite_count: PropTypes.number,
  }),
};

FavoritePanel.defaultTypes = {
  service: {},
};

export default FavoritePanel;
