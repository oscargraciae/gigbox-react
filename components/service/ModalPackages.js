import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

class ModalPackages extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar paquetes/precio <br /><span className="spanMessage">No se efectuará ningún cargo aún.</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.props.packages.map((item) => {
              return (
                <div className="rowPackages" key={item.id}>
                  <h4 className="titlePackage">{item.title}</h4>
                  <a className="btn btn-primary" href={`/app/checkout/package/${item.id}`}>Contratar</a>
                  <p>
                    <NumberFormat
                      value={item.price}
                      displayType={'text'}
                      decimalPrecision={2}
                      thousandSeparator={true} prefix={'$'}
                    /> MXN
                    { item.unit_type && <span> / {item.unit_type.singular_name} </span> }

                  </p>
                  <p className="descriptionPackage">{item.description}</p>
                  <hr className="space" />
                </div>
              );
            }) }
          </Modal.Body>
        </Modal>

        <style jsx>{`
          .rowPackage {
            padding: 10px;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,.25);
            border-left: 5px solid #25CB68;
            margin-bottom: 10px;
            display: flex;
          }

          .titlePackage {
            display: inline-block;
          }

          .space {
            margin: 10px 0px;
          }

          .descriptionPackage {
            color: #757575;
            font-size: 12px;
            margin-bottom: 0px;
          }

          .btn-primary {
            border-color: #ff1940 !important;
            background-color: #ff1940 !important;
            color: #fff;
            float: right;
          }

          .btn-primary:hover, .btn-primary:focus{
            background: #cc1433;
          }

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
            justify-content: left;
          }
        `}</style>
      </div>
    );
  }
}

ModalPackages.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

ModalPackages.defaultProps = {
  showModal: false,
  closeModal: null,
  packages: [],
};

export default ModalPackages;
