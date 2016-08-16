import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './user.web.html';
import mobileTemplate from './user.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './user.scss';

const name = 'navUser';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name
});
