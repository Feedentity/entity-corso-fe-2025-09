app.service("utente", function ($resource) {
    var userSession = null
    var response = undefined

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
            response = undefined
            sessionRequest = $resource('http://localhost:4000/users')
            sessionRequest.query().$promise.then(function (response) {
                let arr = response
                let elem = arr.find((u) => u.email == mail)
                if (elem && elem.password == pass) {
                    userSession = elem
                    response = true
                }
                else
                    response = false
            });
            return response
        },
        logout: function (value) {
            userSession = null
        }
    }
});