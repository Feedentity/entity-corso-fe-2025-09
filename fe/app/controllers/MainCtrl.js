(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', ['apiService', function (apiService) {
      var vm = this;
      vm.title = 'Home';
      vm.items = [];

      vm.add = function () {
        if (!vm.newItem) return;
        vm.items.push({ text: vm.newItem });
        vm.newItem = '';
      };

      // Esempio "fetch" dal service (mock)
      vm.load = function () {
        apiService.list().then(function (data) {
          vm.items = data;
        });
      };

      vm.load();
    }]);

})();