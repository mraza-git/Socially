import template from './dashboard-analytics.html';



(function ()
{
    'use strict';

    angular
        .module('app.dashboards.analytics', [


        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider,msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.dashboards_analytics', {
            url      : '/dashboard-analytics',
            views    : {
                'content@app': {
                    template,
                    controller : 'DashboardAnalyticsController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.analytics@get');
                }
            },
            bodyClass: 'dashboard-analytics'
        });

        // Api
        msApiProvider.register('dashboard.analytics', ['app/data/dashboard/analytics/data.json']);

        msNavigationServiceProvider.saveItem('dashboard', {
          state: 'app.dashboards_analytics',
          title : 'Dashboard',
          icon  : 'icon-tile-four',
          weight: 1
      });




    }

})();
