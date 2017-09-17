import React, { Component } from 'react';
import Validator from 'validator';
import Router from 'next/router';

import ButtonApp from '../general/ButtonApp';

import api from '../../api';

class BoardingPhone extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      phone: '',
      isPhoneValid: false,
      error: '',
    };

    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const phone = e.target.value;
    this.setState({ phone: e.target.value, isPhoneValid: false });

    if (Validator.isNumeric(phone)) {
      this.setState({ error: '' });
      if (phone.length >= 10) {
        this.setState({ isPhoneValid: true });
      }
    } else {
      this.setState({ error: 'El teléfono no debe contener letras, espacios o símbolos.' });
    }
  }

  async save() {
    this.setState({ loading: true });
    const cellphone = this.state.phone;
    const res = await api.user.update(this.props.currentUser.id, { cellphone });
    if (res) {
      const user = JSON.stringify(res);
      window.localStorage.setItem('user', user);
      if(this.props.url.query.ref === 'supplier') {
        location.href = 'app/services/new';
      }else if(this.props.url.query.ref !== 'supplier' && this.props.url.query.ref) {
        location.href = '/service/' + this.props.url.query.ref;
      }else {
        location.href = '/';
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Ingresa tu teléfono</h1>
        <p>Solo recibirás notificaciones SMS cuando otro usuario se ponga en contacto contigo. <br /> Tu número NO será publico en Gigbox.</p>

        <div>
          <form onSubmit={this.handleFormSubmit} className="text-left">
            <span className="codePhone">+52</span>
            <input
              className="inputPhone"
              maxLength="10"
              autoFocus
              placeholder="Número de teléfono celular"
              value={this.state.phone}
              onChange={this.onChange}
            />
            <p className="errorMessages">{this.state.error}</p>
          </form>
        </div>
        <div className="containerButton">
          <ButtonApp
            text="Continuar"
            buttonStyle="btn btn-primary btn-large"
            click={this.save}
            disabled={!this.state.isPhoneValid}
            loading={this.state.loading}
          />
        </div>

        <style jsx>{`
          .codePhone {
            display: inline-block;
            font-size: 24px;
            padding: 1px 10px;
            border-bottom: 2px solid #DDDDDD !important;
            margin-right: 5px;
            color: #565a5c;
          }

          .containerButton {
            padding: 20px 0px;
          }

          .errorMessages {
            color: #cc1433;
            padding: 10px 0px;
            font-size: 14px;
          }
          .inputPhone {
            font-size: 24px;
            width: 80%;
            padding: 0px 10px;
            padding-left: 5px;
            line-height: 35px;
            border: none;
            color: #565a5c;
            border: none;
            border-bottom: 2px solid #DDDDDD !important;
          }

          .inputPhone:focus {
            outline: 0px;
            border-bottom: 2px solid #ff1940 !important;
          }
      `}</style>
      </div>
    );
  }
}

export default BoardingPhone;
