app.controller('loginCtrl', function ($scope, utente, $location, $timeout) {
    $scope.user = {};

    $scope.redirectSignUp = function () {
        $location.path("/signup");
    }

    $scope.goToHome = function () {
        utente.login($scope.user.email || '', $scope.user.pass || '');
        $timeout(function () {
            if (utente.isLoggedIn())
                $location.path('/home')
        }, 200)

    };
})

//funzione per mostrare/nascondere la password
function showPswd() {
    var input = document.getElementById('pswd');
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}