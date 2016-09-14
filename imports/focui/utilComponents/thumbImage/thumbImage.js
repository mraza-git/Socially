import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Thumbs96,Thumbs40} from '../../../api/images';
import template from "./thumbImage.html"
import './thumbImage.scss';


class ThumbImage{
  constructor($scope,$reactive){
    'ngInject';
     $reactive(this).attach($scope);
     console.log(this.imageClass);
    if(this.size === "96") {
      this.subscribe('thumbs96',function(){
        return [[this.getReactively('imageId')]] || [];
      });
    }
    else{
      this.subscribe('thumbs40',function(){
        return [[this.getReactively('imageId')]] || [];
      });
    }
    this.helpers({
      thumb: function(){
        if(this.size ==="96"){
          return Thumbs96.findOne({
            originalId: {
              $in:  [this.getReactively('imageId',true)]
            }
          });
        }
        else{
          return Thumbs40.findOne({
            originalId: {
              $in:  [this.getReactively('imageId',true)]
            }
          });
        }
      }
    });
  }
}

const name = "thumbImage";

export default angular
.module(name, [
  angularMeteor,
])
.component(name,{
  template: template,
  controller: ThumbImage,
  controllerAs: name,
  bindings:{
    imageId:'<',
    size:'<',
    imageClass:'@',
  }
});
