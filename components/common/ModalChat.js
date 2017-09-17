import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import { firebaseDatabase } from '../../config/firebase';
import api from '../../api';
import timeAgo from '../../utils/time-ago';

import InboxMessages from '../inbox/InboxMessages';

class ModalChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {},
      showModal: false,
      message: '',
      messages: [],
      inboxId: 0,
      currentUser: {},
      loading: false,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  onChange(e) {
    this.setState({ message: e.target.value });
  }

  addDbListener(id) {
    firebaseDatabase.ref(`messages/${id}`).on('value', (snap) => {
      const messages = snap.val();
      if (messages) this.setState({ messages });
    });
  }

  async initialFetch() {
    const { username } = this.props.user;
    const userMessage = await api.user.get(username);
    if (userMessage) {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const conversation = await api.inbox.getByUser(username);

      if (conversation.error) {
        this.setState({ userMessage, currentUser });
      } else {
        this.setState({ conversation, currentUser, userMessage });
        this.addDbListener(conversation.id);
      }
    }
  }

  async sendMessage(e) {
    e.preventDefault();
    if (!Validator.isEmpty(this.state.message)) {
      this.setState({ loading: true });

      const message = await api.inbox.send({
        recipient_id: this.state.user.id,
        sender_id: this.state.currentUser.id,
        message: this.state.message,
      });

      if (message) {
        const ref = firebaseDatabase.ref(`messages/${message.inbox_id}`);
        const newMessageRef = ref.push();
        newMessageRef.set(message);

        this.addDbListener(message.inbox_id);
        this.setState({ message: '', loading: false });
      }
    }
  }

  render() {
    const { user, messages } = this.state;

    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Contacta a {user.first_name}</Modal.Title>
          </Modal.Header>
          <Modal.Footer bsClass="modalFooter">
            <form onSubmit={this.sendMessage}>
              <input type="text" onChange={this.onChange} value={this.state.message} className="inputMessage" placeholder="Escribe un mensaje aquí" autoFocus />
              <button className="btnMessage">
                {!this.state.loading && <i className="fa fa-arrow-right fa-lg" aria-hidden="true" /> }
                {this.state.loading && <i className="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></i> }
              </button>
            </form>
          </Modal.Footer>
          <Modal.Body>
            <div className="containerMessages">
              <InboxMessages currentUser={this.state.currentUser} messages={this.state.messages} />
            </div>
          </Modal.Body>
        </Modal>

        <style jsx>{`
          .containerMessages {
            max-height: 400px;
          }

          .rowMessage {
            padding: 10px 0px;
          }

          .textDate {
            color: #757575;
            padding-left: 50px;
            font-size: 10px;
          }

          .avatarMessage {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .textMessage {
            background: #F7F9FB;
            padding: 6px 10px 8px 10px;
            display: inline-block;
            color: #333333;
            border-radius: 7.5px;
            margin-left: 10px;
            position: relative;
            max-width: 75%;
          }

          .textMessage:before {
            content: "";
            position: absolute;
            top: 20%;
            left: -7px;
            border-right: 10px solid #F7F9FB;
            border-bottom: 10px solid transparent;
            border-top: 10px solid transparent;
          }

          .arrow {
              display: inline-block;
              width: 0;
              height: 0;
              margin-left: 2px;
              vertical-align: middle;
              border-left: 4px dashed;
              border-top: 4px solid\9;
              border-top: 4px solid transparent;
              border-bottom: 4px solid transparent;
          }

          .rowRight {
            text-align: right;
            padding-right: 10px;
          }

          .avatarMessageRight {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            float: right;
            margin-left: 10px;
          }

          .textDateRight {
            color: #757575;
            padding-left: 50px;
            font-size: 10px;
          }

          .textMessageRight {

            background: #FF7E73;
            padding: 6px 10px 8px 10px;
            display: inline-block;
            color: #FFF;
            border-radius: 7.5px;
            margin-left: 10px;
            position: relative;
            max-width: 75%;
            text-align: left;
          }

          .textMessageRight:before {
            content: "";
            position: absolute;
            top: 20%;
            right: -7px;
            border-left: 10px solid #FF7E73;
            border-bottom: 10px solid transparent;
            border-top: 10px solid transparent;
          }
        `}</style>
      </div>
    );
  }
}

ModalChat.propTypes = {
  user: PropTypes.shape({}),
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

ModalChat.defaultProps = {
  user: {},
  showModal: false,
  closeModal: null,
};

export default ModalChat;
