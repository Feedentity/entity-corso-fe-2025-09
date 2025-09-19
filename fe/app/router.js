
app.config(function ($routeProvider, $locationProvider) {
    let placeholder = '<section class="card"><h2>Placeholder</h2><p>This is a placeholder page</p></section>'
    $routeProvider
        .when('/login', {
            templateUrl: 'app/Login/login.html',
            })
        .when('/home', {
            template: placeholder
        })
        .when('/shop/tombe', {
            templateUrl: 'app/Shop/ShopTomba/shopTomba.html',
            controller: 'shopTombaController',
        })
        .when('/shop/fiori', {
            templateUrl: 'app/Shop/ShopFiore/ShopFiore.html',
            controller: 'ShopFioreCtrl'
        })
        .when('/tomba/:id', {
            template: placeholder
        })
        .when('/admin/tipiTomba', {
            template: placeholder
        })
        .when('/admin/tipiFiore', {
            template: placeholder
        })
        .when('/admin/zone', {
            template: placeholder
        })
        .when('/about', {
            template: '<section class="card"><h2>About</h2><p>Starter AngularJS v1 minimale.</p></section>'
        })
        .otherwise({ redirectTo: '/login' });

    // Disabilita HTML5 mode per semplicità (usa hashbang #!/)
    $locationProvider.hashPrefix('!');
});