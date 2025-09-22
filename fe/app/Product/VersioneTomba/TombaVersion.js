app.controller('tombaVersionCtrl', function($scope, tombaVersionService){
    $scope.versioneTombe=[];

    $scope.edit=false;

    $scope.versioneTombe= tombaVersionService.getTombe();
    
    $scope.newTomba ={}

    $scope.submitTomba = function(){
        tombaVersionService.createTomba($scope.newTomba).then(function(response){
            $scope.versioneTombe.push(response.data)
        });

        $scope.newTomba={};
    }

    $scope.removeTomba = function(tomba){
        let i = $scope.versioneTombe.indexOf(tomba);
        tombaVersionService.deleteTomba(tomba).then(function(){
            $scope.versioneTombe.splice(i, 1);
        })
    }

    $scope.editTomba = function(){
        $scope.edit = true;  
    }

    $scope.saveTomba = function(tomba){
        let i = $scope.versioneTombe.indexOf(tomba);
        tombaVersionService.updateTomba(tomba)
        $scope.versioneTombe[i] = tomba;
        $scope.edit = false;
    }
})

app.service('tombaVersionService', function($resource){
   var resources = $resource('http://localhost:4000/versioneTombe/:id', {id: '@id'}, 
    {
        update: {method: 'PUT'}
    }
   )

    this.getTombe = function(){
        return resources.query();
    }

    this.createTomba = function(tomba){
        return resources.save(tomba).$promise
    }

    this.deleteTomba = function(tomba){
        return resources.delete(tomba).$promise;
    }

    this.updateTomba = function(tomba){
        return resources.update({id: tomba.id}, tomba).$promise
    }
})




