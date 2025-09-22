app.controller(
  "shopTombaController",
  function ($scope, datiTombe, inserimentoTomba, prezzoTomba, sovraprezzo) {
    //scope per avere i dati delle tombe
    $scope.tombe = [];
    datiTombe.getDati().then(function (response) {
      $scope.tombe = response.data;
    });
    //scope per avere i prezzi delle varie versioni
    $scope.prezzi = [];
    prezzoTomba.getDati().then(function (response) {
      $scope.prezzi = response;
    });
    //scope per avere il sovraprezzo delle zone
    $scope.sovraprezzo = [];
    sovraprezzo.getDati().then(function (response) {
      $scope.sovraprezzo = response;
    });

    $scope.newTomba = {};
    //funzione per prendere i dati e stampare il costo
    $scope.scelte = function () {
      scelte($scope.newTomba, $scope.tombe, $scope.prezzi, $scope.sovraprezzo);
    };
    function scelte(newTomba) {
      let x = document.getElementById("dati");
      let versioneId = x.version.value;
      let zonaId = x.zona.value;
      let descrizione = x.descrizione.value;
      var prezzo = $scope.prezzi[versioneId - 1].prezzo;
      var sovraprezzo = $scope.sovraprezzo[zonaId - 1].sovrapprezzo;
      x.Prezzo.value = prezzo * (1 + sovraprezzo / 100)+" €";
      newTomba.descrizione = descrizione;
      newTomba.versione_id = versioneId;
      newTomba.zona_id = zonaId;
    }
    //submit per mandare al backend i dati e memorizzare
      $scope.submitTomba = function () {
        inserimentoTomba.createTomba($scope.newTomba);
        $scope.newTomba = "";
        alert("tomba inserita");s
      };
    }
);

// service che prende i dati
app.service("datiTombe", function ($http) {
  this.getDati = function () {
    return $http.get("/be/db.json").then(function (response) {
      return response.data; // meglio restituire direttamente i dati
    });
  };
});

// direttiva
app.directive("myVersion", function (datiTombe) {
  return {
    restrict: "E",
    scope: {},
    template: `
      <select id="version" ng-model="selectedVersion">
        <option ng-repeat="versione in tombe.versioneTombe" 
                value="{{versione.id}}">
          {{versione.nome}}
        </option>
      </select>
    `,
    link: function (scope) {
      datiTombe.getDati().then(function (data) {
        scope.tombe = data; // qui mettiamo i dati presi dal db
      });
    },
  };
});
app.directive("myZone", function (datiTombe) {
  return {
    restrict: "E",
    scope: {},
    template: `
      <select id="zona" ng-model="selectedVersion">
        <option ng-repeat="zona in tombe.zone" 
                value="{{zona.id}}">
         Zona {{zona.nome}}
        </option>
      </select>
    `,
    link: function (scope) {
      datiTombe.getDati().then(function (data) {
        scope.tombe = data; // qui mettiamo i dati presi dal db
      });
    },
  };
});
app.service("inserimentoTomba", function ($resource) {
  var resources = $resource("http://localhost:4000/tombe/:id", { id: "@id" });
  this.createTomba = function (tomba) {
    return resources.save(tomba).$promise;
  };
});
app.service("prezzoTomba", function ($resource) {
  var resources = $resource(
    "http://localhost:4000/versioneTombe/:id",
    { id: "@id" },
    {
      update: { method: "PUT" },
    }
  );

  this.getDati = function () {
    return resources.query().$promise;
  };
});
app.service("sovraprezzo", function ($resource) {
  var resources = $resource(
    "http://localhost:4000/zone/:id",
    { id: "@id" },
    {
      update: { method: "PUT" },
    }
  );

  this.getDati = function () {
    return resources.query().$promise;
  };
});
