import { Meteor } from 'meteor/meteor';
import { Categories, Services } from './collection';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';


if(Meteor.isServer){
  Meteor.publish('categories',function(){
    return Categories.find();
  });
  Meteor.publish('services',function(options,searchString){
    let where = {
      'name': {
        '$regex': '.*' + (searchString || '') + '.*',
        '$options': 'i'
      }
    };
    Counts.publish(this, 'numberOfServices', Services.find(where), {noReady: true});
    return Services.find({where,options});
  })

}
