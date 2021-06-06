import DebounceInputText from '../DebounceInputText';
import React from 'react';
import PropTypes from 'prop-types';

const PsTableHeader = ({tableHeader, searchHandler}) => {
  return (
    <div className="table-header">
      <h5 className="p-m-0">{tableHeader}</h5>
      <span className="p-input-icon-left">
          <i className="pi pi-search"/>
          <DebounceInputText changeHandler={searchHandler} />
      </span>
    </div>
  )
};

PsTableHeader.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  tableHeader: PropTypes.string.isRequired,
};

export default PsTableHeader;
