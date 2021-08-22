



function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    

    let dato = {};
    dato.nombre = profile.getGivenName();
    dato.estado = "conectado";
    localStorage.setItem("dato",JSON.stringify(dato));
    location.href ="index.html";
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    console.log(dato.nombre)
}


function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){

    });
}


function onLoad(){

    gapi.load(`auth2`,function(){
        gapi.auth2.init();
    });
}

//document.addEventListener("DOMContentLoaded", ()=>{
//    let dato = JSON.parse(localStorage.getItem("dato"));
//    if (dato.estado=="conectado"){
 //       location.href=index.html;
 //   }
//})
