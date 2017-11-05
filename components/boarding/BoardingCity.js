//import libraries
import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';

//import components
import ButtonApp from '../general/ButtonApp';

import api from '../../api';

class BoardingCity extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isLoading: false,
      address: '',
      latLng: null,
    };

    this.save = this.save.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onChange = (address) => this.setState({ address });
  }

  async save() {
    this.setState({ isLoading: true });
    const { lat, lng } = this.state.latLng;
    const { address } = this.state;
    const resp = await api.user.update(this.props.currentUser.id, { lat, lng, address });
    if (resp) {
      this.setState({ isLoading: false });
      this.props.nextSlide();
    }
  }

  onSuggestSelect(suggest) {
    console.log(suggest);

    this.setState({ loading: false, address: suggest.description, latLng: suggest.location });
  }

  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput);
  }

  render() {
    return (
      <div>
        <h1>¿Dónde vives?</h1>

        <div>
          <form onSubmit={this.handleFormSubmit} className="text-left">
            <Geosuggest
              placeholder="Ciudad, Estado"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onSuggestSelect={this.onSuggestSelect}
              suggestsClassName="suggest"
              suggestItemClassName="suggestItem"
              onSuggestNoResults={this.onSuggestNoResults}
              inputClassName="inputCity" />
            <div className="containerButton text-center">
              {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x loadingSpinner" /></div> : null}
            </div>
          </form>
        </div>
        <div className="containerButton">
          <ButtonApp
            text="Continuar"
            buttonStyle="btn btn-primary btn-large"
            click={this.save}
            disabled={!this.state.latLng}
            loading={this.state.isLoading}
          />
        </div>

        <style>{`
          .containerButton {
            padding: 10px 0px;
          }

          .geosuggest__suggests--hidden {
            max-height: 0;
            overflow: hidden;
            border-width: 0;
          }

          .suggest {
            border: 1px solid #DDD;
          }

          .suggestItem:hover {
            color: green;
            cursor: pointer;
          }

          .suggestItem {
            padding: 10px;
          }

          .inputCity {
            font-size: 24px;
            width: 100%;
            padding: 0px 10px;
            padding-left: 5px;
            line-height: 35px;
            border: none;
            color: #565a5c;
            border: none;
            border-bottom: 2px solid #DDDDDD !important;
          }

          .inputCity:focus {
            outline: 0px;
            border-bottom: 2px solid #ff1940 !important;
          }

          .form-group {
            display: inline-block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 5rem;
            width: 100%;
          }

          .autocomplete-container {
            border-bottom: honeydew;
            border-left: honeydew;
            border-right: honeydew;
            border-top: 1px solid #e6e6e6;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            border-radius: 0 0 2px 2px;
          }

          .loadingSpinner {
            color: #18bc9c;
            font-size: 30px;
          }
        `}</style>
      </div>
    );
  }
}

export default BoardingCity;
