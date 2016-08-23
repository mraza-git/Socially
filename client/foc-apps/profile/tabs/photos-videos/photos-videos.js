import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './photos-videos.web.html';
import mobileTemplate from './photos-videos.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;

class PhotosVideos{
  

}

const name = 'photosVideos';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: PhotosVideos,
  bindings:{
    photos: '<'
  }

});
