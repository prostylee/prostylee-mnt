import React from 'react';
import {useDispatch} from 'react-redux';
import {userActions} from '../../redux/reducers';

export const EmptyPage = () => {

  const dispatch = useDispatch();
  const handle = () => {
    dispatch(
      userActions.signIn({
        email: 'gpcoder@gmail.com',
        password: 'abc',
        onSuccess: () => console.log('Login success!!!!'),
        onFail: (error) => console.log('Login failed!!!!'),
      }),
    );
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
