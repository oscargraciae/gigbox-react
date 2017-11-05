import React from 'react';
import PropTypes from 'prop-types';

function TextAreaGroup({ name, value, label, error, type, onChange, focus, rows}) {
  return (
    <div className="controls controls-small">
      <textarea
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={label}
        className="input control-input"
        autoFocus={focus}
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
            padding: 8px 10px;
            width: 100%;
            font-size: 16px;
        }

        .control-input{
          border: 1px solid #aaa;
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
          padding: 5px;
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
  focus: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextAreaGroup.defaultProps = {
  type: 'text',
  focus: false,
};

export default TextAreaGroup;
