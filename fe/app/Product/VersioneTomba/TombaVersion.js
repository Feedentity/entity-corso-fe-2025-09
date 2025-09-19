app.controller('tombaVersionCtrl', function($scope, tombaVersionService){
    $scope.versioneTombe=[];
    $scope.versioneTombe= tombaVersionService.getTombe();

    $scope.newTomba ={}

    $scope.submitTomba = function(){
        tombaVersionService.createTomba($scope.newTomba).then(function(response){
            $scope.versioneTombe.push(response.data)
        });

        $scope.newTomba="";
    }
})

app.service('tombaVersionService', function($resource){
   var resources = $resource('http://localhost:4000/versioneTombe/:id', {id: '@id'},
    {
        update: {method: 'PUT'}
    })

    this.getTombe = function(){
        return resources.query();
    }

    this.createTomba = function(tomba){
        return resources.save(tomba).$promise
    }
})


