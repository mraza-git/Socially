import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Categories} from '../../../../../api/categories/index';
import {name as FileUpload} from '../../../fileUpload/fileUpload';
import { Images } from '../../../../../api/images';
import webTemplate from './categoryAdd.web.html';
import mobileTemplate from './categoryAdd.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './categoryAdd.scss';

class CategoryAdd{
  constructor($scope,$reactive){
    'ngInject';
    if(!this.category)
      this.category = {};

  }
  save(event){
    this.category.creator = Meteor.userId();
    this.category.createdAt = new Date();
    if(!this.category.image){
      this.category.image = {};
      this.category.image.alt = this.category.name + "_image";
    }

    if(event){

      if(this.category.image.id != event.file.id){
        // Remov the older image from the db.
        Images.remove(this.category.image.id);
      }
      this.category.image = event.file;
      this.category.image.alt = this.category.name + "_image";
    }
    if(this.category._id){
      //Update
      var cat = angular.copy(this.category);
      delete cat._id;

      Categories.update({
        _id: this.category._id
        },{
          $set: cat
      },function(error){
        if (error){
          console.log("Cannot update category");
        }
        else {
          console.log("Category updated");
        }
      });
    }
    else{
      //Insert
      Categories.insert(this.category);
    }


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
    done: '&?',
    category:'<',
  },
});
