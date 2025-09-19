app.controller("listaFioriCtrl",function($scope,serviceListaFiori) {//creo il controller principale per la pagina

    $scope.listaFiori = [];//creo una lista 
    $scope.listaFiori = serviceListaFiori.oggetto;//all'interno della lista inserisco i dati dell back end mandati dall service

});

