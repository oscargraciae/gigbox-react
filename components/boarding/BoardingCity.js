import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import ButtonApp from '../general/ButtonApp';

import api from '../../api';

class BoardingCity extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isLoading: false,
      address: '',
      geocodeResults: null,
      latLng: null,
    };

    this.save = this.save.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = (address) => this.setState({ address });
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this);
  }

  handleSelect(address, placeId) {
    this.setState({ loading: true });
    geocodeByAddress(address,  (err, latLng) => {
      if (err) { console.log('Oh no!', err); }

      this.setState({ loading: false, address, geocodeResults: this.renderGeocodeSuccess(latLng.lat, latLng.lng), latLng });
    });
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

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    );
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Ciudad, Estado',
      autoFocus: true,
    };

    const cssClasses = {
      root: 'form-group',
      input: 'inputCity',
      autocompleteContainer: 'autocomplete-container',
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    return (
      <div>
        <h1>¿Dónde vives?</h1>
        <p>Conecta con personas que viven cerca de ti.</p>

        <div>
          <form onSubmit={this.handleFormSubmit} className="text-left">
            <PlacesAutocomplete
              inputProps={inputProps}
              onSelect={this.handleSelect}
              classNames={cssClasses}
              autocompleteItem={AutocompleteItem}
            />
            <div className="containerButton text-center">
              {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x loadingSpinner" /></div> : null}
              {/*{!this.state.loading && this.state.geocodeResults ?
                <div className='geocoding-results'>{this.state.geocodeResults}</div> :
              null}*/}
            </div>
          </form>
        </div>
        <div className="containerButton">
          <ButtonApp
            text="Continuar"
            buttonStyle="btn btn-primary btn-large"
            click={this.save}
            disabled={!this.state.geocodeResults}
            loading={this.state.isLoading}
          />
        </div>

        <style>{`
          .containerButton {
            padding: 10px 0px;
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
