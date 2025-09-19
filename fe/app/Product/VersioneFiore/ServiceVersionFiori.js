app.service("serviceListaFiori",function($http) {/*sto creando un servizio il qui scopo e quello di fare una chiamata al be per prendere la lista dei fiori */
    function funzioneLista() {
        var oggetto = {}
        $http.get('http://localhost:4000/tipoFiori').then(function(response){/* effettuo la chiamata al be*/
        var dati_json = response.data;/* creo una variabile e all interno inserisco i dati di risposta dall'be  */
        oggetto.dati = dati_json;/* inserisco i dati dentro all oggetto */
    });
        return oggetto;
    }
    let oggettoLista = {oggetto : funzioneLista()}//creo un altro oggetto dove all interno metto dentro la funzione
    return oggettoLista;
});