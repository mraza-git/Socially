import '../../projects.module.js';
(function ()
{
    'use strict';

    angular
        .module('app.projects')
        .controller('DashboardEcommerceController', DashboardEcommerceController);

    /** @ngInject */
    function DashboardEcommerceController(Dashboard,DashboardData,uiGmapGoogleMapApi )
    {
        var vm = this;

        // Data
        vm.dashboardData = DashboardData;
        vm.dashboard = Dashboard;

        vm.widget1 = vm.dashboard.widget1;
        vm.widget2 = vm.dashboard.widget2;
        vm.widget3 = vm.dashboard.widget3;
        vm.widget4 = vm.dashboard.widget4;
        vm.widget5 = {
            title       : vm.dashboard.widget5.title,
            mainChart   : {
                config : {
                    refreshDataOnly: true,
                    deepWatchData  : true
                },
                options: {
                    chart: {
                        type        : 'multiBarChart',
                        color       : ['#03a9f4', '#b3e5fc'],
                        height      : 420,
                        margin      : {
                            top   : 8,
                            right : 16,
                            bottom: 32,
                            left  : 32
                        },
                        clipEdge    : true,
                        groupSpacing: 0.3,
                        reduceXTicks: false,
                        stacked     : true,
                        duration    : 250,
                        x           : function (d)
                        {
                            return d.x;
                        },
                        y           : function (d)
                        {
                            return d.y;
                        },
                        yAxis       : {
                            tickFormat: function (d)
                            {
                                return d;
                            }
                        },
                        legend      : {
                            margin: {
                                top   : 8,
                                bottom: 32
                            }
                        },
                        controls    : {
                            margin: {
                                top   : 8,
                                bottom: 32
                            }
                        },
                        tooltip     : {
                            gravity: 's',
                            classes: 'gravity-s'
                        }
                    }
                },
                data   : []
            },
            days        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            ranges      : vm.dashboard.widget5.ranges,
            currentRange: '',
            changeRange : function (range)
            {
                vm.widget5.currentRange = range;

                /**
                 * Update main chart data by iterating through the
                 * chart dataset and separately adding every single
                 * dataset by hand.
                 *
                 * You MUST NOT swap the entire data object by doing
                 * something similar to this:
                 * vm.widget.mainChart.data = chartData
                 *
                 * It would be easier but it won't work with the
                 * live updating / animated charts due to how d3
                 * works.
                 *
                 * If you don't need animated / live updating charts,
                 * you can simplify these greatly.
                 */
                angular.forEach(vm.dashboard.widget5.mainChart, function (chartData, index)
                {
                    vm.widget5.mainChart.data[index] = {
                        key   : chartData.key,
                        values: chartData.values[range]
                    };
                });
            },
            init        : function ()
            {
                // Run this function once to initialize widget

                /**
                 * Update the range for the first time
                 */
                vm.widget5.changeRange('TW');
            }
        };

        // Widget 6
        vm.widget6 = {
            title       : vm.dashboard.widget6.title,
            mainChart   : {
                config : {
                    refreshDataOnly: true,
                    deepWatchData  : true
                },
                options: {
                    chart: {
                        type        : 'pieChart',
                        color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
                        height      : 400,
                        margin      : {
                            top   : 0,
                            right : 0,
                            bottom: 0,
                            left  : 0
                        },
                        donut       : true,
                        clipEdge    : true,
                        cornerRadius: 0,
                        labelType   : 'percent',
                        padAngle    : 0.02,
                        x           : function (d)
                        {
                            return d.label;
                        },
                        y           : function (d)
                        {
                            return d.value;
                        },
                        tooltip     : {
                            gravity: 's',
                            classes: 'gravity-s'
                        }
                    }
                },
                data   : []
            },
            footerLeft  : vm.dashboard.widget6.footerLeft,
            footerRight : vm.dashboard.widget6.footerRight,
            ranges      : vm.dashboard.widget6.ranges,
            currentRange: '',
            changeRange : function (range)
            {
                vm.widget6.currentRange = range;

                /**
                 * Update main chart data by iterating through the
                 * chart dataset and separately adding every single
                 * dataset by hand.
                 *
                 * You MUST NOT swap the entire data object by doing
                 * something similar to this:
                 * vm.widget.mainChart.data = chartData
                 *
                 * It would be easier but it won't work with the
                 * live updating / animated charts due to how d3
                 * works.
                 *
                 * If you don't need animated / live updating charts,
                 * you can simplify these greatly.
                 */
                angular.forEach(vm.dashboard.widget6.mainChart, function (data, index)
                {
                    vm.widget6.mainChart.data[index] = {
                        label: data.label,
                        value: data.values[range]
                    };
                });
            },
            init        : function ()
            {
                // Run this function once to initialize widget

                /**
                 * Update the range for the first time
                 */
                vm.widget6.changeRange('TW');
            }
        };

        // Widget 7
        vm.widget7 = {
            title       : vm.dashboard.widget7.title,
            ranges      : vm.dashboard.widget7.ranges,
            customers   : vm.dashboard.widget7.customers,
            currentRange: 'T'
        };

        //Widget 8
        vm.widget8 = {
            title: vm.dashboardData.widget2.title
        };

        // Methods

        //////////

        // Initialize Widget 5
        vm.widget5.init();

        // Initialize Widget 6
        vm.widget6.init();

        // Widget 8
        uiGmapGoogleMapApi.then(function ()
        {
            vm.widget8.map = vm.dashboardData.widget2.map;
        });

        // Widget 9
        vm.widget9 = {
            title       : vm.dashboardData.widget3.title,
            pages       : vm.dashboardData.widget3.pages,
            ranges      : vm.dashboardData.widget3.ranges,
            currentRange: vm.dashboardData.widget3.currentRange,
            changeRange : function (range)
            {
                vm.widget9.currentRange(range);
            }
        };

    }
})();
