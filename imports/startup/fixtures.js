import { Meteor } from 'meteor/meteor';
import { Parties } from '../api/parties/index';
import { Categories } from '../api/categories/index.js';

Meteor.startup(() => {
  if (Parties.find().count() === 0) {
    const parties = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.',
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!',
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.',
    }];

    parties.forEach((party) => {
      Parties.insert(party);
    });
  }

  if (Categories.find().count() === 0) {
    const categories = [{
      'name': 'Handyman',
      'description': 'Handyman related services',
    }, {
      'name': 'Photography',
      'description': 'Photoygraphy related services',
    }, {
      'name': 'Events',
      'description': 'Event management related services',
    }];

    categories.forEach((category) => {
      Categories.insert(category);
    });
  }

});
