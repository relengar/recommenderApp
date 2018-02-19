import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({type, value, label, onChange, id}) => {
  return (
    <div className="6u 12u$(xsmall)">
      <label htmlFor={label}>{label}</label>
      <input  id={id} type={type} name={id} value={value} onChange={onChange} />
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormInput;
