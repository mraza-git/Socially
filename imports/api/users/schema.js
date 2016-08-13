import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

export let Schema;

Schema = {};

Schema.UserProfile = new SimpleSchema({
  name: {
    type: String,
    regEx: /^[a-z0-9A-z . -]{3,30}$/,
    optional: true
  },
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: true
  },
  organization: {
    type: String,
    regEx: /^[a-z0-9A-z .]{3,30}$/,
    optional: true
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  },
  dpThumbUrl:{
    type: String,
    optional:true
  },
  dpImageId:{
    type:String,
    optional:true
  },
  addresses:{
    type: [Object],
    optional:true
  },
  "addresses.$.title":{
    type: String,
    optional:true
  },
  "addresses.$.latitude":{
    type: Float32Array,
    optional:true
  },
  "addresses.$.longitude":{
    type: Float32Array,
    optional:true
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    optional: true
  },
  emails: {
    type: [Object]

  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  // # Add `roles` to your schema if you use the meteor-roles package.
  // # Option 1: Object type
  // # If you specify that type as Object, you must also specify the
  // # `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // # Example:
  // # Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // # You can't mix and match adding with and without a group since
  // # you will fail validation in some cases.

  roles: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(Schema.User); //not working with this.

// Collection2 already does schema checking
// Add custom permission rules if needed

Meteor.users.allow({
  insert: function(userId, user, fields, modifier) {
    return userId === user._id || Roles.userIsInRole(userId, ['manage-users', 'admin'],'default-group');
  },
  update: function(userId, user, fields, modifier) {
    return userId === user._id || Roles.userIsInRole(userId, ['manage-users', 'admin'],'default-group');
  },
  remove: function(userId, user, fields, modifier) {
    return userId === user._id || Roles.userIsInRole(userId, ['manage-users', 'admin'],'default-group');
  }
});
