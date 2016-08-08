import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Roles} from 'meteor/alanning:roles'


// Admin
if (Meteor.isServer) {
  Meteor.publish('users', function(options,searchString,group) {
    var where = {
      'profile.name': {
        '$regex': '.*' + (searchString || '') + '.*',
        '$options': 'i'
      }
    };
    Counts.publish(this, 'numberOfUsers', Meteor.users.find(where), {noReady: true});

    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],group?group:"default-group")) {
      return Meteor.users.find(where,options);

    } else {
      console.log("Un Authorized Access to users publication.");
      return this.ready();
    }
  });
  Meteor.publish(null, function (){
    return Meteor.roles.find({})
  })
  Meteor.publish('user', function() {
    return Meteor.users.find({
      _id: this.userId
    });
  });
}
