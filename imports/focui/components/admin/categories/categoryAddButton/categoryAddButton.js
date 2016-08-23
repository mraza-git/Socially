import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './categoryAddButton.html';
import modalTemplate from './categoryAddModal.html';
import { name as CategoryAdd } from '../categoryAdd/categoryAdd';


class CategoryAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'categoryAddModal',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'categoryAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  CategoryAdd
]).component(name, {
  template: buttonTemplate,
  controllerAs: name,
  controller: CategoryAddButton
});
