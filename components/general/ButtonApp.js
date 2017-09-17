import React from 'react';
import PropTypes from 'prop-types';

function ButtonApp(props) {
  return (
    <div className="containerAppButon">
      <button className={props.buttonStyle} onClick={props.click} disabled={props.disabled || props.loading}>
        { props.loading && <span>Cargando...</span> }
        {!props.loading && props.text }
      </button>

      <style jsx>{`
        .containerAppButon {
          display: inline-block;
          padding: 5px;
        }
        .btn{
          display: inline-block;
          margin-bottom: 0;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          border: 1px solid;
          text-align: center;
          vertical-align: middle;
          font-weight: bold;
          line-height: 1.43;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          white-space: nowrap;
          cursor: pointer;
        }

        .btn[disabled]{
          opacity: .3;
          cursor: not-allowed;
        }

        .btn-large {
          padding: 10px 32px;
          font-size: 16px;
        }

        .btn-block {
          display: block;
          white-space: normal;
          width: 100%;
        }

        .btn-primary {
          border-color: #ff1940 !important;
          background-color: #ff1940 !important;
          color: #fff;
        }

        .btn-primary:hover, .btn-primary:focus{
          background: #cc1433;
        }

        .btn-blue{
          border-color: #3498db;
          background-color: #3498db;
          color: #fff;
        }

        .btn-blue:hover, .btn-blue:focus{
          background: #2980b9;
        }

        .btn-default{
          background: #fff;
          border-color: #9a9a9a;
          color: #000;
        }

        .btn-default:hover{
          background: #e8e8e8;
        }
      `}</style>
    </div>
  );
}

ButtonApp.propTypes = {
  text: PropTypes.string,
  buttonStyle: PropTypes.string,
  loading: PropTypes.bool,
  click: PropTypes.func,
  disabled: PropTypes.bool,
};

ButtonApp.defaultProps = {
  text: 'default',
  buttonStyle: 'default',
  loading: false,
  disabled: false,
  click: null,
};

export default ButtonApp;
