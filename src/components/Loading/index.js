import React from 'react';
import {connect} from 'react-redux';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Dialog} from 'primereact/dialog';

const Loading = ({isLoading}) => {

  return (
    <Dialog visible={isLoading} className={'loading-wrapper'} onHide={() => {}}>
      <ProgressSpinner style={{width: '70px', height: '70px'}} strokeWidth="3" />
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  const {isLoading} = state.shared;
  return {isLoading};
};

export default connect(mapStateToProps)(Loading);
