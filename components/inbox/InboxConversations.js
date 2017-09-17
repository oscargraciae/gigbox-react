import React from 'react';
import timeAgo from '../../utils/time-ago';

function InboxConversations(props) {
  const { item } = props;
  //const userId = item.sender.id === props.currentUser.id ? item.recipient.id : item.sender.id;
  return (
    <div>
      <a href={`/messages?id=${item.id}`}>
        <div className="rowMessage">
          <figure className="avatarContainer">
            { item.sender.id === props.currentUser.id ?
              <img className="avatarMessage" src={item.recipient.avatar} alt={item.recipient.first_name} width="60" height="60" /> :
              <img className="avatarMessage" src={item.sender.avatar} alt={item.sender.first_name} width="60" height="60" />
            }

          </figure>
          <div className="messageBody">
            <div className="messageHeader">
              { item.sender.id === props.currentUser.id ?
                <h3 className="messageUser">{item.recipient.first_name}</h3> :
                <h3 className="messageUser">{item.sender.first_name}</h3>
              }
              <time className="messageDate">hace {timeAgo(new Date(item.inbox_message[0].created_at))}</time>
            </div>
            <div className="message">
              <span>{item.inbox_message[0].message}</span>
            </div>
          </div>
        </div>
      </a>
      <style jsx>{`
        .avatarContainer {
          display: inline-block;
        }

        .rowMessage {
          padding: 10px;
          -webkit-box-align: center;
          -o-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-bottom: 1px solid #dcdcdc;
          color: #000;
          display: -webkit-box;
          display: -ms-flexbox;
          display: box;
          display: flex;
          flex-shrink: 0;
          text-decoration: none;
          -webkit-transition: background .2s;
          transition: background .2s;
        }

        .rowMessage:hover {
          background: #ebf4fa;
          cursor: pointer;
        }

        .messageHeader {
          display: -webkit-box;
          display: -ms-flexbox;
          display: box;
          display: flex;
          -webkit-box-lines: single;
          -moz-box-lines: single;
          -o-box-lines: single;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -webkit-box-pack: justify;
          -o-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          width: 100%;
        }

        .messageBody {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
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
          color: gray;
          flex-shrink: 0;
          font-size: 12px;
          line-height: 27px;
          text-transform: uppercase;
          padding-left: .5em;
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
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default InboxConversations;
