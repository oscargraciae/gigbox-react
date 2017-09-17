import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';

function ReviewItem(props) {
  const { evaluation } = props;
  // moment.locale('es');
  return (
    <div>
      <div className="col-md-1 col-xs-2">
        <img
          src={evaluation.user.avatar}
          alt={evaluation.user.first_name}
          width="45" height="45"
          className="img-circle"
        />
      </div>
      <div className="col-md-8 col-xs-10">
        <div className="review-footer">
          <span>
            <a
              className="lbl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {evaluation.user.full_name}
            </a>  - </span>
        </div>
        <div className="review-body">
          <p>{evaluation.comment}</p>
        </div>
      </div>
    </div>
  );
}

ReviewItem.propTypes = {
  evaluation: PropTypes.shape({
    comment: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

ReviewItem.defaultProps = {
  evaluation: {},
};

export default ReviewItem;
