import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const DateLabel = ({date, pattern = 'DD/MM/YYYY'}) => {
  return date && <div>{moment(date).format(pattern)}</div>;
};

DateLabel.propTypes = {
  date: PropTypes.any,
  pattern: PropTypes.string,
};

export default DateLabel;
