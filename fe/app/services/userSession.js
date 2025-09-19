app.service("utente", function ($resource) {
    var userSession = null

    return {
        isLoggedIn: function () {
            return userSession != null
        },
        getUser: function () {
            return userSession
        },
        isAdmin: function () {
            return userSession ? userSession.isAdmin : false
        },
        login: function (mail, pass) {
            sessionRequest = $resource('http://localhost:4000/users')
            sessionRequest.query().$promise.then(function (arr) {
                let elem = arr.find((u) => u.email == mail)
                if (elem && elem.password == pass) {
                    userSession = elem
                }
            });
        },
        logout: function (value) {
            userSession = null
        }
    }
});