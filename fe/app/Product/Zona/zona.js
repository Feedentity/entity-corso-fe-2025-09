app.directive("zoneCimitero", function() {
    return {
        scope:{
            zona:"<z",
            actions:"<a" 
        },
        restrict : "A",
        template : `
            <td>{{zona.nome}}</td>
            <td>{{zona.capienza}}</td>
            <td>{{zona.capienza - zona.listaTombe.length}}</td>
            <td>{{zona.descrizione}}</td>
            <td>{{zona.sovrapprezzo}}%</td>
            <td>
                <button type='submit' ng-click='!actions.removeZona(zona)'>Elimina</button>
                <button type='submit' ng-if='!actions.edit' ng-click='!actions.editZona()'>Modifica</button>
                <button type='submit' ng-if='actions.edit' ng-click='!actions.saveZona(zona)'>Salva</button>
            </td>
        `
    }
});

app.controller("zonaCtrl", function($scope, zoneService) {
    $scope.zoneTombe = [];

    $scope.edit=false;

    $scope.zoneTombe = zoneService.getZone();
    
    $scope.newZona ={}

    $scope.azioni = $scope

    $scope.submitZona = function() {
        zoneService.createZona($scope.newZona).then(function(response) {
            $scope.zoneTombe.push(response.data)
        });

        $scope.newTomba={};
    }

    $scope.removeZona = function(zona) {
        let i = $scope.zoneTombe.indexOf(zona);
        zoneService.deleteZona(zona).then(function(){
            $scope.zoneTombe.splice(i, 1);
        })
    }

    $scope.editZona = function() {
        $scope.edit = true;  
    }

    $scope.saveZona = function(zona) {
        let i = $scope.zoneTombe.indexOf(zona);
        zoneService.updateZona(zona)
        $scope.zoneTombe[i] = zona;
        $scope.edit = false;
    }
});

app.service("zoneService", function($resource){
    var resources = $resource('http://localhost:4000/zone/:id', {id: '@id'}, 
    {
        update: {method: 'PUT'}
    }
   )

    this.getZone = function(){
        return resources.query();
    }

    this.createZona = function(zona) {
        return resources.save(zona).$promise
    }

    this.deleteZona = function(zona) {
        return resources.delete(zona).$promise;
    }

    this.updateZona = function(zona) {
        return resources.update({id: zona.id}, zona).$promise
    }
});