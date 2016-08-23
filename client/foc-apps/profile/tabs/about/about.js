import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import webTemplate from './about.web.html';
import mobileTemplate from './about.mobile.html';
const template = Meteor.isCordova? mobileTemplate : webTemplate;
import 'angular-xeditable/dist/css/xeditable.css';

class About{
  constructor($scope,$reactive){
    'ngInject';
    $reactive(this).attach($scope);
    this.gender  = [
      {value: 'Male', text: 'Male'},
      {value: 'Female', text: 'Female'}
    ];
    this.ofOwner = false;
    this.helpers({    
      ofOwner(){
          return Meteor.userId() === this.getReactively('user._id');
      }
    });



  }


  saveUser(){
    const uid = angular.copy(this.user._id);
    delete this.user._id;
    Meteor.users.update({
      _id:uid
    },{
      $set: this.user
    },function(error){
      if (error){
        console.log("Cannot update user");
      }
      else {
        console.log("User updated");
      }
    }
  )
  }

}

const name = 'about';
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: About,
  bindings:{
    user:'<',
  }
});
