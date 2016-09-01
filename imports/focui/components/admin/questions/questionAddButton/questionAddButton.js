import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './questionAddButton.html';
import modalTemplate from './questionAddModal.html';
import { name as QuestionAdd } from '../questionAdd/questionAdd';


class QuestionAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog,service) {
        'ngInject';
        this.service = service;
        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'questionAddModal',
      template: modalTemplate,
      targetEvent: event,
      locals:{service: this.service},
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'questionAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  QuestionAdd
]).component(name, {
  template: buttonTemplate,
  controllerAs: name,
  controller: QuestionAddButton,
  bindings:{
    service: '<'
  }
});
