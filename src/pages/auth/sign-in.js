import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {authActions, sharedActions} from '../../redux/reducers';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import PreLoaderWidget from '../../layouts/widgets/PreLoaderWidget';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import FieldError from '../../components/FieldError';
import {getI18nMessage} from '../../helpers/i18n';
import {useTranslation} from 'react-i18next';

const SignIn = (props) => {
  const [t, i18n] = useTranslation();
  const {user, loading, values, isSubmitting, handleChange, handleBlur, handleSubmit} = props;

  return (
    <>
      {loading && <PreLoaderWidget/>}
      {!user ? (
        <div className="login-page">
          <div className="login-wrapper">
            <div className="login-form">
              <div className="login-form-header mb-5">
                <div className="logo"/>
                <p>PROSTYLEE MANAGEMENT SYSTEM</p>
              </div>

              <div className="p-grid">
                <div className="p-col-12 p-md-6">
                  <div className="card p-fluid">
                    <h5>Login</h5>
                    <div className="p-field">
                      <label htmlFor="email">{t('user:username')}</label>
                      <InputText id="email" name="email" autoFocus
                                 type="text"
                                 aria-label="Email"
                                 aria-describedby="email"
                                 value={values.email}
                                 onChange={handleChange}
                                 onBlur={handleBlur}/>
                      <FieldError formik={props} name="email"/>
                    </div>
                    <div className="p-field">
                      <label htmlFor="password">{t('user:password')}</label>
                      <Password id="password" name="password" autoComplete="off"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                      <FieldError formik={props} name="password"/>
                    </div>
                    <div className="p-field">
                      <Button className="btn-block" onClick={handleSubmit} disabled={isSubmitting}>{t('button.signIn')}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/"/>
      )}
    </>
  );
}

const validationSchema = Yup.object({
  email: Yup
    .string(getI18nMessage('validation.hint', {field: getI18nMessage('user:username')}))
    .email(getI18nMessage('validation.invalid', {field: getI18nMessage('user:username')}))
    .required(getI18nMessage('validation.required', {field: getI18nMessage('user:username')})),
  password: Yup
    .string(getI18nMessage('validation.hint', {field: getI18nMessage('user:password')}))
    .min(8, getI18nMessage('validation.min', {field: getI18nMessage('user:password'), length: 8}))
    .required(getI18nMessage('validation.required', {field: getI18nMessage('user:password')})),
});

const signInFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, {props, setSubmitting}) => {
    setSubmitting(true);
    props.toggleLoading(true);
    props.signIn({
      email: values.email,
      password: values.password,
      onSuccess: () => {
        props.toggleLoading(false);
      },
      onFail: (errorCode) => {
        setSubmitting(false);
        props.showGlobalError({
          detail: getI18nMessage('errorCode.' + errorCode, getI18nMessage('errorCode.Unknown'))
        });
        props.toggleLoading(false);
      }
    });
  }
})(SignIn);

const mapStateToProps = (state) => {
  const {user, loading, errorCode} = state.auth;
  const {globalError} = state.shared;
  return {user, loading, errorCode, globalError};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (data) => {
      dispatch(authActions.signIn(data));
    },
    showGlobalError: (data) => {
      dispatch(sharedActions.globalMessage(data));
    },
    toggleLoading: (isLoading) => {
      dispatch(sharedActions.toggleLoading(isLoading));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(signInFormik);
