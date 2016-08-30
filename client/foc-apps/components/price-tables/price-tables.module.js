import template from './price-tables.html';
(function ()
{
    'use strict';

    angular
        .module('app.components.price-tables', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.components_price-tables', {
            url  : '/price-tables',
            views: {
                'content@app': {
                    template: template,
                    controller : 'PriceTablesController as vm'
                }
            }
        });

        msNavigationServiceProvider.saveItem('pricing', {
            title: 'Pricing',
            icon : 'icon-view-carousel',
            state: 'app.components_price-tables',
            weight: 6
        });
    }

})();
