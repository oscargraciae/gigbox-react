import React from 'react';
import PropTypes from 'prop-types';

import ReviewItem from './ReviewItem';

function ReviewsList(props) {
  const { evaluations } = props;
  return (
    <div>
      <div className="panelContainer">
        <h3>Evaluaciones</h3>
        {evaluations
          .map(item => (
            <div key={item.id} className="review-row row">
              <ReviewItem evaluation={item} />
            </div>
          ))
        }
      </div>
      <style jsx>{`
        h3{
          font-size: 18px;
          margin-bottom: 24px;
        }
        .review-row {
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}

ReviewsList.propTypes = {
  evaluations: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

ReviewsList.defaultProps = {
  evaluations: [],
};

export default ReviewsList;
