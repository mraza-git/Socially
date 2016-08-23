import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import {name as About} from './tabs/about/about';
import {name as PhotosVideos} from './tabs/photos-videos/photos-videos';
import {name as TimeLine} from './tabs/timeline/timeline';

import template from './profile.html';
import layoutWithoutToolbarTemplate from '../../fuse/core/layouts/content-only.html';
import layoutWithToolbarTemplate from '../../fuse/core/layouts/content-with-toolbar.html';

(function ()
{
    'use strict';

    angular
        .module('app.pages.profile', [
          angularMeteor,
          About,
          PhotosVideos,
          TimeLine,
        ])
        .run(run)
        .config(config);

    function run(editableOptions,editableThemes){
        /** @ngInject */
         editableThemes['angular-material'] = {
            formTpl:      '<form class="editable-wrap"></form>',
            noformTpl:    '<span class="editable-wrap"></span>',
            controlsTpl:  '<md-input-container class="editable-controls" ng-class="{\'md-input-invalid\': $error}"></md-input-container>',
            inputTpl:     '',
            errorTpl:     '<div ng-messages="{message: $error}"><div class="editable-error" ng-message="message">{{$error}}</div></div>',
            buttonsTpl:   '<span class="editable-buttons"></span>',
            submitTpl:    '<md-button type="submit" class="md-primary">save</md-button>',
            cancelTpl:    '<md-button type="button" class="md-warn" ng-click="$form.$cancel()">cancel</md-button>'
        };

        editableOptions.theme = 'angular-material';
    }


    /** @ngInject */
    function config($stateProvider,  $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {




        $stateProvider.state('app.pages_profile', {
            url      : '/pages/profile/:userId',
            views:{
              'content@app.pages_profile': {
                  template: template,
                  controller : 'ProfileController as vm'
                },
                'main@' : {
                  template: layoutWithoutToolbarTemplate,
                  controller : 'MainController as vm'
                }
            },
            // views    :  {
            //                 function($stateParams){
            //                   if ($stateParams.userId){
            //                     console.log("without content@app.pages_profile");
            //                     return {
            //                       'content@app.pages_profile': {
            //                         template: template,
            //                         controller : 'ProfileController as vm'
            //                       },
            //                       'main@' : {
            //                         template: layoutWithoutToolbarTemplate,
            //                         controller : 'MainController as vm'
            //                       }
            //                     }
            //                   }
            //                   else {
            //                     console.log("content@app");
            //                     return {
            //                       'content@app': {
            //                         template: template,
            //                         controller : 'ProfileController as vm'
            //                       }
            //                     }
            //                   }
            //                 }
            //               },
            resolve  : {
                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
                PhotosVideos: function (msApi)
                {
                    return msApi.resolve('profile.photosVideos@get');
                }

            },
            bodyClass: 'boxed'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('assets/locale/profile');

        // Api
        msApiProvider.register('profile.timeline', ['app/data/profile/timeline.json']);
        msApiProvider.register('profile.about', ['app/data/profile/about.json']);
        msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('profile', {
            title : 'Profile',
            icon  : 'icon-account',
            state : 'app.pages_profile({userId:""})',
            weight: 6
        });
    }

})();
