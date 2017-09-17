import React from 'react';
import Slider from 'react-slick';

import ServiceCard from './ServiceCard';

function SliderServices(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    }],
  };

  return (
    <div className="row">
      <Slider {...settings}>
        {props.services.map(item => (
          <div className="col-md-3" key={item.id}>
            <ServiceCard service={item} />
          </div>
          ))
        }
      </Slider>
    </div>
  );
}

export default SliderServices;
