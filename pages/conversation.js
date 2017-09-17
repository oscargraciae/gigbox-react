// import libraries
import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';

import api from '../api';
import timeAgo from '../utils/time-ago';
import { firebaseDatabase } from '../config/firebase';

// import components
import defaultPage from '../hocs/defaultPage';
import InboxMessages from '../components/inbox/InboxMessages';
import FormMessage from '../components/inbox/FormMessage';

class Conversation extends React.Component {
  static async getInitialProps({ req, query }) {
    return null;
  }

  constructor() {
    super();
    this.state = {
      conversation: null,
      currentUser: {},
      userMessage: {},
      messages: [],
      btnLoading: false,
      error: null,
      message: '',
      errorMessages: '',
      user: null,
    };

    this.onChange = this.onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  onChange(e) {
    this.setState({ message: e.target.value });
  }

  async initialFetch() {
    const { username } = this.props.url.query;
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
    } else {
      // this.setState({ error: 'Lo sentimos, no pudimos encontrar un usuario con ese nombre.' })
      location.href = '/conversations';
    }
  }

  addDbListener(id) {
    firebaseDatabase.ref(`messages/${id}`).on('value', (snap) => {
      const messages = snap.val();
      if (messages) this.setState({ messages });
    });
  }

  async sendMessage(e) {
    e.preventDefault();
    if (!Validator.isEmpty(this.state.message)) {
      this.setState({ btnLoading: true });
      const message = await api.inbox.send({
        recipient_id: this.state.userMessage.id,
        sender_id: this.state.currentUser.id,
        message: this.state.message,
      });

      if (message) {
        const ref = firebaseDatabase.ref(`messages/${message.inbox_id}`);
        const newMessageRef = ref.push();
        newMessageRef.set(message);

        this.addDbListener(message.inbox_id);
        this.setState({ message: '', btnLoading: false, errorMessages: '' });
      }
    } else {
      this.setState({ errorMessages: 'Por favor, ingresa un mensaje.' });
    }
  }

  render() {
    return (
      <div className="container container-margin-top">
        <div className="messagesContainer">
          <div className="row">
            <div className="col-md-8">
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
            <div className="col-md-4">
              <div className="userDataContainer panelContainer UserServicePanel">
                <div className="row">
                  <div className="col-md-2">
                    <img
                      src={this.state.userMessage.avatar}
                      alt={this.state.userMessage.first_name} width="45" height="45" className="img-circle"
                    />
                  </div>
                  <div className="col-md-10">
                    <span className="serviceUserName">
                      <Link prefetch as={`/u/${this.state.userMessage.username}`} href={`/user?username=${this.state.userMessage.username}`}>
                        <a>{this.state.userMessage.first_name}</a>
                      </Link>
                    </span>
                    <p className="UserServiceDescription">{this.state.userMessage.description ? this.state.userMessage.description.substring(0, 100) : null}... <a href={`/u/${this.state.userMessage.username}`} className="lbl lbl-blue">Ver perfil</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .panel {
            border: 1px solid #dce0e0;
            background-color: #fff;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
          }

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


          .UserServiceDescription {
            font-size: 13px;
            line-height: 22px;
            color: #757575;
          }

          .serviceUserName {
            font-weight: bold;
            font-size: 16px;
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

          .modalFooter {
            background: #f5f5f5;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #e5e5e5;
          }

          .userDataContainer {
            background: #fff;
            border: 1px solid #DDDDDD;
            color: #333;
            text-align: left;
            padding-left: 12.5px;
            padding-right: 12.5px;
            padding-bottom: 10px;
            padding-top: 10px;
            float: left;
            width: 100%;
            box-shadow: 0 4px 12px 0 rgba(182, 184, 200, 0.4);
          }

          .userDataContainer h4 {
            display: inline-block;
          }

          .spanMessage{
            font-weight: normal !important;
            color: #767676 !important;
            font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
            margin: 0px !important;
            word-wrap: break-word !important;
            font-size: 12px !important;
            line-height: 16px !important;
            letter-spacing: 0.4px !important;
            padding-top: 10px !important;
            padding-bottom: 0px !important;
            display: flex;
            flex: 1;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

export default defaultPage(Conversation);
