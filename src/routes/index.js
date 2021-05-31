import React from 'react';
import md5 from 'md5';

import { getLoggedInUser } from '../utilities/authUtils';
import { defaultRoutes, appRoutes, PrivateRoute } from './app-routes';
import {containAny} from '../utilities/arrayUtils';

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];
  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);
    if (item.items) {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.items)];
    }
  });
  return flatRoutes;
};

const generateIdForRoutes = (routes) => {
  routes = routes || [];
  routes.forEach((route) => {
    route.id = route.path ? md5(route.path) : Math.floor(Math.random() * 1000000);
    if (route.items) {
      generateIdForRoutes(route.items);
    }
  });
};

/**
 * Only show the menus user can access.
 *
 * @param routes
 * @param roles
 * @returns {[]}
 */
const filterAuthenticatedRoutes = async (routes, roles) => {
  console.log('filterAuthenticatedRoutes routes=' + JSON.stringify(routes))
  if (!routes || !routes.length) {
    return [];
  }

  let userRoles = roles;
  if (!userRoles) {
    const loggedInUser = await getLoggedInUser();
    userRoles = loggedInUser?.roles || [];
  }

  const filteredRoutes = [];
  for (const route of routes) {
    if (route.items) {
      route.items = await filterAuthenticatedRoutes(route.items, userRoles);
    }
    if ((!route.roles || route.roles.length === 0 || containAny(userRoles, route.roles)) && !route.hidden) {
      filteredRoutes.push(route);
    }
  }
  return filteredRoutes;
};

const allRoutes = [...defaultRoutes, ...appRoutes];
generateIdForRoutes(allRoutes);

const allFlattenRoutes = flattenRoutes(allRoutes);
export { filterAuthenticatedRoutes, appRoutes, allFlattenRoutes, PrivateRoute };
