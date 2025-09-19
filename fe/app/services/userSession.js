app.service("utente", function () {
    var userSession = null

    //this service returns a function collection to interact with loadedData
    return {
        isLoggedIn: function () {
            return userSession != null
        },
        getUser: function () {
            return userSession
        },
        login: function (user, pass) {
            userSession = true //todo query server
        },
        logout: function (value) {
            userSession = null
        }
    }
});