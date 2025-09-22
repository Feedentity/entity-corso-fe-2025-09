
app.controller('signUpCtrl', function ($scope, signupService, navigation, validazioneForm) {
    $scope.newUser = {};
    $scope.Users = [];
    $scope.Users = signupService.getUsers();

    $scope.submitUser = function () {
        $scope.newUser.email = $scope.newUser.email || '';
        $scope.newUser.password = $scope.newUser.password || '';
        $scope.newUser.dataNascita = $scope.newUser.dataNascita || '';
        if (!validazioneForm($scope.newUser.email, $scope.newUser.password)) return;
        $scope.newUser.dataMorte = '';
        $scope.newUser.isAdmin = false;
        signupService.createUser($scope.newUser).then(function (response) {
            $scope.Users.push(response.data);

            navigation.goLogin()
        });

        $scope.newUser = {};
    }
});

app.service('signupService', function ($resource) {
    var resources = $resource('http://localhost:4000/users/:id', { id: '@id' },
        {
            update: { method: 'PUT' }
        })

    this.getUsers = function () {
        return resources.query();
    }

    this.createUser = function (user) {
        return resources.save(user).$promise;
    }
})

app.factory('validazioneForm', function () {
    

    function validatePass(password) {
        var y = 0;

        //controllo se sono presenti numeri
        var check1 = /[0-9]/;
        if (check1.test(password)) {
            y += 1;
        }

        //controllo se sono presenti lettere minuscole
        var check2 = /[a-z]/;
        if (check2.test(password)) {
            y += 1;
        }

        //controllo se sono presenti letterer maiuscole
        var check3 = /[A-Z]/;
        if (check3.test(password)) {
            y += 1;
        }

        //controllo se sono presenti caratteri speciali
        var check4 = /[$-/:-?{-~!"^_`\[\]]/;
        if (check4.test(password)) {
            y += 1;
        }

        //controllo sulla lunghezza della password
        if (password.length >= 4) {
            y += 1;
        }

        if (y < 5) {
            return false;
        }
        return true;
    }

    return function (email, password) {
        if (email == "") {
            alert("Inserire un nome valido!");
            return false;
        }

        if (!validatePass(password)) {
            alert("Inserire una password valida");
            return false;
        }
        return true;
    }
})