
app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
            })
        .when('/home', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/shop/tombe', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/shop/fiori', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/tomba/:id', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/tipiTomba', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/tipiFiore', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/zone', {
            templateUrl: 'app/views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/about', {
            template: '<section class="card"><h2>About</h2><p>Starter AngularJS v1 minimale.</p></section>'
        })
        .otherwise({ redirectTo: '/home' });

    // Disabilita HTML5 mode per semplicità (usa hashbang #!/)
    $locationProvider.hashPrefix('!');
});