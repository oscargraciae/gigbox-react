import React, { Component } from 'react';
import axios from 'axios';

import NotificationItem from './NotificationItem';

import api from '../../api';

class NotificationList extends Component {

  constructor() {
    super();
    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const token = localStorage.token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const notifications = await api.notifications.getNotifications();
      this.setState({ notifications });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  render() {
    const { notifications } = this.state;
    const emptyStage = (
      <div className="alerts-empty">
        <div>
          <i className="fa fa-bell-slash-o fa-3x" aria-hidden="true" />
          <h4>No hay notificaciones</h4>
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
          <i className="fa fa-bell-o fa-lg alert-active" />
          {this.props.count !== 0 && <span className="bangeAlerts">{this.props.count}</span> }

        </a>
        <ul className="dropdown-menu dropdown-message">
          <li>
            <div className="alerts-head">
              <h5>Notificaciones</h5>
            </div>
            { !notifications && emptyStage }
            { notifications.map((item) => (
              <div className={"alerts-row " + (!item.read ? 'notRead' : '') } key={item.id}>
                <NotificationItem key={item.id} {...item} />
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

export default NotificationList;
