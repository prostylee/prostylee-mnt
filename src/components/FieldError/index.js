import React from 'react';
import PropTypes from 'prop-types';

const FieldError = ({formik, name}) => {
  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  return isFormFieldValid(name) && <small className="p-error mt-1">{formik.errors[name]}</small>;
}

FieldError.propTypes = {
  formik: PropTypes.any,
  name: PropTypes.string,
};

export default FieldError;
