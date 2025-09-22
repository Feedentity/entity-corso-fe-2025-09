
app.controller("listaFioriCtrl",function($scope,serviceListaFiori) {//creo il controller principale per la pagina
    $scope.datiFiori = [];
    $scope.datiFiori = serviceListaFiori.getFiori();

    $scope.newFiore = {}
    $scope.idFiori = {}

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
   /* if (!idDaCancellare) {
        console.warn('ID non fornito. Inserisci un ID valido.');
        return;
    }
    serviceListaFiori.deleteFiori({ id: idDaCancellare }).then(function(response){
        const index = $scope.datiFiori.findIndex(fiore => fiore.id == idDaCancellare);
        if (index !== -1) {
            $scope.datiFiori.splice(index, 1);
            console.log('Cancellato correttamente dalla view.');
        } 
    }).catch(function(error){
        console.error('Errore durante la cancellazione del fiore:', error);
    }); */
};  

});

