//Servizio che gestisce la user session. Quando caricato, contiene un oggetto che contiene funzioni di gestione per la sessione attuale.
app.service("utente", function ($resource) {
    var userSession = null
    
    return {
        // Restituisce true se esiste una sessione utente, false se non esiste
        isLoggedIn: function () {
            return userSession != null
        },
        // Restituisce lo user attuale, o null se non ce n'è uno
        getUser: function () {
            return userSession
        },
        // Restituisce true se la sessione utente esiste ed è un admin, falso altrimenti
        isAdmin: function () {
            return userSession ? userSession.isAdmin : false
        },
        // Dati una mail e una password, cerca lo user corrispondente all'interno del db, e lo imposta come sessione corrente se lo trova.
        login: function (mail, pass) {
            sessionRequest = $resource('http://localhost:4000/users')
            sessionRequest.query().$promise.then(function (arr) {
                let elem = arr.find((u) => u.email == mail)
                if (elem && elem.password == pass) {
                    userSession = elem
                }
            });
        },
        // Imposta la sessione corrente a "null" e apre la pagina di login
        logout: function () {
            userSession = null
        }
    }
});