import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Error403 = () => {

  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => document.body.classList.remove('authentication-bg');
  }, []);

  return (
    <div className="p-d-flex">
      <div className="p-grid">
        <div className="p-col">
          <div className="text-center">
            <div>
              <img src="/images/not-found.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col p-col-align-center">
          <h3 className="mt-3">Permission denied</h3>
          <p className="text-muted mb-5">You don't have the permission to access this page</p>
          <Link to="/" className="btn btn-lg btn-primary mt-4">
            Take me back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error403;
