import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Categories} from '../../../../../api/categories/index';
import {name as FileUpload} from '../../../fileUpload/fileUpload';
import webTemplate from './categoryAdd.web.html';
import mobileTemplate from './categoryAdd.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './categoryAdd.scss';

class CategoryAdd{
  constructor($scope,$reactive){
    'ngInject';
    this.category = {};

  }
  save(event){
    this.category.creator = Meteor.userId();
    this.category.createdAt = new Date();
    this.category.image = event.file;
    this.category.image.alt = this.category.name + "_image";
    Categories.insert(this.category);
    if(this.done){
      this.done();
    }
    this.reset();
  }
  add(){
    this.okToSave = true;
  }
  reset(){
    this.category = {};
  }
}


const name = 'categoryAdd';

// create a module
export default angular.module(name, [
  angularMeteor,
  FileUpload,
]).component(name, {
  template,
  controllerAs: name,
  controller: CategoryAdd,
  bindings: {
    done: '&?'
  },
});
