import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './contact.web.html';
import mobileTemplate from './contact.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './contact.scss';

const name = 'navContact';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name
});
