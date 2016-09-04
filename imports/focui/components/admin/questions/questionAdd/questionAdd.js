import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Services} from '../../../../../api/categories/index';

import webTemplate from './questionAdd.web.html';
import mobileTemplate from './questionAdd.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './questionAdd.scss';

class QuestionAdd{
  constructor($scope,$reactive){
    'ngInject';
    if(!this.question)
      this.question = {};
    this.types = [
      {name: "input",id:1},
      {name: "checkbox",id:2},
      {name: "radio",id:3},
      {name: "date",id:4},
      {name: "file",id:5},
      {name: "location",id:6},
      {name: "number",id:7},
    ];

  }
  save(){
    if(this.publishNow){
      this.question.publishAt = new Date();
    }
    if(this.question.serviceId){
      //Update
      console.log(this.question);
      this.question.modifiedAt = new Date();
      var ser = angular.copy(this.service);
      delete ser._id;
      this.update(ser);
    }
    else{
      //Insert
      console.log("Insert: ",this.question);
      this.question.creator = Meteor.userId();
      this.question.createdAt = new Date();
      this.question.serviceId = this.service._id;
      console.log(this.service);
      if(this.service.questions)
        this.service.questions.push(this.question);
      else{
        this.service.questions = [this.question];
      }
      var ser = angular.copy(this.service);
      delete ser._id;
      this.update(ser);
    }

    if(this.done){
      this.done();
    }
    this.reset();
  }

  update(ser){
    Services.update({
      _id: this.service._id
      },{
        $set: ser
    },function(error){
      if (error){
        console.log("Cannot update service");
      }
      else {
        console.log("Service updated");
      }
    });
  }

  reset(){
    this.question = {};
  }
}


const name = 'questionAdd';

// create a module
export default angular.module(name, [
  angularMeteor,
]).component(name, {
  template,
  controllerAs: name,
  controller: QuestionAdd,
  bindings: {
    done: '&?',
    service:'<',
    question:'<', // has value then update. otherwise insert.
  },
});
