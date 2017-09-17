import React, { Component } from 'react';
import { Line } from 'rc-progress';
import PropTypes from 'prop-types';

import { logEvent } from '../../config/analytics';

import Welcome from './Welcome';
import BoardingAvatar from './BoardingAvatar';
import BoardingCity from './BoardingCity';
import BoardingPhone from './BoardingPhone';

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      avg: 25,
      numPages: 4,
    };

    this.nextSlide = this.nextSlide.bind(this);
  }

  nextSlide() {
    logEvent("OnBoarding", `Step Complete ${this.state.currentPage}`);
    this.setState({ currentPage: this.state.currentPage + 1, avg: this.state.avg + 25 });
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.state.currentPage} / {this.state.numPages}</span>
        </div>
        <Line percent={this.state.avg} strokeWidth="1" strokeColor="#ff1940" />
        { this.state.currentPage === 1 && <Welcome currentUser={this.props.currentUser} nextSlide={this.nextSlide} /> }
        { this.state.currentPage === 2 && <BoardingAvatar currentUser={this.props.currentUser} nextSlide={this.nextSlide} /> }
        { this.state.currentPage === 3 && <BoardingCity currentUser={this.props.currentUser} nextSlide={this.nextSlide} /> }
        { this.state.currentPage === 4 && <BoardingPhone currentUser={this.props.currentUser} nextSlide={this.nextSlide} {...this.props} /> }
      </div>
    );
  }
}

Slider.propTypes = {
  currentUser: PropTypes.shape({}),
};

Slider.defaultProps = {
  currentUser: {},
};

export default Slider;
