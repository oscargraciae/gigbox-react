import React, { Component } from 'react';
import Head from 'next/head';

import whitePage from '../hocs/whitePage';
import Slider from '../components/boarding/Slider';

class Welcome extends Component {
  static async getInitialProps() {
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.initialData();
  }

  async initialData() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return this.setState({ currentUser: user });
  }

  render() {
    return (
      <div>
        <Head>
          <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-yTAH4cD5Lq3VDwysl-Me5bBek1phNBY&libraries=places" />
        </Head>
        <div className="HeaderWelcome">
          <nav>
            <img src="/static/logo-gigbox2.png" alt="Gigbox" height="40" />
          </nav>
        </div>
        <div className="container">
          <div className="ComponentCol">
            {this.state.currentUser && (
              <Slider currentUser={this.state.currentUser} {...this.props} />
            )}

          </div>
        </div>
        <style jsx>{`
          .HeaderWelcome {
            padding: 10px;
            text-align: center;
            box-shadow: 0 1px 10px 0 rgba(0,0,0,.1);
          }

          .ComponentCol {
            max-width: 600px;
            padding: 15px;
            margin: 0 auto;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default whitePage(Welcome);
