app.controller('tombaVersionCtrl', function($scope, tombaVersionService){
    $scope.versioneTombe=[];

    tombaVersionService.getTombe().then(function(response){
        $scope.versioneTombe = response.data.versioneTombe;
    })
})

app.service('tombaVersionService', function($http){
    this.getTombe = function(){
    return $http.get("/be/db.json")
    }
})

