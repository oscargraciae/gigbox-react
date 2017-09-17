import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import ButtonApp from '../general/BlockButton';
import ModalPackages from '../service/ModalPackages';

class ServiceCheckout extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { service } = this.props;
    return (
      <div >
        <div className="UserService panelContainer" itemProp="offers" itemScope itemType="http://schema.org/Offer">
          <meta content="MXN" itemProp="priceCurrency" />
          <meta content={service.packages[0].price} itemProp="price" />
          <div>
            <div>
              <span className="service-detail-price">
                <small>DESDE </small>
                <NumberFormat
                  value={service.packages[0].price}
                  displayType={'text'}
                  thousandSeparator={true} prefix={'$'}
                /> MXN
              </span>
            </div>
            <ButtonApp
              text="Contratar servicio"
              loading={false}
              click={this.openModal}
              buttonStyle="btn btn-default btn-lg btn-block"
            />
            <span className="spanMessage">Paga tu servicio por medio gigbox para que disfrutes de nuestra garantía al cliente y nuestra plataforma de pagos segura.</span>
          </div>

        </div>

        <ModalPackages showModal={this.state.showModal} closeModal={this.closeModal} packages={service.packages} />

        <style jsx>{`
          .spanMessage{
            font-weight: normal !important;
            color: #767676 !important;
            font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
            margin: 0px !important;
            word-wrap: break-word !important;
            font-size: 12px !important;
            line-height: 16px !important;
            letter-spacing: 0.4px !important;
            padding-top: 10px !important;
            padding-bottom: 0px !important;
            display: flex;
            flex: 1;
            justify-content: center;
          }

          .service-detail-price {
            font-size: 16px;
            font-weight: bold;
            padding: 10px;
            padding: 6px;
          }
        `}</style>
      </div>
    );
  }
}

ServiceCheckout.propTypes = {
  service: PropTypes.shape({}),
};

ServiceCheckout.defaultProps = {
  service: {},
};

export default ServiceCheckout;
