import React from 'react';
import PropTypes from 'prop-types';

import ServiceCard from './ServiceCard';

function ServiceList(props) {
  const { services } = props;
  return (
    <div className="ServiceCardList">
      <div>
        {services.map(item => (
            <div className="col-md-3" key={item.id}>
              <ServiceCard service={item} key={item.id} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

ServiceList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

ServiceList.defaultProps = {
  services: [],
};


export default ServiceList;
