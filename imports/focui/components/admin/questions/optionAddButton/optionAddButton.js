import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './optionAddButton.html';
import modalTemplate from './optionAddModal.html';
import { name as OptionAdd } from '../optionAddEdit/optionAddEdit';


class OptionAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog,question) {
        'ngInject';
        this.question = question;
        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'optionAddModal',
      template: modalTemplate,
      targetEvent: event,
      locals:{question: this.question},
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'optionAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  OptionAdd,
]).component(name, {
  template: buttonTemplate,
  controllerAs: name,
  controller: OptionAddButton,
  bindings:{
    question: '<'
  }
});
