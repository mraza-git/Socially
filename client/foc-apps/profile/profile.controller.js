import './profile.module.js';
(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($scope, $reactive, $stateParams, Timeline, About, PhotosVideos)
    {
        var vm = this;
        $reactive(vm).attach($scope);
        vm.userid = $stateParams.userId?$stateParams.userId:Meteor.userId();

        vm.subscribe('adminusers');
        vm.helpers({
            user: function() {
              return Meteor.users.findOne({
                _id: vm.getReactively('userid')
              });
            },
          });


        vm.posts = Timeline.posts;
        vm.activities = Timeline.activities;
        vm.about = About.data;
        vm.photosVideos = PhotosVideos.data;

        // Methods

        //////////
    }

})();
