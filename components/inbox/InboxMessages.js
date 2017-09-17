import React from 'react';

import { firebaseDatabase } from '../../config/firebase';
import api from '../../api';
import timeAgo from '../../utils/time-ago';


class InboxMessages extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      showModal: false,
      message: '',
      messages: [],
      conversationId: 0,
      conversation: {},
      currentUser: {},
      loading: false,
    };

  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ currentUser: user });
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <div className="convesationBody">
          {Object.keys(messages).map((key) => {
          {/*{messages.map((item, key) => {*/}
            const item = messages[key];
            if (this.state.currentUser.id !== item.sender_user) {
              return (
                <div className="rowMessage" key={item.id}>
                  <img src={item.sender.avatar_thumb} className="avatarMessage" alt={item.sender.username} />
                  <div className="textMessage">
                    <span>{item.message}</span>
                  </div>
                  <div className="textDate">
                    <span>hace {timeAgo(new Date(item.created_at))}</span>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="rowMessage rowRight" key={item.id}>
                  <img src={item.sender.avatar_thumb} className="avatarMessageRight" alt={item.sender.username} />
                  <div className="textMessageRight">
                    <span>{item.message}</span>
                  </div>
                  <div className="textDate">
                    <span>hace {timeAgo(new Date(item.created_at))}</span>
                  </div>
                </div>
              )
            }
          }).reverse()

          }
        </div>
        <style jsx>{`
          .convesationBody {
            overflow-y: auto;
            height: 400px;
            padding: 10px;
            border-left: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
          }
          .conversationTitle {
            background: #FFF;
          }

          .conversationTitle > h3 {
            color: #333;
            font-size: 18px;
            margin: 0px;
            padding: 10px 20px;
            border-bottom: 1px solid #dcdcdc;
          }

          .containerMessages {
            overflow-y: auto;
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

export default InboxMessages;
