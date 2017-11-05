// import libraries
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

// import components
import ServiceRatingBox from './ServiceRatingBox';
import ReviewsList from './ReviewsList';
import Breadcrumb from './Breadcrumb';
import CommentsList from './CommentsList';

function InfoService(props) {
  const { service } = props;
  return (
    <div itemScope itemType="http://schema.org/Service">
    <meta itemProp="serviceType" content={service.sub_category.name} />
    <meta itemProp="image" content={service.cover} />
      <div className="row">
        <div className="panelContainer servicePanelInfo">
          {/* BreadcrumbList */}
          <Breadcrumb service={service} />
          <div className="panel-container-service row">
            <div className="col-md-3 col-xs-12">
              <div className="User-avatar">
                <img
                  src={service.cover}
                  alt={service.name}
                  height="160" width="160"
                  className="img-rounded"
                />
              </div>
            </div>
            <div className="col-md-9 col-xs-12">
              <div className="User-data service-data-resp">
                <h1 className="service-data-title" itemProp="name">{service.name}</h1>
                <h2 className="lblAddress">{service.user.address}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-xs-12 service-data-resp">
              <h3>Información del servicio</h3>
              <div className="text-service-description" itemProp="description">{service.description}</div>
              <hr />
              <h3>Requisitos e instrucciones</h3>
              <div className="text-service-description" itemProp="description">{service.description}</div>
              <hr />
              <h3>Precios y paquetes</h3>
                { service.packages.map((item) => {
                  return (
                    <div className="descriptionPackage" key={item.id} >
                      <div className="packageTitle"><i className="fa fa-check" aria-hidden="true" /> {item.title} </div>
                      <div className="packagePrice">

                        <NumberFormat
                          value={item.price}
                          displayType={'text'}
                          decimalPrecision={2}
                          thousandSeparator={true} prefix={'$'}
                        /> MXN
                        { item.unit_type && <span> / {item.unit_type.singular_name} </span> }
                      </div>
                      <div className="packageResume">{item.description}</div>
                    </div>
                  )
                })}
              <hr />
              {/*<ServiceRatingBox rating={service.service_ratings} />*/}
              <CommentsList service={service} />
              <hr />
              { props.evaluations.length > 0 && <ReviewsList evaluations={props.evaluations} /> }
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
          hr {
            border: 0;
            border-top: 1px solid #dce0e0;
          }
          .container-box-rating {
            display: flex;
          }

          .product-rating-wrapper {
            border-radius: 10px;
            padding: .3em .7em;
            margin: 0 0 1.2em;
            margin-top: 10px;
            background: linear-gradient(340deg,#ffbb58,#f5c684);
            color: #fff;
            display: flex;
            align-items: center;
          }

          .fa-star {
            margin-left: 5px;
          }

          .service-data-title{
            font-size: 36px;
          }

          .text-service-description {
            font-size: 14px;
            line-height: 24px;
            color: #757575;
          }

          .service-data-resp h3{
            font-size: 18px;
          }

          .servicePanelInfo {
            padding-right: 20px;
          }

          .descriptionPackage {
            margin: 10px 0px;
          }
          .packageTitle {
            font-size: 14px;
            font-weight: 500;
            padding: 10px 0px;
          }

          .packageTitle i {
            color: #ffbb58;
          }

          .packagePrice{
            color: #757575;
            padding-left: 23px;
            font-size: 14px;
          }

          .packageResume {
            color: #757575;
            font-size: 14px;
            line-height: 24px;
            padding-left: 23px;
          }

          .lblAddress {
            font-size: 16px;
            margin: 0px;
            font-weight: normal;
            color: #757575;
          }

          @media (max-width: 600px) {
            .servicePanelInfo {
              padding-right: 20px;
              padding-left: 20px;
            }
          }


      `}</style>
    </div>
  );
}

InfoService.propTypes = {
  service: PropTypes.shape({
    cover: PropTypes.string,
    name: PropTypes.string,
  }),
  evaluations: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

InfoService.defaultProps = {
  service: {},
  evaluations: [],
};

export default InfoService;
