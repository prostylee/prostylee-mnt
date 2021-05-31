import React, {Suspense, useEffect, useState} from 'react';
import * as layoutConstants from '../constants/layout';

const AuthLayout = React.lazy(() => import('./auth/AuthLayout'));
const DashboardLayout = React.lazy(() => import('./dashboard/DashboardLayout'));

const loading = () => <div />;

const withLayout = (WrappedComponent, layoutType, pageTitle) => {
  const LayoutComponentWrapper = (props) => {
    const [Layout, setLayout] = useState(DashboardLayout);
    const layoutName = layoutType || layoutConstants.LAYOUT_DASHBOARD;

    useEffect(() => {
      if (pageTitle) {
        document.title = `${pageTitle} :: Prostylee Management System`;
      }
      if (layoutType === layoutConstants.LAYOUT_AUTHENTICATION) {
        setLayout(AuthLayout);
      }
    }, []);

    return (
      <Suspense fallback={loading()}>
        <Layout layout={layoutName} {...props}>
          <WrappedComponent {...props} />
        </Layout>
      </Suspense>
    );
  }
  return LayoutComponentWrapper;
};

export default withLayout;
