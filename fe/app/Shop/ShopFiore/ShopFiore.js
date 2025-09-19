// Controller che gestisce la pagina ShopFiore
app.controller("ShopFioreCtrl", function ($scope, ShopFioreService) {
  $scope.fiori = [];

  ShopFioreService.getDati().then(function (response) {
    $scope.fiori = response.data.tipoFiori;
  });

  $scope.AggiungiAlCarrello = function () {
    console.log("Aggiungi al carrello");
  };
});

// Service che gestisce le operazioni di accesso al database
app.service("ShopFioreService", function ($http) {
  this.getDati = function () {
    return $http.get("/be/db.json")
    }});
