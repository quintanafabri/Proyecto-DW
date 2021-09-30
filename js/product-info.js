let comentarios = [];
let ProductArray = [];



function calificar(num){

    let estrellas = "";
    for (let i=1; i <=5; i++){   
        if (i <= num){ 
        estrellas += `<i class="fas fa-star"></i>`;
      }else{
        estrellas += `<i class="far fa-star"></i>`;
      };
    };
     return estrellas;
 };


function showImagesGallery(array){

    let galeria = "";


    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        galeria += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = galeria;
    }

}


function mostrarComentarios(array){

    let coment = "";


    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        coment +=  `
        <div class="container" id="tarjetaComentarios">
        <div class="row">
            <div class="col-8">
                <div class="card card-white post">
                    <div class="post-heading">
                        <div class="float-left image">
                        <i class="fas fa-user" id="imagenTarjeta"></i></div>
                        <div >
                            <div class="title h5" ><b>`+comments.user+` </b><div id="calEstilo">` + calificar(comments.score) + `</div>
                            
                            </div>
                            <h6 class="text-muted time">`+ comments.dateTime+`</h6>
                        </div>
                    </div> 
                    <div class="post-description"> `+comments.description+`
                    <br>    
                    </div>
                </div>
            </div>
            
        </div>
    </div>
        `

        document.getElementById("comentariosGuardados").innerHTML = coment;
    }
}


function nuevoComentario(){    //cuando hago click en "Agregar"

    let comentarioNuevo = {}; //Creo una variable de objeto llamada
    let datosLocales = JSON.parse(localStorage.getItem('dato'));
    let fechita = new Date();

     comentarioNuevo.description = document.getElementById("opinion").value; //Obtengo el contenido del texto
     comentarioNuevo.user = datosLocales.usuario 
     comentarioNuevo.score = document.querySelector('input[name="rate"]:checked').value;
     comentarioNuevo.dateTime = fechita.getFullYear() +"/" + fechita.getMonth()+ "/" + fechita.getDate() + " "  + fechita.getHours() +":" + fechita.getMinutes() + ":" + fechita.getSeconds() ;

      
     if (comentarioNuevo.score === `` || comentarioNuevo.description.trim() === `` ) {
        alert("Faltan datos");
    } else {
      comentarios.push(comentarioNuevo);
    }
    mostrarComentarios(comentarios); //Mostramos la lista.
  };


  function mostrarObjetos(){
    document.getElementById("imagenesUno").innerHTML=`
    
    <div>
    <img src='` + product.images[0] + `'>
    </div>
    
    `
    }
    

    function relacionados(){

        let relacionadosArray = [];
        let productosRelacionadosArray = [];
        let relacionadoE = "";

    

        for(let i = 0; i < product.relatedProducts.length; i++){
             relacionadosArray = product.relatedProducts[i]
            console.log(relacionadosArray)
       
            productosRelacionadosArray = ProductArray[relacionadosArray];
            console.log(productosRelacionadosArray)


            relacionadoE += `
            
            
            
            <h2 style="text-align:center"></h2>
            
            <div class="card" id="cardRelacionado">
              <img src="` + productosRelacionadosArray.imgSrc + `" alt="Denim Jeans" style="width:100%">
              <h1>`+productosRelacionadosArray.name+`</h1>
              <p class="price">US$`+productosRelacionadosArray.cost+`</p>
              <p>`+productosRelacionadosArray.description+`</p>
              <p><button>Add to Cart</button></p>
            </div>

            
            `
            document.getElementById("relacionados").innerHTML = relacionadoE;

        }
    }



document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

        
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDescription").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = "US$"+product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            mostrarObjetos(product);

        }
    });


 getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        comentarios = resultObj.data;

        mostrarComentarios(comentarios);

    }
});

getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        ProductArray=resultObj.data;
        relacionados();
    }

});
});










