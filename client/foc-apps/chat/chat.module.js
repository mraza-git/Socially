import '../../fuse/core/core.module.js';
import chatTemplate from './chat.html';
import {name as ChatsView} from './sidenavs/left/views/chats/chats-view.js';


(function ()
{
    'use strict';

    angular
        .module('app.chat', [
          //ChatsView,
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        // State
        $stateProvider.state('app.chat', {
            url    : '/chat',
            views  : {
                'content@app': {
                    template: chatTemplate,
                    controller : 'ChatController as vm'
                }
            },
            resolve: {
                Contacts: function (msApi)
                {
                    return msApi.resolve('chat.contacts@get');
                },
                User    : function (msApi)
                {
                    return msApi.resolve('chat.user@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('assets/locale/chat');

        // Api

        // Contacts data must be alphabatically ordered.
        msApiProvider.register('chat.contacts', ['app/data/chat/contacts.json']);

        msApiProvider.register('chat.chats', ['app/data/chat/chats/:id.json']);

        msApiProvider.register('chat.user', ['app/data/chat/user.json']);


        // Navigation
        msNavigationServiceProvider.saveItem('Messages', {
            title : 'Messages',
            icon  : 'icon-hangouts',
            state : 'app.chat',
            badge : {
                content: 7,
                color  : '#09d261'
            },
            weight: 5
        });
    }

})();
