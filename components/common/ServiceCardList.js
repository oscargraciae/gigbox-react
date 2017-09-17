import React from 'react';
import PropTypes from 'prop-types';

import ServiceCard from './ServiceCard';

function ServiceCardList(props) {
  const { services } = props;
  return (
    <div className="ServiceCardList">
      {services.slice(0, 4).map(item => (
          <ServiceCard service={item} key={item.id} />
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

ServiceCardList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

ServiceCardList.defaultProps = {
  services: [],
};


export default ServiceCardList;
