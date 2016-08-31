import { Mongo } from 'meteor/mongo';
import { Roles } from "meteor/alanning:roles";
import { Meteor } from 'meteor/meteor';

export const Categories = new Mongo.Collection('categories');
export const Services = new Mongo.Collection('services');

Categories.allow({
  insert(category) {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['manage-users', 'admin'],"default-group")) {

      return true;
    }
    console.log("Non admin insert operation");
  },
  update(userId, category, fields, modifier) {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['manage-users', 'admin'],"default-group")) {

      return true;
    }
    console.log("Non admin insert operation");
  },
  remove(userId, category) {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['manage-users', 'admin'],"default-group")) {

      return true;
    }
    console.log("Non admin insert operation");
  },
});


Services.allow({
  insert(userId, service) {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['manage-users', 'admin'],"default-group")) {

      return true;
    }
    console.log("Non admin insert operation");
  },
  update(userId, service, fields, modifier) {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
    console.log("Non admin insert operation");
  },
  remove(userId, service) {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['manage-users', 'admin'],"default-group")) {

      return true;
    }
    console.log("Non admin insert operation");
  },
});
