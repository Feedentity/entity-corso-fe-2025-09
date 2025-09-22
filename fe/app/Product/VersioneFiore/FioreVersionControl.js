
app.controller("listaFioriCtrl",function($scope,serviceListaFiori) {//creo il controller principale per la pagina
    $scope.datiFiori = [];
    
    $scope.edit=false;

    $scope.datiFiori = serviceListaFiori.getFiori();

    $scope.newFiore = {}

    $scope.submitFiore = function(){
        serviceListaFiori.createFiori($scope.newFiore).then(function(response){
            $scope.datiFiori.push(response.data)
        })
    }
    $scope.cancella = function(fiore){
        var idDaCancellare = $scope.datiFiori.indexOf(fiore);
        serviceListaFiori.deleteFiori(fiore).then(function(){
            $scope.datiFiori.splice(idDaCancellare, 1)
    })
    };  
    $scope.editFiori = function (){
        $scope.edit = true;  
    }

    $scope.saveFiore = function(fiore){
        let i = $scope.datiFiori.indexOf(fiore);
        serviceListaFiori.updateFiori(fiore)
        $scope.datiFiori[i] = fiore;
        $scope.edit = false;
    }

});

