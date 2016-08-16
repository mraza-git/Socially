import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './default.web.html';
import mobileTemplate from './default.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import './default.scss';

const name = 'navDefault';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name
});
