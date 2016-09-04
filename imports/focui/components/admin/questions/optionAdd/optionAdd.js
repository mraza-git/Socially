import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import {Services} from '../../../../../api/categories/index';

import webTemplate from './optionAdd.web.html';
import mobileTemplate from './optionAdd.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './optionAdd.scss';

class OptionAdd{
  constructor($scope,$reactive){
    'ngInject';

  }
  save(){
  }
  reset(){
    this.option = {};
  }
}


const name = 'optionAdd';

// create a module
export default angular.module(name, [
  angularMeteor,
]).component(name, {
  template,
  controllerAs: name,
  controller: OptionAdd,
  bindings: {
    done: '&?',
    question:'<',

  },
});
