app.controller("shopTombaController",function ($scope, datiTombe, inserimentoTomba) {
    $scope.tombe = [];
    datiTombe.getDati().then(function (response) {
      $scope.tombe = response.data;
    });
    //var x=utente.getUser().id;
    //alert(x);
    $scope.newTomba = {};
    $scope.scelte = function() {scelte($scope.newTomba)};
    function scelte(newTomba) {
      let prezzo =0;  
      var vId=0;
      var zId=0;
      let x = document.getElementById("dati");
      let versione = x.version.value;
      let zona = x.zone.value;
      let descrizione = x.descrizione.value;
      newTomba.descrizione = descrizione;
      if (versione == "luxury") {
        prezzo += 1500;
        vId = 1;
        newTomba.versione_id = vId;
        
        if (zona == "A") {
          prezzo = prezzo * (1 + 5 / 100);
          x.Prezzo.value = prezzo;
          zId=1;
          newTomba.zona_id = zId;
        } else if (zona == "B") {
          prezzo = prezzo * (1 + 3 / 100);
          x.Prezzo.value = prezzo;
          zId=2;
          newTomba.zona_id = zId;
        } else {
          prezzo = prezzo * (1 + 3 / 100);
          x.Prezzo.value = prezzo;
          zId=3;
          newTomba.zona_id = zId;
        }
      } 
      else if (versione == "Business") {
        prezzo += 1000;
        vId = 2;
        newTomba.versione_id = vId;
        
        if (zona == "A") {
          prezzo = prezzo * (1 + 5 / 100);
          x.Prezzo.value = prezzo;
          zId=1;
          newTomba.zona_id = zId;
        } else if (zona == "B") {
          prezzo = prezzo * (1 + 3 / 100);
          x.Prezzo.value = prezzo;
          zId=2;
          newTomba.zona_id = zId;
        } else {
          prezzo = prezzo * (1 + 3 / 100);
          zId=3;
          newTomba.zona_id = zId;
          x.Prezzo.value = prezzo;
        }
      } 
      else if (versione=="Economy"){
        prezzo += 600;
        vId = 3;
        newTomba.versione_id = vId;
        
        if (zona == "A") {
          prezzo = prezzo * (1 + 5 / 100);
          x.Prezzo.value = prezzo;
          zId=1;
          newTomba.zona_id = zId;
        } else if (zona == "B") {
          prezzo = prezzo * (1 + 3 / 100);
          x.Prezzo.value = prezzo;
          zId=2;
          newTomba.zona_id = zId;
        } else {
          prezzo = prezzo * (1 + 3 / 100);
          x.Prezzo.value = prezzo;
          zId=3;
          newTomba.zona_id = zId;
        }
      }
      alert(newTomba.descrizione+newTomba.versione_id+newTomba.zona_id);
    
    }

    $scope.submitTomba = function () {
      inserimentoTomba.createTomba($scope.newTomba);
      $scope.newTomba = "";
      alert("tomba inserita");
    };
  }
);
//funzione che prende tramite http i dati dal db
app.service("datiTombe", function ($http) {
  this.getDati = function () {
    return $http.get("/be/db.json").then(function (response) {
      return response;
    });
  };
});
//diretiva per creare il template della selezione delle versioni
app.directive("myVersion", function () {
  return {
    template: `
        <select id="version" >
            <option value="luxury">{{tombe.versioneTombe[0].nome}}</option>
            <option value="Business">{{tombe.versioneTombe[1].nome}}</option>
            <option value="Economy">{{tombe.versioneTombe[2].nome}}</option>
         </select>   `,
  };
});
app.directive("myZone", function () {
  return {
    template: `
        <select id="zone">
            <option value="A"> Zona {{tombe.zone[0].nome}}</option>
            <option value="B">Zona {{tombe.zone[1].nome}}</option>
            <option value="C">Zona {{tombe.zone[2].nome}}</option>
         </select>   `,
  };
});
app.service("inserimentoTomba", function ($resource) {
  var resources = $resource("http://localhost:4000/tombe/:id", { id: "@id" });
  this.createTomba = function (tomba) {
    return resources.save(tomba).$promise;
  };
});