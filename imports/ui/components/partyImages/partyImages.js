import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyImages.html';
import { Thumbs, Images } from '../../../api/images';
import { name as DisplayImageFilter } from '../../filters/displayImageFilter';

class PartyImage {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    this.subscribe('thumbs', () => [
      this.getReactively('images', true) || [],
    ]);

    this.helpers({
      thumbs() {
        const images = this.getReactively('images', true);
        if (images) {
          console.log('Total Images: ', images.length);
          return Thumbs.find({
            originalStore: 'images',
            originalId: {
              $in: images || [],
            },
          });
          // return Images.find({ _id: { $in: images } });
        }
      },
    });
  }
}

const name = 'partyImages';

// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayImageFilter,
]).component(name, {
  template,
  bindings: {
    images: '<',
  },
  controllerAs: name,
  controller: PartyImage,
});
