//Servizio che si occupa del routing. Quando caricato, contiene un oggetto che contiene funzioni di routing.
app.factory("navigation", function ($location) {
    var obj = {
        // Passa alla pagina di login
        goLogin: function () {
            $location.path("/login")
        },
        // Passa alla pagina home
        goHome: function () {
            $location.path("/home")
        },
        // Passa alla pagina dello shop per le tombe
        goShopTombe: function () {
            $location.path("/shop/tombe")
        },
        // Passa alla pagina dello shop per i fiori
        goShopFiori: function () {
            $location.path("/shop/fiori")
        },
        // Passa alla pagina di una specifica tomba
        goTomba: function (id) {
            $location.path("/tomba/"+id)
        },
        // Passa alla pagina di amministrazione per la lista di user
        goUsers: function () {
            $location.path("/admin/users")
        },
        // Passa alla pagina di amministrazione per i tipi di tombe
        goTipiTomba: function () {
            $location.path("/admin/tipiTomba")
        },
        // Passa alla pagina di amministrazione per i tipi di fiori
        goTipiFiore: function () {
            $location.path("/admin/tipiFiore")
        },
        // Passa alla pagina di amministrazione per le zone
        goZone: function () {
            $location.path("/admin/zone")
        },
    }
    return obj
});