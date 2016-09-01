import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Services} from '../../../../../api/categories/index';

import modalTemplate from '../questionAddButton/questionAddModal.html';
import webTemplate from './questionEdit.web.html';
import mobileTemplate from './questionEdit.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './questionEdit.scss';

class QuestionEdit{
  constructor($scope,$reactive,$mdDialog,$mdMedia){
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    if(!this.service)
      this.service = {};
  }
  edit(event){
      this.$mdDialog.show({
        controller($mdDialog,service,question) {
          'ngInject';
          this.service = service;
          this.question = question;
          this.close = () => {
            $mdDialog.hide();
          }
        },
        controllerAs: 'questionAddModal',
        template: modalTemplate,
        targetEvent: event,
        locals: {service: this.service, question : this.question},
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      });


  }

}


const name = 'questionEdit';

// create a module
export default angular.module(name, [
  angularMeteor,
]).component(name, {
  template,
  controllerAs: name,
  controller: QuestionEdit,
  bindings: {
    done: '&?',
    question:'<',
  },
});
