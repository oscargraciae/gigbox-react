import React from 'react';
import PropTypes from 'prop-types';
import timeAgo from '../../utils/time-ago';

function InboxItem(props) {
  const item = props;
  const user = item.sender.id === props.currentUser.id ? item.recipient : item.sender;
  return (
    <div>
      <a target="_parent" href={`/conversation/${user.username}`}>
        <div className="notification">
          <div className="notification-image col-md-2">
            <img src={user.avatar} alt="" height="55" width="55" className="img-circle" />
          </div>
          <div className="col-md-10">
            <span><strong>{user.first_name}</strong></span>
            <br />
            <div className="message">
              <span>{props.inbox_message.length && props.inbox_message[0].message}</span>
            </div>
            <br />
            <span className="timeAgo">hace {timeAgo(new Date(props.updated_at))}</span>
          </div>
        </div>
      </a>
      <style jsx>{`
        .timeAgo {
          color: #757575;
          padding: 5px 0x;
        }

        .message {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          font-size: 14px;
        }
        .notRead {
          background: red;
        }
      `}</style>
    </div>
  );
}

InboxItem.propTypes = {
  request_id: PropTypes.number,
  user_name: PropTypes.string,
  user_avatar: PropTypes.string,
  type_notification: PropTypes.string,
  service_name: PropTypes.string,
  created_at: PropTypes.string,
};

InboxItem.defaultProps = {
  request_id: 0,
  user_name: '',
  user_avatar: '',
  type_notification: '',
  service_name: '',
  created_at: '',
  inbox_message: [],
};

export default InboxItem;
