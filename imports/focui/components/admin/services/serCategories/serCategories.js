import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Categories} from '../../../../../api/categories';
import {name as ThumbImage} from '../../../../utilComponents/thumbImage/thumbImage';

import template from './serCategories.html';

class ServiceCategories{
  constructor($scope,$reactive){
    $reactive(this).attach($scope);
    this.subscribe('categories');
    
    this.helpers({
      categories(){
        return Categories.find({
          _id: {
            $in: this.getReactively('categoryIds') || []
          }
        });
      },
    });

  }
}

const name='serCategories';
export default angular.module(name,[
angularMeteor,
ThumbImage,
])
.component(name,{
  template:template,
  controller:ServiceCategories,
  controllerAs: name,
  bindings:{
    categoryIds:'<'
  }
});
