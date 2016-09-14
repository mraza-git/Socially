import { Meteor } from 'meteor/meteor';
import { Categories, Services } from './collection';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';

// All Categories
if(Meteor.isServer){
  Meteor.publish('categories',
  function(){
    var handle =  Categories.find({},{
      fields: {name:1, description: 1, image:1}
    });
    return handle;
  });

// Categories of single service.
Meteor.publish('serCategories',function(ids){
  return Categories.find({
    _id: {$in: ids,},
  });
});


  // All Services
  Meteor.publish('services',function(){
    return Services.find({},{
      fields:{name:1,description:1,image:1,categoryIds:1}
    }
    );
  });
  // Counts of services in a particular category
  Meteor.publish('servicecounts',function(ids){
    console.log(ids);
    Counts.publish(this, 'numberOfServices', Services.find({
      categoryIds: {$in: ids,},
    }));
    this.ready();
  })
  // Services in a particular category.
  Meteor.publish('catServices',function(ids){
    return Services.find({
      categoryIds: {$in: ids,},
    });
  });

  // Single service publication using service id.
  Meteor.publish('service',function(ids){
    return Services.find(
      {_id: {$in:ids}},
      {
      fields: {name:1, description: 1, image:1,categoryIds:1,questions:1}
      }
    );
  });
}
