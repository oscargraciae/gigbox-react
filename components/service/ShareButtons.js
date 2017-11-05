import React from 'react';

import api from '../../api';

class ShareButtons extends React.Component {
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
    const service = this.props.service;
    return (
      <div className="btnSahred">
        <div className="shareButton">
          <a className="social-button-large" href={`https://twitter.com/intent/tweet?text=¡Echale un vistazo! ${service.name} https://gigbox.mx/service/${service.id} @gigboxmx&hashtags=Gigbox&related=gigboxmx`} target="_blank">
          { this.state.liked ? <i className="fa fa-heart red" aria-hidden="true" /> : <i className="fa fa-heart-o" aria-hidden="true" /> }
          { this.props.service.favorite_count > 0 && <span className="totalFav">{this.props.service.favorite_count}</span> }
          </a>
        </div>
        <div className="fb-share-button shareButton" data-href={`/service/${service.id}`} data-layout="button" data-size="small" data-mobile-iframe="true">
          <a className="fb-xfbml-parse-ignore social-button" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgigbox.mx%2Fservice%2F${service.id}}&amp;src=sdkpreparse`} >
            <i className="fa fa-facebook fa-lg" aria-hidden="true" />
          </a>
        </div>
        <div className="shareButton">
          <a className="social-button" href={`https://twitter.com/intent/tweet?text=¡Echale un vistazo! ${service.name} https://gigbox.mx/service/${service.id} @gigboxmx&hashtags=Gigbox&related=gigboxmx`} target="_blank">
            <i className="fa fa-twitter fa-lg" aria-hidden="true" />
          </a>
        </div>
        <style jsx>{`
          .btnSahred {
            display: flex;
            justify-content: flex-end;
          }

          .shareButton {
            margin-right: 0px;
          }

          .social-button {
            border-radius: 15px;
            border: 1px solid #565A5C;
            padding: 5px 0 0;
            width: 30px;
            height: 30px;
            margin-bottom: 0;
            text-align: center;
            display: inline-block;
            font-size: 14px;
            float: left;
            margin: 0 5px;
          }

          .social-button:hover {
            color: #ff1940;
            border-color: #ff1940;
          }

          .social-button-large {
            border-radius: 15px;
            border: 1px solid #565A5C;
            padding: 5px 0 0;
            width: 60px;
            height: 30px;
            margin-bottom: 0;
            text-align: center;
            display: inline-block;
            font-size: 14px;
            float: left;
            margin: 0 5px;
          }

          .social-button-large:hover {
            color: #ff1940;
            border-color: #ff1940;
          }

          .red {
            color: red;
          }

          .totalFav {
            padding-left: 8px;
          }

        `}</style>
      </div>
    );
  }
}

export default ShareButtons;
