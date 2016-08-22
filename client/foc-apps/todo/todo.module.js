import template from './todo.html';
(function ()
{
    'use strict';

    angular
        .module('app.todo', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.to-do', {
            url      : '/to-do',
            views    : {
                'content@app': {
                    template,
                    controller : 'TodoController as vm'
                }
            },
            resolve  : {
                Tasks: function (msApi)
                {
                    return msApi.resolve('todo.tasks@get');
                },
                Tags : function (msApi)
                {
                    return msApi.resolve('todo.tags@get');
                }
            },
            bodyClass: 'todo'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('assets/locale/todo');

        // Api
        msApiProvider.register('todo.tasks', ['app/data/todo/tasks.json']);
        msApiProvider.register('todo.tags', ['app/data/todo/tags.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('to-do', {
            title : 'To-Do',
            icon  : 'icon-checkbox-marked',
            state : 'app.to-do',
            badge : {
                content: 3,
                color  : '#FF6F00'
            },
            weight: 9
        });
    }

})();
