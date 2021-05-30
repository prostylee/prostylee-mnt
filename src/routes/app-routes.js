import React, {useEffect, useState} from 'react';
import * as layoutConstants from '../constants/layout';
import {getLoggedInUser, isUserAuthenticated} from '../utilities/authUtils';
import {Redirect, Route} from 'react-router-dom';
import withLayout from '../layouts';
import {mntRoutes} from '../modules/mnt/routes/mntRoutes';
import {Error403} from '../pages/errors';
import {containAny} from '../utilities/arrayUtils';

const SignIn = React.lazy(() => import('../pages/auth/sign-in'));
const SignOut = React.lazy(() => import('../pages/auth/sign-out'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));

// handle auth and authorization
const PrivateRoute = ({component: Component, roles, ...rest}) => {
  const [userRoles, setUserRoles] = useState();
  useEffect( () => {
    getLoggedInUser().then(user => {
      setUserRoles(user?.roles || []);
    });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isUserAuthenticated()) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{pathname: '/auth/sign-in', state: {from: props.location}}}/>;
        }
        // check if route is restricted by role
        if (roles && !containAny(userRoles, roles)) {
          // role not authorised so redirect to home page
          const Error403Component = withLayout((props) => {
            return <Error403 {...props} />;
          });
          return <Error403Component {...props} />;
        }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
}

const defaultRoutes = [
  {
    path: '/',
    component: () => <Redirect to="/"/>
  },
  {
    path: '/auth/sign-in',
    label: 'Sign In',
    component: SignIn,
    layoutType: layoutConstants.LAYOUT_AUTHENTICATION,
    route: Route
  },
  {
    path: '/auth/sign-out',
    label: 'Sign Out',
    component: SignOut,
    layoutType: layoutConstants.LAYOUT_AUTHENTICATION,
    route: Route
  }
];

const appRoutes = [
  {
    path: '/',
    label: 'Dashboard',
    icon: 'pi pi-home',
    badge: {
      variant: 'success',
      text: 'new'
    },
    component: Dashboard
  },
  ...mntRoutes,
];

export {defaultRoutes, appRoutes, PrivateRoute};
