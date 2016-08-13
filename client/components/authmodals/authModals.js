import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


import {name as focNavMenuService} from '../../../imports/services/navmenuService';
import loginWebTemplate from './login.web.html';
import loginMobileTemplate from './login.mobile.html';
import registerWebTemplate from './register.web.html';
import registerMobileTemplate from './register.mobile.html';
import forgotWebTemplate from './forgot.web.html';
import forgotMobileTemplate from './forgot.mobile.html';
import changeWebTemplate from './change.web.html';
import changeMobileTemplate from './change.mobile.html';


class AuthModals {
  credentials = {};
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.credentials.email = "";
    this.credentials.password ="";
    this.credentials.profile = {name :""};
  }

  openLoginModal(event) {
    const modalTemplate = Meteor.isCordova ? loginMobileTemplate: loginWebTemplate;
    this.$mdDialog.show({
      controller($mdDialog,AuthModals,focNavMenuService) {
        'ngInject';
        this.close = () => {
          $mdDialog.hide();
        }
        this.login =()=>{
          Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            (err) => {
              if (err) {
                this.error = err.message;
              } else {
                // Toast here ;)
                switch (AuthModals.checkRole()){
                  case 'admin':
                  console.log("Admin");
                  focNavMenuService.setAdminNavMenus();
                  break;
                  default:
                  focNavMenuService.setCustomerNavMenus();
                  break;

                }

                this.close();
              }
            }
          );
        }
        this.register=(event)=>{
          AuthModals.openRegisterModal(event);
          this.close();
        }
        this.forgot=(event)=>{
          AuthModals.openForgotModal(event);
          this.close();
        }
      },
      controllerAs: 'modalLogin',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
  openRegisterModal(event) {
    const modalTemplate = Meteor.isCordova ? registerMobileTemplate: registerWebTemplate;
    this.$mdDialog.show({
      controller($mdDialog,AuthModals) {
        'ngInject';
        this.close = () => {
          $mdDialog.hide();
        }
        this.register =()=>{
          Accounts.createUser(this.credentials,
            (err) => {
              if (err) {
                this.error = err.message;
              } else {
                // Toast here
                this.close();
              }
            }
          );
        }
        this.login=(event)=>{
          AuthModals.openLoginModal(event);
          this.close();
        }
      },
      controllerAs: 'modalRegister',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
  openForgotModal(event) {
    const modalTemplate = Meteor.isCordova ? forgotMobileTemplate: forgotWebTemplate;
    this.$mdDialog.show({
      controller($mdDialog,AuthModals) {
        'ngInject';
        this.close = () => {
          $mdDialog.hide();
        }
        this.forgot=()=>{
          Accounts.forgotPassword(this.credentials, (err) => {
            if (err) {
              this.error = err.message;
            } else {
              // toast here
              this.close();
            }
          });
        }
        this.login=(event)=>{
          AuthModals.openLoginModal(event);
          this.close();
        }
      },
      controllerAs: 'modalForgot',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
  openChangeModal(event) {
    const modalTemplate = Meteor.isCordova ? changeMobileTemplate: changeWebTemplate;
    this.$mdDialog.show({
      controller($mdDialog,AuthModals) {
        'ngInject';
        if(!Meteor.userId()) {
          // Toast Login to change password.
          this.error = "Login to change password";

        }
        this.close = () => {
          $mdDialog.hide();
        }
        this.change=()=>{
          if(!Meteor.userId())
            return;
            this.options = {
              logout:false
            }
          Meteor.call('setPassword',Meteor.userId(),this.credentials.password,this.options,function(err,res){
              if(err){
                console.log("Error Updating Password",err);
                this.error = err.message;
              }
              else{
                console.log("Password updated.");
                this.close();
              }
          });
        }
        this.login=(event)=>{
          AuthModals.openLoginModal(event);
          this.close();
        }
      },
      controllerAs: 'modalChange',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
  checkRole = ()=>{
    if(Roles.userIsInRole(Meteor.userId(),['admin','manage-users'],"default-group")) {
      return 'admin';
    }
    else
    return 'customer';
  }



}

const name = 'AuthModals';

// create a module
export default angular.module(name, [
  angularMeteor,
  focNavMenuService,
]).service(name, AuthModals);
