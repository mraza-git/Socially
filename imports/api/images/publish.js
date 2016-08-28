import { Meteor } from 'meteor/meteor';
import { Thumbs200, Thumbs96, Thumbs40, Images } from './collection';

if (Meteor.isServer) {
  Meteor.publish('thumbs200', function (ids) {
    return Thumbs200.find({
      originalStore: 'images',
      originalId: {
        $in: ids,
      },
    });
  });
  Meteor.publish('thumbs96', function (ids) {
    return Thumbs96.find({
      originalStore: 'images',
      originalId: {
        $in: ids,
      },
    });
  });
  Meteor.publish('thumbs40', function (ids) {
    return Thumbs40.find({
      originalStore: 'images',
      originalId: {
        $in: ids,
      },
    });
  });



  Meteor.publish('images', function () {
    return Images.find({});
  });
}
