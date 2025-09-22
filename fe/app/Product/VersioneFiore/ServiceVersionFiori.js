app.service("serviceListaFiori",['$resource',function($resource) {
        var resources = $resource('http://localhost:4000/tipoFiori/:id', { id: '@id' })

        this.getFiori = function(){
                return resources.query();
        }

        this.createFiori = function(fiore){
                return resources.save(fiore).$promise
        }

        this.deleteFiori = function(fiore){
                return resources.delete(fiore).$promise
        }
}]);