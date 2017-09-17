import React, { Component } from 'react';
import axios from 'axios';

import InboxItem from './InboxItem';

import api from '../../api';

class InboxList extends Component {

  constructor() {
    super();
    this.state = {
      conversations: [],
      currentUser: {},
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const token = localStorage.token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const conversations = await api.inbox.getConversations();
      const user = JSON.parse(localStorage.getItem('user'));

      this.setState({ conversations, currentUser: user });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  render() {
    const { conversations } = this.state;
    const emptyStage = (
      <div className="alerts-empty">
        <div>
          <i className="fa fa-bell-slash-o fa-3x" aria-hidden="true" />
          <h4>No hay mensajes</h4>
        </div>
      </div>
    );
    return (
      <li>
        <a
          className="dropdown-toggle not-mobile"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-comments-o fa-lg" />
          { this.props.count !== 0 && <span className="bangeAlerts">{this.props.count}</span> }

        </a>
        <ul className="dropdown-menu dropdown-message">
          <li>
            <div className="alerts-head">
              <h5>Mensajes</h5>
            </div>
            { !conversations && emptyStage }
            { conversations.slice(0, 5).map((item) => (
              <div className={'alerts-row ' + ((!item.inbox_message[0].read && item.inbox_message[0].sender_user !== this.state.currentUser.id) ? 'notRead' : '') } key={item.id}>
                <InboxItem key={item.id} {...item} currentUser={this.state.currentUser} />
              </div>
            )) }
          </li>
        </ul>

        <style jsx>{`
        .notRead {
          background: rgba(255, 187, 88, 0.3);
        }
      `}</style>
      </li>
    );
  }
}

export default InboxList;
