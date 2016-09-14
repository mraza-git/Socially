import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import {Services} from '../../../../../api/categories';


import template from './serviceCount.html';

class ServiceCount{
  constructor($scope,$reactive){
    $reactive(this).attach($scope);

    this.subscribe('catServices',()=>{
      return [[this.getReactively('categoryId')]] || [];
    });

    this.helpers({
      services: ()=>{
        return Services.find({
          categoryIds:{$in:[this.getReactively('categoryId')]}
        });
      },
    });
  }
}

const name='serviceCount';
export default angular.module(name,[
angularMeteor,
])
.component(name,{
  template:template,
  controller:ServiceCount,
  controllerAs: name,
  bindings:{
    categoryId:'<'
  }
});
