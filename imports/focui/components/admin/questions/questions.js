import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Services} from '../../../../api/categories';
import utilsPagination from 'angular-utils-pagination';
import "../../../../../client/fuse/core/core.module.js";
import {name as QuestionAddButton} from './questionAddButton/questionAddButton';
import {name as QuestionRemove} from './questionRemove/questionRemove';
import {name as QuestionEdit} from './questionEdit/questionEdit';


import modalTemplate from './questionAddButton/questionAddModal.html';
import webTemplate from './questions.web.html';
import mobileTemplate from './questions.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './questions.scss';

class QuestionList{
  constructor($scope,$stateParams,$reactive){
    'ngInject';

    if($stateParams.serviceId){
      this.serviceId = $stateParams.serviceId;
      console.log(this.serviceId);
    }
    $reactive(this).attach($scope);
    this.subscribe('service',function(){
      return [[this.getReactively('serviceId')]] || []
    });

    this.helpers({
      service(){
        return Services.findOne({
          _id:{$in: [this.getReactively("serviceId")]}
          });
        },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
    });
    console.log(this.service);

  }

  update(part){
    var questions = [];
    if(part.questions){
      questions = angular.copy(part.questions);
    }
      else {
        questions = angular.copy(part);
      }
    console.log(questions);
    Services.update(
      { _id: this.service._id},
      { $set:
        {
          questions: questions,
        }
      },function(error){
        if (error){
          console.log("Cannot update service",error);
        }
        else {
          console.log("Service updated");
        }
    });
  }

}


const name = 'questionList';
// create a module
export default angular.module(name, [
  angularMeteor,
  utilsPagination,
  'angular-sortable-view',
  'app.core',
  QuestionAddButton,
  QuestionRemove,
  QuestionEdit,
]).component(name, {
  template,
  controllerAs: name,
  controller: QuestionList,
  bindings:{
    serviceId: '<',
    question:'<'
  },
})
.config(config);


function config($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.questionlist', {
    url: '/questions/:serviceId',
    // Only run in the Content section of the app.
    views:{
       'content@app':{
        template: '<question-list></question-list>',
      },
    }
  });
}
