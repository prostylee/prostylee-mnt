import React from 'react';
import {connect} from 'react-redux';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Dialog} from 'primereact/dialog';

const GlobalLoading = ({isLoading}) => {

  return (
    <Dialog visible={isLoading} className={'loading-wrapper'} onHide={() => {}}>
      <ProgressSpinner style={{width: '70px', height: '70px'}} strokeWidth="3" />
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  const {showGlobalLoading} = state.shared;
  return {isLoading: showGlobalLoading};
};

export default connect(mapStateToProps)(GlobalLoading);
