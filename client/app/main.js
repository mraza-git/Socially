import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import {name as Landing} from '../landing/landing.js';
import {name as userList} from '../../imports/focui/components/admin/usermgmt/userlist.js';
import '../sample/sample.module.js';
import '../foc-apps/chat/chat.module.js';
import '../foc-apps/profile/profile.module.js';



'use strict';

/**
 * Main module of the Fuse
 */
angular
    .module('fuse', [

        // Core
        'app.core',

        // Navigation
        'app.navigation',

        // Toolbar
        'app.toolbar',

        // Quick panel
        'app.quick-panel',

        // Landing Component
        Landing,

        // Sample app
        'app.sample',

        //Admin app
        userList,

        'app.chat',

        'app.pages.profile'

    ]);


angular
    .module('fuse')
    .controller('IndexController', IndexController);

/** @ngInject */
function IndexController(fuseTheming)
{
    var vm = this;

    // Data
    vm.themes = fuseTheming.themes;

    //////////
}


angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope)
    {
        // Data

        //////////

        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }


import verticalNavigationFullwidthToolbar2_mainTemplate from '../fuse/core/layouts/vertical-navigation-fullwidth-toolbar-2.html';
import verticalNavigationFullwidthToolbar2_toolbarTemplate from '../fuse/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html';
import verticalNavigationFullwidthToolbar2_navigationTemplate from '../fuse/navigation/layouts/vertical-navigation-fullwidth-toolbar-2/navigation.html';

angular
    .module('fuse')
    .config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/sample');

    /**
     * Layout Style Switcher
     *
     * This code is here for demonstration purposes.
     * If you don't need to switch between the layout
     * styles like in the demo, you can set one manually by
     * typing the template urls into the `State definitions`
     * area and remove this code
     */
    // Inject $cookies
    var $cookies;

    angular.injector(['ngCookies']).invoke([
        '$cookies', function (_$cookies)
        {
            $cookies = _$cookies;
        }
    ]);

    // Get active layout
    var layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigationFullwidthToolbar2';

    var layouts = {
        // verticalNavigation  : {
        //     main      : 'client/fuse/core/layouts/vertical-navigation.html',
        //     toolbar   : 'client/fuse/toolbar/layouts/vertical-navigation/toolbar.html',
        //     navigation: 'client/fuse/navigation/layouts/vertical-navigation/navigation.html'
        // },
        // verticalNavigationFullwidthToolbar  : {
        //     main      : 'client/fuse/core/layouts/vertical-navigation-fullwidth-toolbar.html',
        //     toolbar   : 'client/fuse/toolbar/layouts/vertical-navigation-fullwidth-toolbar/toolbar.html',
        //     navigation: 'client/fuse/navigation/layouts/vertical-navigation/navigation.html'
        // },
        verticalNavigationFullwidthToolbar2  : {
            main      : verticalNavigationFullwidthToolbar2_mainTemplate,
            toolbar   : verticalNavigationFullwidthToolbar2_toolbarTemplate,
            navigation: verticalNavigationFullwidthToolbar2_navigationTemplate,
        },
        // horizontalNavigation: {
        //     main      : 'client/fuse/core/layouts/horizontal-navigation.html',
        //     toolbar   : 'client/fuse/toolbar/layouts/horizontal-navigation/toolbar.html',
        //     navigation: 'client/fuse/navigation/layouts/horizontal-navigation/navigation.html'
        // },
        // contentOnly         : {
        //     main      : 'client/fuse/core/layouts/content-only.html',
        //     toolbar   : '',
        //     navigation: ''
        // },
        // contentWithToolbar  : {
        //     main      : 'client/fuse/core/layouts/content-with-toolbar.html',
        //     toolbar   : 'client/fuse/toolbar/layouts/content-with-toolbar/toolbar.html',
        //     navigation: ''
        // }
    };
    // END - Layout Style Switcher

    // State definitions
    $stateProvider
        .state('app', {
            abstract: true,
            views   : {
                'main@'         : {
                    template: verticalNavigationFullwidthToolbar2_mainTemplate,
                    controller : 'MainController as vm'
                },
                'toolbar@app'   : {
                    template: verticalNavigationFullwidthToolbar2_toolbarTemplate,//layouts[layoutStyle].toolbar,
                    controller : 'ToolbarController as vm'
                },
                'navigation@app': {
                    template: verticalNavigationFullwidthToolbar2_navigationTemplate,//layouts[layoutStyle].navigation,
                    controller : 'NavigationController as vm'
                },
                // 'quickPanel@app': {
                //     templateUrl: '../fuse/quick-panel/quick-panel.html',
                //     controller : 'QuickPanelController as vm'
                // }
            }
        });
}




angular
    .module('fuse')
    .run(runBlock);

/** @ngInject */
function runBlock($rootScope, $timeout, $state)
{
    // Activate loading indicator
    var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
    {
        $rootScope.loadingProgress = true;
    });

    // De-activate loading indicator
    var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
    {
        $timeout(function ()
        {
            $rootScope.loadingProgress = false;
        });
    });

    // Store state in the root scope for easy access
    $rootScope.state = $state;

    // Cleanup
    $rootScope.$on('$destroy', function ()
    {
        stateChangeStartEvent();
        stateChangeSuccessEvent();
    });
}





const onReady = function() {
  angular.bootstrap(document, ['fuse']);
};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
