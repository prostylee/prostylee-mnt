import React from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {authActions} from '../../redux/reducers';
import {confirmDialog} from 'primereact/components/confirmdialog/ConfirmDialog';
import {SIGN_IN} from '../../modules/shared/constants/auth-menu-item';
import {useTranslation} from 'react-i18next';

const SignOut = (props) => {

  const [t] = useTranslation();
  const history = useHistory();

  const confirm = () => {
    confirmDialog({
      message: t('label.confirmContinue'),
      header: t('button.confirmation'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: t('button.ok'),
      rejectLabel: t('button.cancel'),
      accept: () => acceptFunc(),
      reject: () => rejectFunc()
    });
  }

  const acceptFunc = () => {
    props.signOut({
      onSuccess: () => {
        history.push(SIGN_IN.path);
      }
    });
  };

  const rejectFunc = () => {
    // Do nothing
  };

  return (
    <button onClick={confirm} type="button" className="p-link">
      <i className="pi pi-fw pi-power-off"/>
      <span>Logout</span>
    </button>
  );
}

const mapStateToProps = (state) => {
  const {user} = state.auth;
  return {user};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (data) => {
      dispatch(authActions.signOut(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
