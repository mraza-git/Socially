import template from './dashboard-analytics.html';
import 'angular-simple-logger';
import 'angular-google-maps';
import 'nvd3';
import 'angular-nvd3';
import 'nvd3/build/nv.d3.css';



(function ()
{
    'use strict';

    angular
        .module('app.dashboards.analytics', [
          'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
          'uiGmapgoogle-maps',
           'nvd3',

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
