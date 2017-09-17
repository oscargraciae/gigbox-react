import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import defaultPage from '../hocs/defaultPage';
import LoadingSpinner from '../components/general/LoadingSpinner';
import InboxConversations from '../components/inbox/InboxConversations';
import InboxMessages from '../components/inbox/InboxMessages';

import api from '../api';
import { firebaseDatabase } from '../config/firebase';

class Messages extends React.Component {
  static async getInitialProps({ req, query }) {
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      conversation: {},
      conversations: [],
      conversationId: 0,
      messages: [],
      message: '',
      loading: true,
      btnLoading: false,
      user: {},
      currentUser: {},
      errorMessages: '',
    };

    this.addDbListener = this.addDbListener.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initialMessages();
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

  async initialMessages() {
    const conversations = await api.inbox.getConversations();
    const inboxId = this.props.url.query.id;

    const currentUser = JSON.parse(localStorage.getItem('user'));
    this.setState({ conversations, currentUser, loading: false });

    if (inboxId) {
      const conversation = await api.inbox.getById(inboxId);
      const user = conversation.sender.id === this.state.currentUser.id ?
                  conversation.recipient :
                  conversation.sender;
      this.setState({ conversation, user });
      this.addDbListener(conversation.id);
    }
  }

  async sendMessage(e) {
    e.preventDefault();
    if (!Validator.isEmpty(this.state.message)) {
      this.setState({ btnLoading: true });
      const message = await api.inbox.send({
        recipient_id: this.state.user.id,
        sender_id: this.state.currentUser.id,
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
      <div className="container container-margin-top">
        <div className="inboxContainer">
          <div className="conversationsList">
            { this.state.loading && <LoadingSpinner /> }
            {this.state.conversations.map((item) => {
              return (
                <div key={item.id} >
                  <InboxConversations
                    currentUser={this.state.currentUser}
                    currentCoversationId={this.props.url.query.id}
                    item={item}
                  />
                </div>
              );
            })}
          </div>
          <div className="messagesContainer">
            { !this.state.loading &&
              <div>
                <div className="conversationHeader">
                  <form onSubmit={this.sendMessage}>
                    <input type="text" onChange={this.onChange} value={this.state.message} className="inputMessage" placeholder="Escribe un mensaje aquí" autoFocus />
                    <button type="submit" className="btnMessage">
                      {!this.state.btnLoading && <i className="fa fa-arrow-right fa-lg" aria-hidden="true" /> }
                      {this.state.btnLoading && <i className="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></i> }
                    </button>
                  </form>
                  <span className="lbl lbl-danger">{this.state.errorMessages}</span>
                </div>
                <InboxMessages currentUser={this.state.currentUser} messages={this.state.messages} />
              </div>
            }

          </div>
        </div>
        <style jsx>{`
          .inboxContainer {
            width: 100%;
            margin-top: 10px;
            border: 1px solid #dcdcdc;
            height: 600px;
            display: flex;
          }

          .conversationTitle {
            border-bottom: 1px solid #dcdcdc;
          }

          .conversationTitle > h3 {
            color: #333;
            font-size: 18px;
            margin: 0px;
            padding: 10px 20px;
            border-bottom: 1px solid #dcdcdc;
          }

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

          .conversationsList {
            max-width: 360px;
            width: 100%;
            position: relative;
            border-right: 1px solid #dcdcdc;
            overflow-y: auto;
            height: 600px;
          }

          .messagesContainer{
            width: 100%;
            height: 500px;
            height: 600px;
          }

        `}</style>
      </div>
    );
  }
}

export default defaultPage(Messages);
