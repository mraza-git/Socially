import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Services} from '../../../../api/categories';
import utilsPagination from 'angular-utils-pagination';
import "../../../../../client/fuse/core/core.module.js";
import "angular-sortable-view";
import {name as ServiceAddButton} from './serviceAddButton/serviceAddButton';
import {name as ServiceRemove} from './serviceRemove/serviceRemove';
import {name as QuestionList} from '../questions/questions';

import modalTemplate from './serviceAddButton/serviceAddModal.html';
import webTemplate from './services.web.html';
import mobileTemplate from './services.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './services.scss';

class ServiceList{
  constructor($scope,$stateParams,$reactive,$mdDialog,$mdMedia){
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

    if($stateParams.catId){
      this.categoryId = $stateParams.catId;
    }
    $reactive(this).attach($scope);
    this.subscribe('catServices',function(){
      return [[this.getReactively("categoryId")]] || [];
    });

    this.helpers({
      services(){
        return Services.find({
          categoryId:{
            $in: [this.getReactively("categoryId")],
          },
        });
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
    });

  }
  edit(service,event){
      this.$mdDialog.show({
        controller($mdDialog,categoryId,service) {
          'ngInject';
          this.categoryId = categoryId;
          this.service = service;
          this.close = () => {
            $mdDialog.hide();
          }
        },
        controllerAs: 'serviceAddModal',
        template: modalTemplate,
        targetEvent: event,
        locals: {categoryId: this.categoryId, service : service},
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      });


  }

}


const name = 'serviceList';
// create a module
export default angular.module(name, [
  angularMeteor,
  utilsPagination,
  'angular-sortable-view',
  'app.core',
  ServiceAddButton,
  ServiceRemove,
  QuestionList,

]).component(name, {
  template,
  controllerAs: name,
  controller: ServiceList,
  bindings:{
    categoryId: '@',
  },
})
.config(config);


function config($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.servicelist', {
    url: '/focservices/:catId',
    // Only run in the Content section of the app.
    views:{
       'content@app':{
        template: '<service-list></service-list>',
      },
    }
  });
}
