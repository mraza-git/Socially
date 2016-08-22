import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './timeline.web.html';
import mobileTemplate from './timeline.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

class Timeline{

}
const name = 'timeline';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: "vm",
  controller: Timeline,
  bindings:{
    posts:"<",
    activities:"<"
  }
});
