import sampleTemplate from './sample.html';

'use strict';

angular
    .module('app.sample', [])
    .config(config);

/** @ngInject */
function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
{
    // State
    $stateProvider
        .state('app.sample', {
            url    : '/sample',
            views  : {
                'content@app': {
                    template: sampleTemplate,
                    controller : 'SampleController as vm'
                }
            },
            resolve: {
                SampleData: function (msApi)
                {
                    return msApi.resolve('sample@get');
                }
            }
        });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/sample');

    // Api
    msApiProvider.register('sample', ['app/data/sample/sample.json']);

    // // Navigation
    // msNavigationServiceProvider.saveItem('fuse', {
    //     title : 'SAMPLE',
    //     group : true,
    //     weight: 1
    // });

    msNavigationServiceProvider.saveItem('fuse.sample', {
        title    : 'Sample',
        icon     : 'icon-tile-four',
        state    : 'app.sample',
        /*stateParams: {
            'param1': 'page'
         },*/
        translate: 'SAMPLE.SAMPLE_NAV',
        weight   : 1
    });
}


angular
    .module('app.sample')
    .controller('SampleController', SampleController);

/** @ngInject */
function SampleController(SampleData)
{
    var vm = this;

    // Data
    vm.helloText = "Hello from Sample Controller";

    // Methods

    //////////
}
