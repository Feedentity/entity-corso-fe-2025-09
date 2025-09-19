var app =angular.module("app",[]);

app.controller('shopTombaController', function($scope, datiTombe) {
        $scope.tombe = [];
        datiTombe.getDati().then(function(response){
            $scope.tombe=response.data;
        })
});
//funzione che prende tramite http i dati dal db
app.service('datiTombe', function($http,) {


    this.getDati = function() {
        return $http.get('/be/db.json').then(function(response) {
        return response;
        });
    };
});
//diretiva per creare il template della selezione delle versioni
app.directive("myVersion",function(){
    return {
        template:`
        <select id="version" >
            <option value="luxury">{{tombe.versioneTombe[0].nome}}</option>
            <option value="Business">{{tombe.versioneTombe[1].nome}}</option>
            <option value="Economy">{{tombe.versioneTombe[2].nome}}</option>
         </select>   `
    }
});
app.directive("myZone",function(){
    return {
        template:`
        <select id="zone">
            <option value="A"> Zona {{tombe.zone[0].nome}}</option>
            <option value="B">Zona {{tombe.zone[1].nome}}</option>
            <option value="C">Zona {{tombe.zone[2].nome}}</option>
         </select>   `
    }
});
//funzione per prendere i dati
function scelte(){
    let x =document.getElementById("dati");
    let versione= x.version.value;
    let zona = x.zone.value;
    let prezzo=0;
    if(versione=="luxury"){   
        prezzo+=1500;
        if(zona=="A"){
            prezzo=prezzo*(1+(5/100))
            x.Prezzo.value=prezzo;
        }
        else if(zona=="B"){
            prezzo=prezzo*(1+(3/100))
            x.Prezzo.value=prezzo;
        }
        else{
             prezzo=prezzo*(1+(3/100))
            x.Prezzo.value=prezzo;
        }
    }
    else if(versione!="Economy"){
        prezzo+=1000;
        if(zona=="A"){
            prezzo=prezzo*(1+(5/100))
            x.Prezzo.value=prezzo;
        }
        else if(zona=="B"){
            prezzo=prezzo*(1+(3/100))
            x.Prezzo.value=prezzo;
        }
        else{
             prezzo=prezzo*(1+(3/100))
            x.Prezzo.value=prezzo;
        }
    }
    else{
        prezzo+=600;
        if(zona=="A"){
            prezzo=prezzo*(1+(5/100))
            x.Prezzo.value=prezzo;
        }
        else if(zona=="B"){
            prezzo=prezzo*(1+(3/100))
            x.Prezzo.value=prezzo;
        }
        else{
             prezzo=prezzo*(1+(3/100))
            x.Prezzo.value=prezzo;
        }

    }

};

