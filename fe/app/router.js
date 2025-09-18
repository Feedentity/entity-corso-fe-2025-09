
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/home.html',
                controller: 'MainCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                template: '<section class="card"><h2>About</h2><p>Starter AngularJS v1 minimale.</p></section>'
            })
            .otherwise({ redirectTo: '/' });

        // Disabilita HTML5 mode per semplicità (usa hashbang #!/)
        $locationProvider.hashPrefix('!');
    });