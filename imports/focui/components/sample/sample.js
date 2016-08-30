import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './sample.web.html';
import mobileTemplate from './sample.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

const name = 'sampleContact';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name
})

.config(config);


function config($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.sampleContact', {
    url: '/sampleContact',
    resolve:{
      currentUser($q) {
        if (Meteor.user() === null) {
          console.log("Your are not logged in");
          return $q.reject('AUTH_REQUIRED');
        }
      }
    },
    // Only run in the Content section of the app.
    views:{
       'content@app':{
        template: '<sample-contact></sample-contact>',
      },
    }
  });
}
