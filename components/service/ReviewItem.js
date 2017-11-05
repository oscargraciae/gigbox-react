import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Rating from 'react-rating';

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
        <div className="review-header">
          <span>
            <a
              href={`/u/${evaluation.user.username}`}
              className="lbl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {evaluation.user.full_name}
            </a>  - <Rating
              initialRate={evaluation.ratings[0].value}
              readonly empty="fa fa-star-o fa-lg lbl-warning icon-star"
              full="fa fa-star fa-lg lbl-warning icon-star"
            /> </span>
        </div>
        <span className="lblDate">{moment(evaluation.created_at).locale("es").format('LL')}</span>
        <div className="review-body">
          <p>{evaluation.comment}</p>

        </div>
      </div>
      <style jsx>{`
        .review-header {
          margin-bottom: 2px;
        }

        .review-body {
          font-size: 10px !important;
        }

        .review-body > p {
          font-size: 14px !important;
          font-weight: normal;
        }

        .icon-star {
          font-size: 14px !important;
        }

        .lblDate {
          font-size: 12px;
          color: #757575;
        }
      `}</style>
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
