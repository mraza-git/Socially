import angular from 'angular';
import angularMeteor from 'angular-meteor';


const name = 'dataService';

const HTTP = new WeakMap();

class AdminDataService {
  constructor($http) {
    'ngInject';
    HTTP.set(this, $http);
  }

  getCategories() {
    return HTTP.get(this).post('http://192.168.99.153:6280/api/services/app/adminDataAppServices/GetBusinessCategories?input=').then(data => data.data.result);
  }

  getServices() {
    return 'nullstring';
  }

  getCategoryById(id) {
    return HTTP.get(this).post('http://192.168.99.153:6280/api/services/app/adminDataAppServices/getCategoryById?id=' + id.toString()).then(data => data.data.result);
  }


  static DataFactory($http) {
    return new AdminDataService($http);
  }
}

// AdminDataService.$inject = ['$http'];


// function catService($http) {
//   this.categories = $http.post('http://192.168.99.153:6280/api/services/app/adminDataAppServices/GetBusinessCategories?input=').then(data => data.data.result);
// }

// catService.$inject = ['$http'];
export default angular.module(name, [
  angularMeteor,
])
  .service('AdminDataService', AdminDataService);


