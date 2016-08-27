import angular from 'angular';
import angularMeteor from 'angular-meteor';

import modalTemplate from './setPictureModal.html';


class SetPictureModal {
  constructor($mdDialog, $mdMedia) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.close = (event) => {
          $mdDialog.hide(event);
        }
      },
      controllerAs: 'imageModal',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    })
    .then(function(event){
      return event;
    },function(error){
      
    });
  }
}

const name = 'setPictureModal';

// create a module
export default angular.module(name, [
  angularMeteor,

]).component(name, {
  controllerAs: name,
  controller: SetPictureModal,
});
