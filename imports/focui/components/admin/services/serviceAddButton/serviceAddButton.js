import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './serviceAddButton.html';
import modalTemplate from './serviceAddModal.html';
import { name as ServiceAdd } from '../serviceAdd/serviceAdd';


class ServiceAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog,categoryId) {
        'ngInject';
        this.categoryId = categoryId;
        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'serviceAddModal',
      template: modalTemplate,
      targetEvent: event,
      locals:{categoryId: this.categoryId},
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'serviceAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  ServiceAdd
]).component(name, {
  template: buttonTemplate,
  controllerAs: name,
  controller: ServiceAddButton,
  bindings:{
    categoryId: '@'
  }
});
