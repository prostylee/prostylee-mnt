import React, {useEffect, useRef} from 'react';
import {Toast} from 'primereact/toast';
import {connect} from 'react-redux';
import {getI18nMessage} from '../../helpers/i18n';
import {ERROR} from '../../constants/severity';

const GlobalMessage = ({globalMessage}) => {
  const toast = useRef(null);

  useEffect(() => {
    if (globalMessage && toast.current) {
      toast.current.show({
        severity: ERROR,
        summary: getI18nMessage('globalMessage.error'),
        detail: '',
        life: 3000,
        ...globalMessage
      });
    }
  }, [globalMessage]);

  return <Toast ref={toast} position="top-right" />;
}

const mapStateToProps = (state) => {
  const {globalMessage} = state.shared;
  return {globalMessage};
};

export default connect(mapStateToProps)(GlobalMessage);
