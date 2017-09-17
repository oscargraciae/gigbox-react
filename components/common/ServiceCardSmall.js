import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import api from '../../api';

const capitalize = (input) => {
  return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
}

class ServiceCardSmall extends React.Component {
  constructor() {
    super();

    this.state = {
      liked: null,
      likeCount: 0,
    };

    this.clickFavorite = this.clickFavorite.bind(this);
  }

  componentDidMount() {
    this.initial();
  }

  initial() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const favorites = this.props.service.favorites;
      if (favorites) {
        for (let i = 0; i < favorites.length; i++) {
          if (user.id === favorites[i].user_id) {
            const favorite = favorites[i];
            this.setState({ liked: favorite.active });
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
    const { service } = this.props;
    const divStyle = { backgroundImage: 'url(' + service.cover + ')' };
    return (
      <div className="ServiceCardWapper">
        <div className="ServiceCard">
          <div className="Service-head ServiceImage polygon" style={divStyle}>
            <div className="flag">DESDE ${Math.round(service.packages[0].price).toLocaleString()}</div>
            <a className="link-card" href={`/service/${service.id}`} />

            <div className="serviceHeard">
              { this.state.liked &&
                <a className="fa-stack" onClick={this.clickFavorite}>
                  <i className="fa fa-heart fa-heart-active fa-stack-1x" aria-hidden="true" />
                  <i className="fa fa-heart-o fa-heart-o-active fa-stack-1x" aria-hidden="true" />
                </a>
              }

              { !this.state.liked &&
                <a className="fa-stack" onClick={this.clickFavorite}>
                  <i className="fa fa-heart fa-heart-inactive fa-stack-1x" aria-hidden="true" />
                  <i className="fa fa-heart-o fa-heart-o-inactive fa-stack-1x" aria-hidden="true" />
                </a>
               }

            </div>
          </div>
          <div className="Service-body">
            <div className="service-content">
              <div>
                <a href={`/service/${service.id}`}>
                  <h6 className="Service-title">{service.name}
                  </h6>
                </a>
              </div>
              <p className="project-blurb">
                <a className="descriptionService" href={`/service/${service.id}`}>{ capitalize(service.description.substr(0, 120)) }...</a>
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .polygon {
            -webkit-clip-path: polygon(0 0, 1600px 0, 100% 90%, 0 100%);
            clip-path: polygon(0 0, 1600px 0, 100% 90%, 0 100%);
          }

          .serviceHeard {
            position: absolute;
            top: 5px;
            right: 12px;
            font-size: 24px;
            text-decoration: none;
            line-height: 1em;
            z-index: 4;
            color: white;

            transition: all .2s ease-in-out 0s;
          }

          .serviceHeard:hover .fa-heart-o {
            color: red;
            cursor: pointer;
          }

          .fa-stack {
            position: relative;
            display: inline-block;
            width: 2em;
            height: 2em;
            line-height: 2em;
            vertical-align: middle;
            width: 1.1em;
            height: 1em;
            line-height: 1em;
          }

          .fa-stack-1x, .fa-stack-2x {
            position: absolute;
            left: 0;
            width: 100%;
            text-align: center;
          }

          .fa-heart-inactive {
            color: #ccc;
            opacity: .5;
          }

          .fa-heart-o-inactive {
            color: white;
          }

          .fa-heart-active {
            color: red;
          }

          .fa-heart-o-active {
            color: red;
          }

          .descriptionService {
            color: #757575;
          }

          .descriptionService:first-letter {
            text-transform:capitalize;
          }

          .ServiceCardWapper {
            width: 265px;
            height: 310px;
            -webkit-box-shadow: 0 0.5em 1.5em 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 .5em 1.5em 0 rgba(0,0,0,.1);
            box-shadow: 0 0.5em 1.5em 0 rgba(0,0,0,.1);
            margin: 1em;
            -webkit-transition: all .2s ease-in-out 0s;
            -moz-transition: all .2s ease-in-out 0s;
            -o-transition: all .2s ease-in-out 0s;
            -ms-transition: all .2s ease-in-out 0s;
            transition: all .2s ease-in-out 0s;
          }

          .ServiceCardWapper:hover {
            transform: translateY(-.3em);
            -webkit-box-shadow: 0 0.4em 2.4em 0 rgba(0,0,0,.2);
            -moz-box-shadow: 0 .4em 2.4em 0 rgba(0,0,0,.2);
            box-shadow: 0 0.4em 2.4em 0 rgba(0,0,0,.2);
          }

          .ServiceCard {
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            width: 265px;
            margin: 0 20px 20px 0;
          }

          .service-content {
            height: 135px;
          }
          .Service-title{
            margin-bottom: 10px;
          }

          .project-card-footer {
            position: absolute;
            bottom: -50px;
            width: 100%;
          }

          .project-blurb-location{
            color: #4fc3f7;
            font-size: 12px;
            padding: 20px 0;
            font-weight: 500;
          }

          .flagPrice {
            padding: .6em 2em;
            background: #4fc3f7;
            position: absolute;
            z-index: 1;
            top: 2em;
            left: -1em;
            color: #fff;
            font-weight: 600;
            border-top-right-radius: .3em;
            border-bottom-right-radius: .3em;
            -webkit-box-shadow: 0 5px 30px 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 5px 30px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 30px 0 rgba(0,0,0,.1);
          }

          .flagPrice:after {
            width: 0;
            height: 0;
            margin-left: 2px;
            vertical-align: middle;
            border-top: 4px dashed;
            border-top: 4px solid\9;
            border-right: 4px solid transparent;
            border-left: 4px solid transparent;
          }

          .flag {
            display: inline-block;
            padding: 5px 25px;
            text-aling: center;
            top: 10px;
            left: 0;
            position: absolute;
            text-align: center;
            vertical-align: middle;
            line-height: 1;
            color: #fff;
            background: #ff1940;

            font-weight: 400;
            -webkit-box-shadow: 0 5px 30px 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 5px 30px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 30px 0 rgba(0,0,0,.1);
            font-size: 12px;
          }
          .flag:before, .flag:after {
            content: '';
            width: 0;
            height: 0;
            border-right: 0.8em solid transparent;
            right: -0.8em;
            position: absolute;
            top: 0;
            border-top: 0.8em solid #ff1940;
          }
          .flag:after {
            top: auto;
            bottom: 0;
            border-top: none;
            border-bottom: 0.8em solid #ff1940;
          }

          .flagPrice2:after {
            content: "";
            width: 0;
            height: 0;
            border-left: 1em solid transparent;
            border-right: 0;
            border-top: 1em solid #545454;
            position: absolute;
            left: 0;
            bottom: -1em;
          }

          .labelSmall {
            font-size: 12px;
          }

          @media (max-width: 600px) {
            .ServiceCardWapper {
              width: 100%;
            }

            .ServiceCard{
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

ServiceCardSmall.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number,
    cover: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.description,
    packages: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.shape({
      avatar: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      username: PropTypes.username,
    }),
  }),
};

ServiceCardSmall.defaultProps = {
  service: {},
  price: '0',
};

export default ServiceCardSmall;
