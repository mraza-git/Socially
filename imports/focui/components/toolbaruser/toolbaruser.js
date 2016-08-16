import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {name as AuthModals} from '../../../../client/components/authmodals/authModals';

import template from './toolbaruser.web.html';



class ToolbarUser{
  constructor($scope, $reactive, $state, AuthModals) {
    'ngInject';
    $reactive(this).attach($scope);
    this.state = $state;
    this.userStatus = [{}];
    this.authModals = AuthModals;

    this.subscribe('user');
    //this.subscribe('userStatus', Meteor.userId());

    this.helpers({
      user(){
        return Meteor.users.findOne({
          _id: Meteor.userId()
        });
      },
      isLoggedIn(){
        return !!Meteor.userId();
      },
      currentUserId(){
        return Meteor.userId();
      },
    });
  }
  $onInit(){
    this.userStatusOptions=[
        {
            'title': 'Online',
            'icon' : 'icon-checkbox-marked-circle',
            'color': '#4CAF50'
        },
        {
            'title': 'Away',
            'icon' : 'icon-clock',
            'color': '#FFC107'
        },
        {
            'title': 'Do not Disturb',
            'icon' : 'icon-minus-circle',
            'color': '#F44336'
        },
        {
            'title': 'Invisible',
            'icon' : 'icon-checkbox-blank-circle-outline',
            'color': '#BDBDBD'
        },
        {
            'title': 'Offline',
            'icon' : 'icon-checkbox-blank-circle-outline',
            'color': '#616161'
        }
    ];

    this.userStatus = this.userStatusOptions[1];

  }
  setUserStatus(status){
    this.userStatus = status;
    console.log(this.user);
    Meteor.users.update({
      _id:this.user._id
    },{
        $set:{
          "profile.userStatus":angular.copy(status)
      }
    },function(error) {
        if(error) {
          console.log('Unable to update', error);
        } else {
          console.log('User Updated!');
        }
    }
    );

  }
  logout(event){
    Accounts.logout(function(){

        },function(err){
          console.log(err);
          return ;
        });
        this.state.go("app.landing");
  }
  openChangePassword(event){
    this.authModals.openChangeModal(event);
  }

}


const name = 'toolbarUser';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,

]).component(name, {
  template,
  controller: ToolbarUser,
  controllerAs: name
});
