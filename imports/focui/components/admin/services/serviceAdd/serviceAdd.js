import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Services} from '../../../../../api/categories/index';
import {name as FileUpload} from '../../../fileUpload/fileUpload';
import { Images } from '../../../../../api/images';
import webTemplate from './serviceAdd.web.html';
import mobileTemplate from './serviceAdd.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './serviceAdd.scss';

class ServiceAdd{
  constructor($scope,$reactive){
    'ngInject';
    if(!this.service)
      this.service = {};

  }
  save(event){
    this.service.creator = Meteor.userId();
    this.service.createdAt = new Date();
    this.service.categoryId = this.categoryId;

    if(!this.service.image){
      this.service.image = {};
      this.service.image.alt = this.service.name + "_image";
    }

    if(event){

      if(this.service.image.id != event.file.id){
        // Remov the older image from the db.
        Images.remove(this.service.image.id);
      }
      this.service.image = event.file;
      this.service.image.alt = this.service.name + "_image";
    }
    if(this.service._id){
      //Update
      var cat = angular.copy(this.service);
      delete cat._id;

      Services.update({
        _id: this.service._id
        },{
          $set: cat
      },function(error){
        if (error){
          console.log("Cannot update service");
        }
        else {
          console.log("Service updated");
        }
      });
    }
    else{
      //Insert      
      Services.insert(this.service);
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
    this.service = {};
  }
}


const name = 'serviceAdd';

// create a module
export default angular.module(name, [
  angularMeteor,
  FileUpload,
]).component(name, {
  template,
  controllerAs: name,
  controller: ServiceAdd,
  bindings: {
    done: '&?',
    service:'<',
    categoryId:'@'
  },
});
