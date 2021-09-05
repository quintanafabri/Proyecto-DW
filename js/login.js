//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){




    

});


function conectar(){

    let dato = {}
    let usuario = document.getElementById(`usuario`).value;
    let password = document.getElementById(`password`).value;
    
    // trim corta los espacios en blanco
    if (usuario.trim() === `` || password.trim() === ``){
    
     alert(`usuario o email vacio`);
    
    
     }else{
     dato.usuario = usuario;
     dato.password = password;
     dato.estado = "conectado";
     localStorage.setItem("dato",JSON.stringify(dato));
     location.href ="index.html";
    
     }
    }
    
    function desconectar(){
      localStorage.clear();
      location.href = "login.html";
      signOut();
    }


    let dato = JSON.parse(localStorage.getItem('dato'));
    document.getElementById('dropdownMenuButton').innerHTML = dato.usuario;







  