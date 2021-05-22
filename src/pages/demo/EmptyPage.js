import React from 'react';
import {useDispatch} from 'react-redux';
import {userActions} from '../../redux/reducers';
import * as profileService from '../../service/users/profile-service';

export const EmptyPage = () => {

  const dispatch = useDispatch();
  const handle = () => {
    dispatch(
      userActions.signIn({
        email: 'ptgiang56it@gmail.com',
        password: '12345678',
        onSuccess: handleLoginSuccess,
        onFail: (error) => console.error('Login failed!!!!', error),
      }),
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
          <button onClick={handle} value={'TEST REDUX'}>TEST</button>
        </div>
      </div>
    </div>
  );
}
