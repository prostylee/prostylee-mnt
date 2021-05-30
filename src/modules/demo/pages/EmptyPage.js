import React from 'react';
import {useDispatch} from 'react-redux';
import {authActions} from '../../../redux/reducers';
import * as profileService from '../../../services/users/profile-service';
import AppLogger from '../../../helpers/app-logger';

export const EmptyPage = () => {

  const dispatch = useDispatch();
  const handleSignIn = () => {
    AppLogger.debug('handle sign-in');
    dispatch(
      authActions.signIn({
        email: 'ptgiang56it@gmail.com',
        password: '12345678',
        onSuccess: handleLoginSuccess,
        onFail: (error) => console.error('Login failed!!!!', error),
      }),
    );
  };

  const handleSignOut = () => {
    AppLogger.debug('handle sign-out');
    dispatch(
      authActions.signOut(),
    );
  };

  const handleLoginSuccess = () => {
    console.log('handleLoginSuccess');
    const profile = profileService.getProfile();
    console.log('Profile=' + JSON.stringify(profile));
  };

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <h5>Empty Page</h5>
          <p>Use this page to start from scratch and place your custom content.</p>
          <button onClick={handleSignIn}>Sign-in</button>
          <button onClick={handleSignOut}>Sign-out</button>
        </div>
      </div>
    </div>
  );
}
