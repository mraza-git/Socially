import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Images = new Mongo.Collection('images');
export const Thumbs200 = new Mongo.Collection('thumbs200');
export const Thumbs96 = new Mongo.Collection('thumbs96');
export const Thumbs40 = new Mongo.Collection('thumbs40');

function loggedIn(userId) {
  return !!userId;
}

Thumbs200.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn,
});

Thumbs96.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn,
});

Thumbs40.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn,
});

Images.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn,
});
