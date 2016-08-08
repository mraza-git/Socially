import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import 'angular-sortable-view';
import 'ng-img-crop/compile/minified/ng-img-crop.js';
import 'ng-img-crop/compile/minified/ng-img-crop.css';

import { Meteor } from 'meteor/meteor';

import './imageUpload.less';
import template from './imageUpload.html';
import { Thumbs, Images, upload } from '../../../api/images';

class ImageUpload {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('thumbs', () => [
      this.getReactively('imageId', true) || [],
    ]);

    this.helpers({
      thumbs() {
        return Thumbs.find({
          originalStore: 'images',
          originalId: this.getReactively('imageId', true) || null,
        });
      },
    });
  }

  $onInit() {
    console.log('Image upload component loaded');
  }

  $onChanges(changesObj) {
    if (this.imageId) {
      this.oldImageId = changesObj.imageId.previousValue;
    }
  }

  addImage(files) {
    if (files.length) {
      this.currentFile = files[0];

      const reader = new FileReader;

      reader.onload = this.$bindToContext((e) => {
        this.cropImgSrc = e.target.result;
        this.myCroppedImage = '';
      });

      reader.readAsDataURL(files[0]);
    } else {
      this.cropImgSrc = undefined;
    }
  }

  save() {
    upload(this.myCroppedImage, this.currentFile.name, this.$bindToContext((file) => {
      const a = file._id;
      this.imageId = a;
      this.parent.profileImage = this.imageId;
      this.reset();
      // delete previous profile picture if exists.
      // get previous id using components' lifecycle events.
      if (this.oldImageId) {
        console.log(this.oldImageId);
        Thumbs.remove({ originalId: this.oldImageId });
        Images.remove({ _id: this.oldImageId });
      }
      else {
        console.log("No old Image Found.");
      }
    }), (e) => {
      console.log('Oops, something went wrong', e);
    });
  }

  reset() {
    this.cropImgSrc = undefined;
    this.myCroppedImage = '';
  }
}

const name = 'imageUpload';

// create a module
export default angular.module(name, [
  angularMeteor,
  ngFileUpload,
  'ngImgCrop',
  'angular-sortable-view',
]).component(name, {
  template,
  bindings: {
    imageId: '=?',
  },
  require: {
    parent: '^landing',
  },
  controllerAs: name,
  controller: ImageUpload,
});
