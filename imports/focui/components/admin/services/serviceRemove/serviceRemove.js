import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './serviceRemove.html';
import { Services } from '../../../../../api/categories';
import {Images} from '../../../../../api/images';

class ServiceRemove {
  remove() {
    if (this.service) {
      if (this.service.image){
        Images.remove(this.service.image.id);
      }
      Services.remove(this.service._id);
    }
  }
}

const name = 'serviceRemove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    service: '<'
  },
  controllerAs: name,
  controller: ServiceRemove
});
