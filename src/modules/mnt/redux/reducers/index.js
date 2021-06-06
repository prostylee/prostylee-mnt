import shippingMethod, {actions as shippingMethodActions, types as shippingMethodTypes,} from './shipping-method';

const mntReducer = {
  shippingMethod,
};

export {shippingMethodActions, shippingMethodTypes};

export default mntReducer;
