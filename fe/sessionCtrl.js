app.controller('sessionCtrl', function ($scope, utente) {
    $scope.user = utente;
    utente.login("admin@gmail.com", "admin123")
    //utente.login("mario@gmail.com", "mario123")
})