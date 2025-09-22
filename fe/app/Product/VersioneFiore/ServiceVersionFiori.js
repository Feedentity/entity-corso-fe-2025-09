app.service("serviceListaFiori",['$resource',function($resource) {
        var resources = $resource('http://localhost:4000/tipoFiori/:id', { id: '@id' },
                {
                        update: {method:'PUT'}
                }
        )

        this.getFiori = function(){
                return resources.query();
        }

        this.createFiori = function(fiore){
                return resources.save(fiore).$promise
        }

        this.deleteFiori = function(fiore){
                return resources.delete(fiore).$promise
        }

        this.updateFiori = function(fiore){
                return resources.update({id : fiore.id},fiore).$promise
        }
}]);