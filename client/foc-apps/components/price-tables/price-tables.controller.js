import "./price-tables.module.js";

(function ()
{
    'use strict';

    angular
        .module('app.components.price-tables')
        .controller('PriceTablesController', PriceTablesController);

    /** @ngInject */
    function PriceTablesController($scope)
    {
      var vm = this;
      vm.credits = 0;
      vm.amount = 0;
        // Data

        // Methods
        vm.change = function(){
          vm.rate = 3.68;
          vm.inLocalCurrency = vm.credits * vm.rate;
          vm.amount = parseInt(vm.inLocalCurrency);
        }
        //////////
    }

})();
