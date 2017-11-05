import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import api from '../api';

import SliderServices from '../components/common/SliderServices';
import defaultPage from '../hocs/defaultPage';
import Jumbotron from '../components/home/Jumbotron';
import MetaPage from '../components/MetaPage';

class ServiceNew extends React.Component {
  static async getInitialProps() {
    const [serviceRecommended, services1, services2] = await Promise.all([
      api.services.getSample(),
      api.services.getBySubCategory(22),
      api.services.getBySubCategory(16),
    ]);
    return { services: serviceRecommended, services1, services2 };
  }

  constructor() {
    super();
    this.state = {
      query: '',
      services1: [],
      services2: [],
      services3: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [services1, services2, services3, res] = await Promise.all([
      api.services.getBySubCategory(29),
      api.services.getBySubCategory(28),
      api.services.getBySubCategory(21),
      api.categories.getCategories(),
    ]);

    this.setState({
      catHome: res[0].sub_categories,
      catEvents: res[1].sub_categories,
      catCourses: res[2].sub_categories,
      services1,
      services2,
      services3,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    Router.push({
      pathname: '/search',
      query: { text: this.state.query },
    });
  }

  render() {
    return (
      <div>
        <div className="container-white">

        </div>
        <style jsx>{`
          .form {
            margin-left:25px;
            margin-right:25px;
          }
          .title-h2 {
            margin-top: -20px !important;
            margin-bottom: 40px !important;
          }

          .containerFormMobile {
            display: none;
          }

          .subtitleMain {
            text-align: left;
            font-size: 24px;
            margin: 2px 0px;
            font-weight: 500;
          }

          .search-strip {
            position: relative;
            -moz-transform: translateY(-120%);
            -o-transform: translateY(-120%);
            -ms-transform: translateY(-120%);
            -khtml-transform: translateY(-120%);
            transform: translateY(-120%);
            display: flex;
            justify-content: center;
            z-index: 2;
          }

          .search-input-wrapper {
            padding: 0 2.4em;
            height: 4em;
            display: flex;
            align-items: center;
            border-radius: 3px;
            background: #fff;
            -webkit-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            margin: 0 .4em;
            position: relative;
          }

          .search-input-wrapper input {
            width: 20em;
            outline: 0;
            font-size: 1.4em;
            margin-left: 1em;
            border: none;
            transition: all .3s ease-in-out;
          }

          .search-button {
            cursor: pointer;
            -webkit-transition: all .2s ease-in-out 0s;
            -moz-transition: all .2s ease-in-out 0s;
            -o-transition: all .2s ease-in-out 0s;
            -ms-transition: all .2s ease-in-out 0s;
            transition: all .2s ease-in-out 0s;
            padding: 0 2.4em;
            height: 4em;
            display: flex;
            align-items: center;
            border-radius: 3px;
            background: #ff1940;
            -webkit-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            -moz-box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            box-shadow: 0 5px 18px 0 rgba(0,0,0,.1);
            border: none;
          }

          .search-button span {
            color: #fff;
            font-weight: 500;
            letter-spacing: -.1px;
            line-height: 1.4em;
            height: 1.4em;
            font-size: 14px;
          }

          .MainSearch {
            height: 150px;
          }

          .col-centered{
            text-align: center;
          }

          .btn-principal {
            padding: 6px 12px;
          }

          .row-feature{
            margin-top:10px;
            text-align: left;
          }

          .icon-radius{
            border-radius: 50%;
            padding: 17px 0 0;
            width: 60px;
            height: 60px;
            font-size: 14px;
            margin: 0 5px;
            background: #ff1940;
            color: #fff;
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

          @media (max-width: 600px) {
            .search-strip {
              display: none;
            }

            .row-feature {
              display: none;
            }

            .subtitleMain {
              text-align: left;
              font-size: 16px;
              margin: 2px 0px;
              font-weight: 500;
              line-height: 21px;
            }

            .containerFormMobile{
              display: block;
            }

            .homeMobile {
              display: block;
            }

            .titleMobile {
              font-size: 14px;
              color: #757575;
            }

            .box-mobile {
              padding: 10px;
              width: 100%;
            }

            .searchMobileHome {
              display: flex;
            }

            .inputMobile {
              width: 100%;
              padding: 9px 12px;
              border: 1px #D2D6DF solid;
              background: #fff;
              color: #45494E;
              font-size: 16px;
              line-height: 24px;
              font-weight: 400;
              letter-spacing: .5px;
            }

            .btnMobileHome {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              display: inline-block;
              margin-top: 0;
              font-weight: 600;
              color: #fff;
              background-color: #FF1940;
            }
          }

        `}</style>
      </div>
    );
  }
}

export default defaultPage(ServiceNew);
