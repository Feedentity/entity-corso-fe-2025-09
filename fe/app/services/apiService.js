(function () {
  'use strict';

  angular
    .module('app')
    .factory('apiService', ['$q', function ($q) {
      // Service mock: simula una chiamata async
      var mockData = [
        { text: 'Prova AngularJS v1' },
        { text: 'Componente semplice' }
      ];

      function list() {
        var d = $q.defer();
        setTimeout(function () { d.resolve(angular.copy(mockData)); }, 200);
        return d.promise;
      }

      return { list: list };
    }]);

})();