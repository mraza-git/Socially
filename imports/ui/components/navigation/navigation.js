import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';

class Navigation {

}

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor,
]).component(name, {
  template,
  controllerAs: name,
  controller: Navigation,
});
