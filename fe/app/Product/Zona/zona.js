app.directive("zoneCimitero", function() {
    return {
        scope:{
            zona:"<z"
        },
        restrict : "A",
        template : `
            <td>{{zona.nome}}</td>
            <td>{{zona.capienza}}</td>
            <td>{{zona.capienza - zona.listaTombe.length}}</td>
            <td>{{zona.descrizione}}</td>
            <td>{{zona.sovrapprezzo}}%</td>
        `
    }
})

app.controller("zonaCtrl", function($scope, zoneService) {
    $scope.zone = [];
    zoneService.getZone().then (function(response) {
    $scope.zone = response.data.zone;
    }
)
})

app.service("zoneService", function($http){
    this.getZone = function() {
        return $http.get("/be/db.json");
    }
})