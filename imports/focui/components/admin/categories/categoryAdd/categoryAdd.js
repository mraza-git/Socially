import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Categories} from '../../../../../api/categories/index';

import webTemplate from './categoryAdd.web.html';
import mobileTemplate from './categoryAdd.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './categoryAdd.scss';

class CategoryAdd{
  constructor($scope,$reactive){
    'ngInject';
    this.category = {};
  }
  add(){
    this.category.creator = Meteor.userId();
    this.category.createdAt = new Date();
    Categories.insert(this.category);
    if(this.done){
      this.done();
    }
    this.reset();
  }
  reset(){
    this.category = {};
  }
}


const name = 'categoryAdd';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: CategoryAdd,
  bindings: {
    done: '&?'
  },
});
