import React from 'react';
import PropTypes from 'prop-types';

import ServiceCardSmall from './ServiceCardSmall';

function ServiceCardSmallList(props) {
  const { services } = props;
  return (
    <div className="ServiceCardList">
      {services.slice(0, 4).map(item => (
          <ServiceCardSmall service={item} key={item.id} />
        ))
      }
      <style>{`
        .ServiceCardList {
          display: flex;
        }
      `}</style>
    </div>
  );
}

ServiceCardSmallList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

ServiceCardSmallList.defaultProps = {
  services: [],
};


export default ServiceCardSmallList;
