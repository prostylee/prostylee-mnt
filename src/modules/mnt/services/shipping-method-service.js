import {SHIPPING_METHOD_URL} from '../../../constants/apiUrls';
import CrudService from '../../../services/crud-service';

class ShippingMethodService extends CrudService {

  constructor() {
    super(SHIPPING_METHOD_URL);
  }
}

export default ShippingMethodService;
