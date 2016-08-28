import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './categoryRemove.html';
import { Categories } from '../../../../../api/categories';
import {Images} from '../../../../../api/images';

class CategoryRemove {
  remove() {
    if (this.category) {
      if (this.category.image){
        Images.remove(this.category.image.id);
      }
      Categories.remove(this.category._id);
    }
  }
}

const name = 'categoryRemove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    category: '<'
  },
  controllerAs: name,
  controller: CategoryRemove
});
