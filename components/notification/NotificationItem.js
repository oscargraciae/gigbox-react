import React from 'react';
import PropTypes from 'prop-types';
import timeAgo from '../../utils/time-ago';

function NotificationItem(props) {
  return (
    <div>
      <a target="_parent" href={`/app/request/${props.request_id}`}>
        <div className="notification">
          <div className="notification-image col-md-2">
            <img src={props.user_avatar} alt="" height="55" width="55" className="img-circle" />
          </div>
          <div className="col-md-10">
            <span><strong>{props.user_name}</strong> {props.type_notification} <strong>{props.service_name}</strong></span>
            <br />
            <span className="timeAgo">hace {timeAgo(new Date(props.created_at))}</span>
          </div>
        </div>
      </a>
      <style jsx>{`
        .timeAgo {
          color: #757575;
          padding: 5px 0x;
        }
      `}</style>
    </div>
  );
}

NotificationItem.propTypes = {
  request_id: PropTypes.number,
  user_name: PropTypes.string,
  user_avatar: PropTypes.string,
  type_notification: PropTypes.string,
  service_name: PropTypes.string,
  created_at: PropTypes.string,
};

NotificationItem.defaultProps = {
  request_id: 0,
  user_name: '',
  user_avatar: '',
  type_notification: '',
  service_name: '',
  created_at: '',
};

export default NotificationItem;
