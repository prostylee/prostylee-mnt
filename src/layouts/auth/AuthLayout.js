import React, {Suspense, useEffect} from 'react';
import PreLoaderWidget from '../widgets/PreLoaderWidget';
import GlobalError from '../../components/GlobalMessage';
import Loading from '../../components/GlobalLoading';

const AuthLayout = (props) => {

  useEffect(() => {
    document.body.classList.add('auth-layout');
    return () => document.body.classList.remove('auth-layout');
  }, []);

  const children = props.children || null;
  return (
    <div className="p-grid" style={{minHeight: '100vh', padding: 0, marginTop: 0}}>
      <div className="p-col-12" style={{padding: 0}}>
        <Suspense fallback={<PreLoaderWidget/>}>{children}</Suspense>
        <GlobalError/>
        <Loading/>
      </div>
    </div>
  );
}

export default AuthLayout;
