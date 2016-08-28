import './profile.module.js';
import {Thumbs96} from '../../../imports/api/images';
import {Meteor} from 'meteor/meteor';
(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($scope, $reactive, $stateParams, Timeline, About, PhotosVideos)
    {
      'ngInject';
        var vm = this;
        $reactive(vm).attach($scope);
        vm.userid = $stateParams.userId?$stateParams.userId:Meteor.userId();

        vm.subscribe('adminusers');
        vm.subscribe('thumbs96',()=>[[vm.getReactively('user.profile.dpImageId',true)] || [] ]);

        vm.helpers({
            user: function() {
              return Meteor.users.findOne({
                _id: vm.getReactively('userid')
              });
            },
            thumbs(){
              return Thumbs96.find({
                    originalId:{
                      $in: [this.getReactively('user.profile.dpImageId',true)] || []
                  }
                });
            }
          });


        vm.posts = Timeline.posts;
        vm.activities = Timeline.activities;
        vm.about = About.data;
        vm.photosVideos = PhotosVideos.data;

        // Methods

        //////////
    }

})();
