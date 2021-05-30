import React, {Suspense, useEffect} from 'react';
import PreLoaderWidget from '../widgets/PreLoaderWidget';
import GlobalError from '../../components/GlobalMessage';
import Loading from '../../components/Loading';

const AuthLayout = (props) => {

  useEffect(() => {
    document.body.classList.add('auth-layout');
    return () => document.body.classList.remove('auth-layout');
  }, []);

  const children = props.children || null;
  return (
    <div className="app">
      <Suspense fallback={<PreLoaderWidget />}>{children}</Suspense>
      <GlobalError />
      <Loading />
    </div>
  );
}

export default AuthLayout;
