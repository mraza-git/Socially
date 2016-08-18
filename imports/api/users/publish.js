import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import { Counts } from 'meteor/tmeasday:publish-counts';



// Admin
if (Meteor.isServer) {
  Meteor.publish('adminusers', function(options,searchString,group) {
    var where = {
      'profile.name': {
        '$regex': '.*' + (searchString || '') + '.*',
        '$options': 'i'
      }
    };
    Counts.publish(this, 'numberOfUsers', Meteor.users.find(where), {noReady: true});

    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],group?group:"default-group")) {
      return Meteor.users.find(where,options,{
        fields:{
          services:{
            password: 0
          }
        }
      });
    } else {
      console.log("Un Authorized Access to users publication.");
      return this.ready();
    }
  });
  Meteor.publish(null, function (){
    return Meteor.roles.find({})
  })

}
