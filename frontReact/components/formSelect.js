import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({id, data, onChange, value, label, valueAttr, nameAttr}) => {
  return (
    <div className="form-group">
      {label && <label className="col-form-label" htmlFor={label}>{label}</label>}
      <select id={id} name={id} onChange={onChange} value={value}>
        <option value={null}></option>
        {data.map((item, i) => {
          return <option key={item.id ? item.id : i} value={valueAttr !== '' ? item[valueAttr] : item}>{nameAttr !== '' ? item[nameAttr] : item}</option>
        })}
      </select>
    </div>
  )
};

FormSelect.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  valueAttr: PropTypes.string,
  nameAttr: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string
};

export default FormSelect;
