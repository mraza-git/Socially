import template from './coming-soon.html';
import mainTemplate from '../../fuse/core/layouts/content-only.html';

(function ()
{
    'use strict';

    angular
        .module('app.coming-soon', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_coming-soon', {
            url      : '/pages/coming-soon',
            views    : {
                'main@'                        : {
                    template : mainTemplate,
                    controller : 'MainController as vm'
                },
                'content@app.pages_coming-soon': {
                    template : template,
                    controller : 'ComingSoonController as vm'
                }
            },
            bodyClass: 'coming-soon'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('assets/locale/coming-soon');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.coming-soon', {
            title : 'Coming Soon',
            icon  : 'icon-alarm-check',
            state : 'app.pages_coming-soon',
            weight: 2
        });
    }

})();
