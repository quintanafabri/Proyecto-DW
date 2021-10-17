let carritoDisplay=[];
let lista="";
CartArray=[];
let subtotal=[];
let moneda="USD";
let envioE="0";
let totalProdcutos="0";


 function mostrarCarrito(){

    for(let i = 0; i < CartArray.articles.length; i++){
        carritoDisplay[i] = CartArray.articles[i];

    if (carritoDisplay[i].currency === "UYU"){
        carritoDisplay[i].unitCost = (carritoDisplay[i].unitCost)/40;
    }

        lista+= `
        
        <tr>
        <td><img src="${carritoDisplay[i].src}" class="img-thumbnail"></td>
        <td>${carritoDisplay[i].name}</td>
        <td class="precio">${moneda + carritoDisplay[i].unitCost}</td>
        <td><button id='eliminar${i}'class="btn btn-danger" onClick="eliminarCarrito(${i})">Eliminar</button></td>
        <td><input  id='cont${i}' type="number" min="0" value="0"  onchange="calculo()"></td>
        <td id='subtotal${i}'> </td>
        </tr>
        
        

        
        
       `

       


    }
 document.getElementById('carrito').innerHTML = lista;






}

function calculo(){

     totalProdcutos=0;
let cantidad = document.getElementsByTagName("input");


for (let i=0; i< cantidad.length; i++){
    subtotal[i] =  (carritoDisplay[i].unitCost) * (cantidad[i].value);
    totalProdcutos += subtotal[i];
    


    document.getElementById('subtotal'+i).innerHTML = moneda + (carritoDisplay[i].unitCost) * (cantidad[i].value);



}

document.getElementById("costo").innerHTML = moneda +  totalProdcutos;

envio();


}


function eliminarCarrito(indice){
    let td = event.target.parentNode;
    let tr = td.parentNode;
    let tBody = tr.parentNode;
    tBody.removeChild(tr);
    carritoDisplay.splice(indice, 1);
    calculo();
}

function envio(){



   

    envioE = document.getElementById("mySelect").value;
    if(moneda === "UYU"){
        envioE=envioE*40
    }
    


    document.getElementById("CostoEnvio").innerHTML=moneda + " "+ envioE;
    document.getElementById("total").innerHTML = moneda + (parseFloat(envioE) + parseFloat(totalProdcutos));
    document.getElementById("mostrarCarrito").innerHTML = moneda + (parseFloat(envioE) + parseFloat(totalProdcutos));





}


function currency(){
    let currency = document.getElementById("myCurrency").value;

    if(currency === "UYU"  && moneda === "USD"){
        totalProdcutos = totalProdcutos*40;
     //   document.getElementById("total").innerHTML = document.getElementById("total").innerHTML*40;
        carritoCurrency("UYU");




    }

    if(currency === "USD" && moneda === "UYU"){
        totalProdcutos = totalProdcutos/40;
   //    document.getElementById("total").innerHTML = document.getElementById("total").innerHTML/40;
       carritoCurrency("USD");

    }

}

function agregarCarrito(objeto){

datoProducto.name = objeto.name;
datoProducto.unitCost = objeto.unitCost;
datoProducto.src = objeto.src;
localStorage.setItem("datoProducto",JSON.stringify(datoProducto));





}

function carritoCurrency(currency){

    if(currency==="USD"){
        for(let i = 0; i < carritoDisplay.length; i++)
        carritoDisplay[i].unitCost = (carritoDisplay[i].unitCost)/40;
        moneda="USD";
        calculo();


    
    }

    if(currency==="UYU"){
        for(let i = 0; i < carritoDisplay.length; i++)
        carritoDisplay[i].unitCost = (carritoDisplay[i].unitCost)*40;
        moneda="UYU";
    calculo();
    }


}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO2_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            CartArray=resultObj.data;
        }
        mostrarCarrito(CartArray);
    });
});