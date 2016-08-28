import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Categories} from '../../../../api/categories/index';
import utilsPagination from 'angular-utils-pagination';
import "../../../../../client/fuse/core/core.module.js";
import {name as CategoryAddButton} from './categoryAddButton/categoryAddButton';
import {name as CategoryRemove} from './categoryRemove/categoryRemove';

import modalTemplate from './categoryAddButton/categoryAddModal.html';
import webTemplate from './categories.web.html';
import mobileTemplate from './categories.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './categories.scss';

class CategoryList{
  constructor($scope,$reactive,$mdDialog,$mdMedia){
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    $reactive(this).attach($scope);
    this.subscribe('categories');

    this.helpers({
      categories(){
        return Categories.find();
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
    });

  }
  edit(category,event){
      this.$mdDialog.show({
        controller($mdDialog,category) {
          'ngInject';
          this.category = category;
          this.close = () => {
            $mdDialog.hide();
          }
        },
        controllerAs: 'categoryAddModal',
        template: modalTemplate,
        targetEvent: event,
        locals: {category: category},
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      });


  }

}


const name = 'categoryList';
// create a module
export default angular.module(name, [
  angularMeteor,
  utilsPagination,
  'app.core',
  CategoryAddButton,
  CategoryRemove,

]).component(name, {
  template,
  controllerAs: name,
  controller: CategoryList,
})
.config(config);


function config($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.categorylist', {
    url: '/foccategories',
    resolve:{
      currentUser($q) {
        if (Meteor.user() === null) {
          console.log("Your are not logged in");
          return $q.reject('AUTH_REQUIRED');
        }
      }
    },
    // Only run in the Content section of the app.
    views:{
       'content@app':{
        template: '<category-list></category-list>',
      },
    }
  });
}
