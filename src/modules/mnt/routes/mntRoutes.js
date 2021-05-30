import React from 'react';
import * as menuItem from '../constants/menu-item';
import {ROLES} from '../../../constants/roles';

const ShippingMethod = React.lazy(() => import('../pages/shipping-method'));
const ShippingProvider = React.lazy(() => import('../pages/shipping-provider'));

const mntRoutes = [
  {
    ...menuItem.MASTER_DATA,
    items: [
      {
        ...menuItem.SHIPPING_METHOD,
        component: ShippingMethod,
        roles: [ROLES.SYSTEM_ADMIN.code, ROLES.SELLER.code], // TODO only ADMIN
      },
      {
        ...menuItem.SHIPPING_PROVIDER,
        component: ShippingProvider,
        roles: [ROLES.SYSTEM_ADMIN.code, ROLES.BUYER.code],
      },
    ]
  },
];

export {mntRoutes};
