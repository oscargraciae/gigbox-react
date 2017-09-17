// import libraries
import React from 'react';

import api from '../api';
import timeAgo from '../utils/time-ago';

// import components
import defaultPage from '../hocs/defaultPage';

class Conversations extends React.Component {
  static async getInitialProps({ req, query }) {
    return null;
  }

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
    const conversations = await api.inbox.getConversations();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    this.setState({ conversations, currentUser });
  }

  render() {
    return (
      <div className="container container-margin-top">
        <div className="panel">
          <ul className="list-layout">
            {this.state.conversations.map((item) => {
              const user = item.sender.id === this.state.currentUser.id ? item.recipient : item.sender;
              return (
                <a href={`/conversation/${user.username}`}>
                <li className="panelBody" key={item.id}>
                  <div className="row">
                    <div className="col-sm-9 col-md-2">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="containerImg">
                            <img
                              className="userImage"
                              src={user.avatar}
                              alt="Mensaje de "
                              height="24"
                              width="24" />
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="messageUser">{user.first_name}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-7 col-md-7">
                      <div className="message">
                        <span>{item.inbox_message[0].message}</span>
                      </div>
                    </div>
                    <div className="col-sm-7 col-md-3">
                      <time className="messageDate">hace {timeAgo(new Date(item.inbox_message[0].created_at))}</time>
                    </div>
                  </div>
                </li>
                </a>
              );
            })}
          </ul>
        </div>
        <style jsx>{`
          .panel {
            border: 1px solid #dce0e0;
            background-color: #fff;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
          }

          .panelBody {
            position: relative;
            margin: 0;
            padding: 20px;
            border-top: 1px solid #dce0e0;
          }

          .panelBody:hover {
            background: #EFEFEF;
          }

          .list-layout {
            padding-left: 0;
            list-style: none;
          }

          .userImage {
            background: #D8D8D8 !important;
            border-radius: 50% !important;
            border: 2px solid #ffffff !important;
            overflow: hidden !important;
          }

          .messageUser {
            padding: 0px;
            margin: 0px;
            color: #3f4f5f;
            font-size: 16px;
            font-weight: 700;
            line-height: 27px;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .messageDate {
            color: #3f4f5f;
            flex-shrink: 0;
            font-size: 16px;
            line-height: 27px;
            text-transform: uppercase;
          }

          .avatarMessage {
            border-radius: 50%;
            padding: 10px;
          }

          .message {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 16px;
            color: #757575;
          }
        `}</style>
      </div>
    );
  }
}

export default defaultPage(Conversations);
