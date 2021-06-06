import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const DateTimeLabel = ({date, pattern = 'DD/MM/YYYY HH:mm'}) => {
  return date && <div>{moment(date).format(pattern)}</div>;
};

DateTimeLabel.propTypes = {
  date: PropTypes.any,
  pattern: PropTypes.string,
};

export default DateTimeLabel;
