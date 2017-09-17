import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import api from '../../api';
import { firebaseDatabase } from '../../config/firebase';

class FormMessage extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
      btnLoading: false,
      errorMessages: '',
      currentUser: null,
      user: null,
    };

    this.onChange = this.onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  onChange(e) {
    this.setState({ message: e.target.value });
  }

  async sendMessage(e) {
    e.preventDefault();
    if (!Validator.isEmpty(this.state.message)) {
      this.setState({ btnLoading: true });
      const message = await api.inbox.send({
        recipient_id: this.props.to.id,
        sender_id: this.props.from.id,
        message: this.state.message,
      });
      if (message) {
        const ref = firebaseDatabase.ref(`messages/${message.inbox_id}`);
        const newMessageRef = ref.push();
        newMessageRef.set(message);

        this.setState({ message: '', btnLoading: false, errorMessages: '' });
      }
    } else {
      this.setState({ errorMessages: 'Por favor, ingresa un mensaje.' });
    }
  }

  render() {
    return (
      <div className="conversationHeader">
        <form onSubmit={this.sendMessage}>
          <input type="text" onChange={this.onChange} value={this.state.message} className="inputMessage" placeholder="Escribe un mensaje aquí" autoFocus />
          <button type="submit" className="btnMessage">
            {!this.state.btnLoading && <i className="fa fa-arrow-right fa-lg" aria-hidden="true" /> }
            {this.state.btnLoading && <i className="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></i> }
          </button>
        </form>
        <span className="lbl lbl-danger">{this.state.errorMessages}</span>

        <style jsx>{`
          .conversationHeader {
            background: #f5f5f5;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #e5e5e5;
            text-align: left;
          }

          .inputMessage {
            width: 90%;
            padding: 10px;
          }

          .inputMessage:focus {
            outline: 0px;
          }

          .btnMessage {
            padding: 10px;
            background: transparent;
            border: none;
            width: 10%;
          }
        `}</style>
      </div>
    );
  }
}

export default FormMessage;
