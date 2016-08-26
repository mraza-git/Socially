import './coming-soon.module.js';

(function ()
{
    'use strict';

    angular
        .module('app.coming-soon')
        .controller('ComingSoonController', ComingSoonController);

    /** @ngInject */
    function ComingSoonController()
    {
        var vm = this;

        // Data
        vm.endTime = 1475309532000;

        // Methods

        //////////
    }
})();
