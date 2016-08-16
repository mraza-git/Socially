import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './sample.web.html';
import mobileTemplate from './sample.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './sample.scss';

const name = 'sample';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name
});
