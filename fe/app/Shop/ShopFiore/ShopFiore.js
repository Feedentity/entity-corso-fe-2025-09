// Questo controller gestisce tutto quello che succede nella pagina del negozio di fiori
app.controller("ShopFioreCtrl", function ($scope, ShopFioreService) {
    
  // Inizializziamo le variabili
  $scope.fiori = [];
  $scope.carrello = [];
  $scope.mostraCarrello = false;
  $scope.newFiore = {};

  $scope.acquisto = function() {
    ShopFioreService.buyFiore($scope.newFiore).then(function(response) {
      $scope.fiori.push(response.data);
    });
    $scope.newFiore = {};
  }

  ShopFioreService.getFiori().then(function(response) {
    $scope.fiori = response; 
  });

  // Funzione per aggiungere un fiore al carrello
  $scope.AggiungiAlCarrello = function (fiore) {
    
    var fioreEsistente = $scope.carrello.find(function (item) {
      return item.nome === fiore.nome;
    });

    if (fioreEsistente) {
      fioreEsistente.quantita = fioreEsistente.quantita + 1;
    } else {
      $scope.carrello.push({
        nome: fiore.nome,
        descrizione: fiore.descrizione,
        prezzo: fiore.prezzo,
        quantita: 1,
      });
    }
  };

  // Funzione per mostrare/nascondere il carrello
  $scope.ToggleCarrello = function () {
    $scope.mostraCarrello = !$scope.mostraCarrello;
  };

  // Funzione per rimuovere un fiore dal carrello
  $scope.RimuoviDalCarrello = function (index) {
    $scope.carrello.splice(index, 1);
  };

  // Funzione per calcolare il totale del carrello
  $scope.CalcolaTotale = function () {
    var totale = 0;
    for (var i = 0; i < $scope.carrello.length; i++) {
      totale = totale + ($scope.carrello[i].prezzo * $scope.carrello[i].quantita);
    }
    
    return totale;
  };

  // Funzione per acquistare il carrello
  $scope.AcquistaCarrello = function () {
    ShopFioreService.acquistaCarrello($scope.carrello).then(function(response) {
      $scope.carrello = [];
      $scope.mostraCarrello = false;
    });
  };
});

app.service("ShopFioreService", function ($resource) {
  var resources = $resource(
    "http://localhost:4000/tipoFiori/:id",
    { id: "@id" },
    {
      update: { method: "PUT" },
    }
  );
  
  var ordineResource = $resource(
    "http://localhost:4000/shopFiori",
    {},
    {
      save: { method: "POST" }
    }
  );
  
  // Funzione per prendere TUTTI i fiori dal database
  this.getFiori = function () {
    return resources.query().$promise;
  };
  
  this.buyFiore = function (fiore) {
    return resources.save(fiore).$promise;
  }
  
  // Funzione per acquistare il carrello
  this.acquistaCarrello = function (ordini) {
    return ordineResource.save({ ordini: ordini }).$promise;
  };
});