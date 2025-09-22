//Servizio che gestisce la user session. Quando caricato, contiene un oggetto che contiene funzioni di gestione per la sessione attuale.
app.service("utente", function ($resource) {
    
    return {
        // Restituisce true se esiste una sessione utente, false se non esiste
        isLoggedIn: function () {
            return sessionStorage.userSession != undefined
        },
        // Restituisce lo user attuale, o null se non ce n'è uno
        getUser: function () {
            return JSON.parse(sessionStorage.userSession)
        },
        // Restituisce true se la sessione utente esiste ed è un admin, falso altrimenti
        isAdmin: function () {
            return sessionStorage.userSession ? JSON.parse(sessionStorage.userSession).isAdmin : false
        },
        // Dati una mail e una password, cerca lo user corrispondente all'interno del db, e lo imposta come sessione corrente se lo trova.
        login: function (mail, pass) {
            sessionRequest = $resource('http://localhost:4000/users')
            sessionRequest.query().$promise.then(function (arr) {
                let elem = arr.find((u) => u.email == mail)
                if (elem && elem.password == pass) {
                    sessionStorage.userSession = JSON.stringify(elem)
                }
            });
        },
        // Aggiorna i dati di sessione attuali.
        refresh: function () {
            sessionRequest = $resource('http://localhost:4000/users/:id', {id:"@id"})
            sessionRequest.get({id: this.getUser().id}).$promise.then(function(user) {
                    sessionStorage.userSession = JSON.stringify(user)
            })
        },
        // Imposta la sessione corrente a "null" e apre la pagina di login
        logout: function () {
            delete sessionStorage.userSession
        }
    }
});