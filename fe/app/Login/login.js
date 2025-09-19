//funzione principale per validare le credenziali
function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Inserire un nome valido!");
    return false;
  }

  if (!validatePass()) {
    alert("Inserire una password valida");
    return false;
  }
}

//funzione per mostrare/nascondere la password
function showPswd() {
        var input = document.getElementById('pswd');
        if (input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      }

//funzione di validazione password
function validatePass() {
  var y = 0;
  var password = document.getElementById('pswd').value;

  //controllo se sono presenti numeri
  var check1 = /[0-9]/;
  if(check1.test(password)) {
    y += 1;
  }

    //controllo se sono presenti lettere minuscole
  var check2 = /[a-z]/;
  if(check1.test(password)) {
    y += 1;
  }

    //controllo se sono presenti letterer maiuscole
  var check3 = /[A-Z]/;
  if(check1.test(password)) {
    y += 1;
  }

    //controllo se sono presenti caratteri speciali
  var check4 = /[$-/:-?{-~!"^_`\[\]]/;
  if(check1.test(password)) {
    y += 1;
  }

   //controllo sulla lunghezza della password
  if(password.length >= 4) {
    y += 1;
  }

  if (y < 5) {
    return false;
  }
  return true;
}