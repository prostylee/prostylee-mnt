import axios from 'axios'

export class CustomerService {
    getCustomersMedium() {
        return axios.get('data/customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('data/customers-large.json')
                .then(res => res.data.data);
    }

}
