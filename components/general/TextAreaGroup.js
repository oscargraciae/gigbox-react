import React from 'react';
import PropTypes from 'prop-types';

function TextAreaGroup({ name, value, label, error, onChange, rows}) {
  return (
    <div className="controls controls-small">
      <textarea
        value={value}
        onChange={onChange}
        name={name}
        placeholder={label}
        className="input control-input"
        rows={rows}
      ></textarea>
    { error && <span className="lbl lbl-danger">{error}</span> }

      <style jsx>{`
        .input {
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            background-color: #fff;
            border-radius: 2px;
            border: 1px solid #c4c4c4;
            color: #565a5c;
            padding: 10px 10px;
            width: 100%;
            font-size: 14px;
        }

        .input:focus {
          outline: 0px;
          border: 1px solid #333 !important;
        }

        .control-input{
          border: 1px solid #ccc;
        }

        .input-root{
          margin-bottom: 18px;
          vertical-align: top;
        }

        .input-label{
          color: #2e343b;
          float: left;
          font-weight: bold;
          margin-bottom: 7px;
        }

        .input-margin-left{
          margin-left: 12px;
        }

        .input-form{
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 3px;
          box-sizing: border-box;
          color: #2e343b;
          display: block;
          outline: none;
          padding: 10px 12px 11px;
          -webkit-transition: .2s;
          transition: .2s;
          width: 100%;
          height: 42px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .controls {
          padding: 10px 0px;
          position: relative;
        }

        .controls-small {
          padding: 0px;
        }
      `}</style>
    </div>
  );
}

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
};

TextAreaGroup.defaultProps = {
  type: 'text',
  focus: false,
  rows: 4,
};

export default TextAreaGroup;
