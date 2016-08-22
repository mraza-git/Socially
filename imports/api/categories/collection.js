import { Mongo } from 'meteor/mongo';
import { Roles } from "meteor/alanning:roles";

export const Categories = new Mongo.Collection('categories');
export const Services = new Mongo.Collection('services');
export const Questions = new Mongo.Collection('questions');

Categories.allow({
  insert(userId, category) {
    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
  },
  update(userId, category, fields, modifier) {
    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
  },
  remove(userId, category) {
    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
  },
});


Services.allow({
  insert(userId, service) {
    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
  },
  update(userId, service, fields, modifier) {
    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
  },
  remove(userId, service) {
    if (Roles.userIsInRole(this.userId, ['manage-users', 'admin'],"default-group")) {
      return true;
    }
  },
});
