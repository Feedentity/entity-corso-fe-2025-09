app.controller("profileCtrl", function($scope, $timeout, utente, profileSvc, navigation) {
    $scope.profile = utente.getUser()
    $scope.profile.dataNascita = new Date($scope.profile.dataNascita)
    $scope.showSaveBanner = null
    $scope.saveUserChanges = function() {
        if ($scope.showSaveBanner) $timeout.cancel($scope.showSaveBanner)
        profileSvc.updateUser($scope.profile)
        utente.refresh()
        $scope.showSaveBanner = $timeout(function() {$scope.showSaveBanner = null}, 10000)
    }
    $scope.deleteUser = function() {
        profileSvc.deleteUser($scope.profile)
        utente.logout()
        navigation.goLogin()
    }
})

app.service("profileSvc", function($resource){
   var resources = $resource('http://localhost:4000/users/:id', {id: '@id'}, 
    {
        update: {method: 'PUT'}
    }
   )

    this.getUser = function(id){
        return resources.query({id: id}).$promise;
    }

    this.deleteUser = function(user){
        return resources.delete({id: user.id}).$promise;
    }

    this.updateUser = function(user){
        return resources.update({id: user.id}, user).$promise
    }
})