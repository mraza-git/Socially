import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import ngImgCrop from 'ng-img-crop-full-extended/compile/minified/ng-img-crop';
// import 'ng-img-crop/compile/minified/ng-img-crop';
// import 'ng-img-crop/compile/minified/ng-img-crop.css';
import 'ng-img-crop-full-extended/compile/minified/ng-img-crop.css';

import { Meteor } from 'meteor/meteor';

import template from './fileUpload.html';
import { Thumbs96, upload } from '../../../api/images';

class FileUpload {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.uploaded = {};
    if(this.cropSettings){
      this.crop = this.cropSettings.crop || false;
    }

    // watch if its ok to save.
    this.autorun(()=>{
        if(this.getReactively('okToSave')){
          this.save();
        }
    });

  }

  addImage(files) {
    if (files.length) {
      this.currentFile = files[0];
      const reader = new FileReader;

      reader.onload = this.$bindToContext((e) => {
        if(this.crop){
          this.cropImgSrc = e.target.result;
          this.cropNow();
          this.myCroppedImage = '';
        }
        else {
          this.myCroppedImage = e.target.result;
          this.cropDone();
        }
      });

      reader.readAsDataURL(files[0]);
    } else {
      this.cropImgSrc = undefined;
    }
  }

  cropDone(){
    if(this.myCroppedImage){
      this.croppedImage = angular.copy(this.myCroppedImage);
    this.cropIsDone = true;
    if(this.okToSave)
      this.save();
    }
  }

  cropNow(){
    this.cropIsDone = false;
  }

  save() {
    if(!this.croppedImage){
      this.reset();
      this.done();
      return;
    }
    this.uploading = true;
    upload(this.croppedImage, this.currentFile.name, this.$bindToContext((file,progress)=>{
        this.progress = progress*100;
      }),
      this.$bindToContext((file) => {
        this.uploaded=file;
        this.uploading = false;
        this.done({
          $event: {
            file:{id: file._id,url:file.url}
          }
        });
        this.reset();
      }), (e) => {
        // error uploading
        console.log("Error Uploading:" ,e)
      });
  }

  reset() {
    this.cropImgSrc = undefined;
    this.myCroppedImage = '';
  }
}

const name = 'fileUpload';

// create a module
export default angular.module(name, [
  angularMeteor,
  ngFileUpload,
  'ngImgCrop',
]).component(name, {
  template,
  bindings: {
    okToSave: '<',
    done: '&',
    cropSettings:'<',

  },
  controllerAs: name,
  controller: FileUpload
});
