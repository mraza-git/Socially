import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';

import template from './partiesMap.html';

/**
 * PartiesMap component
 */
class PartiesMap {
  constructor() {
    this.map = {
      center: {
        latitude: 25.1057841,
        longitude: 55.1641655,
      },
      zoom: 12,
    };
  }
}

const name = 'partiesMap';

// create a module
export default angular.module(name, [
  angularMeteor,
  'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
  'uiGmapgoogle-maps',
])
.config(function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyC_TZbizJWmRlcyaPA2WQUmGUU-A2iZZjo',
  });
})
.component(name, {
  template,
  controllerAs: name,
  bindings: {
    parties: '=',
  },
  controller: PartiesMap,
});
