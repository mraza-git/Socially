import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import { updateUserImage } from '../../../api/users/index.js';
import { name as AdminDataService } from '../../../services/dataService';
import { name as ServiceList } from '../serviceList/serviceList';
import { name as ImageUpload } from '../imageUpload/imageUpload';
import { Images } from '../../../api/images';
import {name as AuthModals} from '../authmodals/authModals';

import template from './landing.html';

class Landing {
  constructor($scope, $state, AdminDataService,AuthModals, $reactive) {
    'ngInject';
    this.service = {serviceName:""};
    this.allservices = [{}];
    this.state = $state;
    this.searchText="";
    this.authModals = AuthModals;

    $reactive(this).attach($scope);

    this.subscribe('images', () => [
      this.getReactively('profileImage', true) || {},
    ]);

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      },
      profileImage() {
        const user = Meteor.users.findOne({
          $and: [{
            _id: Meteor.userId(),
          }, {
            profileImage: {
              $exists: true,
            },
          }],
        });
        if (user) {
          return user.profileImage;
        }
        return null;
      },
    });

    AdminDataService.getCategories().then((data) => {
      this.categories = data;
      this.getServices(data);
    });
  }
  save() {
    if (this.profileImage) {
      console.log(this.profileImage);
      updateUserImage(Meteor.userId(), this.profileImage);
    }
  }
  getSrc(pictureId) {
    const value = 'http://192.168.99.153:6280/Temp/Downloads/HostImage_' + pictureId + '-800-0.jpg';
    return value;
  }
  selectedItemChange(item) {
    console.log(item);
    this.state.go('serviceList', { cid: item.bCatId });
  }

  getServices(categories) {
    this.allservices = [];
    angular.forEach(categories, (cat, index) => {
      angular.forEach(cat.businessservice, (ser, sindex) => {
        this.allservices.push(ser);
      });
    });
    console.log(this.allservices);
  }

  openLogin(event){

    this.authModals.openLoginModal(event);
  }
  openSignup(event){
    this.authModals.openRegisterModal(event);
  }
  openChangePassword(event){
    this.authModals.openChangeModal(event);
  }
  openForgotPassword(event){
    this.authModals.openForgotModal(event);
  }


}


const name = 'landing';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  AdminDataService,
  ServiceList,
  ImageUpload,
  AuthModals,
]).component(name, {
  template,
  controllerAs: name,
  controller: Landing,
})
.config(config);

function config($stateProvider,$mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
          .primaryPalette("blue")
          .accentPalette('green')
          .warnPalette('red');

  $stateProvider
    .state('landing', {
      url: '/landing',
      template: '<landing></landing>',
    });
}
