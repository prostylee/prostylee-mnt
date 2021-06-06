import {apiService} from './index';

class CrudService {

  resourcePath = '';

  constructor(resourcePath) {
    this.resourcePath += resourcePath;
  }

  findAll(queryParams) {
    if (!queryParams) {
      queryParams = {
        sorts: '-createdAt'
      };
    }
    return apiService.get(this.resourcePath, queryParams);
  }

  findById(id) {
    return apiService.get(this.resourcePath + '/' + id);
  }

  create(body) {
    return apiService.post(this.resourcePath, body);
  }

  update(id, body) {
    return apiService.put(this.resourcePath + '/' + id, body);
  }

  deleteById(id) {
    return apiService.del(this.resourcePath + '/' + id);
  }
}

export default CrudService;
