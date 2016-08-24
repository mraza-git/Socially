import dashboardTemplate from './views/dashboard/dashboard.html';
import leadsTemplate from './views/leads/leads.html';
import leadTemplate from './views/lead/lead.html';
import myleadsTemplate from './views/myleads/myleads.html';
import myleadTemplate from './views/mylead/mylead.html';
import ordersTemplate from './views/orders/orders.html';
import orderTemplate from './views/order/order.html';
import myQuotesTemplate from './views/myquotes/myquotes.html';
import myQuoteTemplate from './views/myquote/myquote.html';

(function ()
{
    'use strict';

    angular
        .module('app.projects',
            [
                'flow'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.projects', {
                abstract: true,
                url     : '/projects'
            })
            .state('app.projects.dashboard', {
                url      : '/dashboard',
                views    : {
                    'content@app': {
                        template   : dashboardTemplate,
                        controller : 'DashboardEcommerceController as vm'
                    }
                },
                resolve  : {
                    Dashboard: function (msApi)
                    {
                        return msApi.resolve('e-commerce.dashboard@get');
                    },
                    DashboardData: function (msApi)
                    {
                        return msApi.resolve('dashboard.analytics@get');
                    }
                },
                bodyClass: 'ecommerce'
            })
            .state('app.projects.leads', {
                url      : '/leads',
                views    : {
                    'content@app': {
                        template: leadsTemplate,
                        controller : 'ProductsController as vm'
                    }
                },
                resolve  : {
                    Products: function (msApi)
                    {
                        return msApi.resolve('e-commerce.products@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.projects.leads.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        template   : leadTemplate,
                        controller : 'ProductController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('e-commerce.product@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // My leads
            .state('app.projects.myleads', {
                url      : '/myleads',
                views    : {
                    'content@app': {
                        template: myleadsTemplate,
                        controller : 'MyLeadsController as vm'
                    }
                },
                resolve  : {
                    Products: function (msApi)
                    {
                        return msApi.resolve('e-commerce.products@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.projects.myleads.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        template   : myleadTemplate,
                        controller : 'MyLeadController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('e-commerce.product@get');
                    },
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },

                },
                bodyClass: 'e-commerce'
            })
            // My leads End
            // My Quotes start
            .state('app.projects.myquotes', {
                url      : '/myquotes',
                views    : {
                    'content@app': {
                        template   : myQuotesTemplate,
                        controller : 'MyQuotesController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('e-commerce.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.projects.myquotes.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        template   : myQuoteTemplate,
                        controller : 'MyQuoteController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            // My Quotes END

            .state('app.projects.orders', {
                url      : '/orders',
                views    : {
                    'content@app': {
                        template   : ordersTemplate,
                        controller : 'OrdersController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('e-commerce.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.projects.orders.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        template   : orderTemplate,
                        controller : 'OrderController as vm'
                    }
                },
                resolve  : {
                    Order   : function (msApi)
                    {
                        return msApi.resolve('e-commerce.order@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('e-commerce.statuses@get');
                    }
                },
                bodyClass: 'e-commerce'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('assets/locale/projects');

        // Api
        msApiProvider.register('e-commerce.dashboard', ['app/data/e-commerce/dashboard.json']);
        msApiProvider.register('dashboard.analytics', ['app/data/dashboard/analytics/data.json']);
        msApiProvider.register('e-commerce.products', ['app/data/e-commerce/products.json']);
        msApiProvider.register('e-commerce.product', ['app/data/e-commerce/product.json']);
        msApiProvider.register('e-commerce.orders', ['app/data/e-commerce/orders.json']);
        msApiProvider.register('e-commerce.statuses', ['app/data/e-commerce/statuses.json']);
        msApiProvider.register('e-commerce.order', ['app/data/e-commerce/order.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('projects', {
            title : 'Projects',
            icon  : 'icon-cart',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('projects.dashboard', {
            title: 'Dashboard',
            state: 'app.projects.dashboard'
        });

        msNavigationServiceProvider.saveItem('projects.leads', {
            title: 'Leads',
            state: 'app.projects.leads'
        });

        msNavigationServiceProvider.saveItem('projects.myleads', {
            title: 'My Leads',
            state: 'app.projects.myleads'
        });

        msNavigationServiceProvider.saveItem('projects.myquotes', {
            title: 'My Quotes',
            state: 'app.projects.myquotes'
        });

        msNavigationServiceProvider.saveItem('projects.orders', {
            title: 'Orders',
            state: 'app.projects.orders'
        });
    }
})();
