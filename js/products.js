var currentProductArray = [];
var minCount = undefined;
var maxCount = undefined;


function ORDER_ASC_BY_COST(){
    currentProductArray.sort(function(a, b) {
        let aCount = parseInt(a.cost);
        let bCount = parseInt(b.cost);

        if ( aCount < bCount ){ return -1; }
        if ( aCount > bCount ){ return 1; }
        return 0;
    });
    showProductList(currentProductArray)

}

function ORDER_DESC_BY_COST(){
    currentProductArray.sort(function(a, b) {
        let aCount = parseInt(a.cost);
        let bCount = parseInt(b.cost);

        if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
    });
    showProductList(currentProductArray)
     }


function ORDER_BY_PROD_COUNT(){
    currentProductArray.sort(function(a, b) {
        let aCoun = parseInt(a.soldCount);
        let bCoun = parseInt(b.soldCount);

        if ( aCoun > bCoun ){ return -1; }
        if ( aCoun < bCoun ){ return 1; }
        return 0;
    });
    showProductList(currentProductArray)

        }


function BUSCAR(){
    let buscador = document.getElementById("buscador").value;
    let listaFiltrada=[]

    listaFiltrada=currentProductArray.filter(function(product){
        return (product.name.toLowerCase().indexOf(buscador.toLowerCase())>-1) || (product.description.toLowerCase().indexOf(buscador.toLowerCase())>-1);
    
    });          
    showProductList(listaFiltrada)  

    }


function showProductList(array){
    showSpinner();
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];
        
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

                htmlContentToAppend += 
                
                `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                    <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +  `</h4>
                        <h6 style="margin:right" >$`+ category.cost + ' ' + category.currency + ` </h6>

                    </div>
                    
                    <p class="mb-1">` + category.description + `</p>          
                    <small style="color:blue;" >` + category.soldCount + ` Vendidos</small>

                        </div>
                    </div>
                </div>
                `
            }



        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
    hideSpinner();
}


//-------------Escuchar eventos--------------------//


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray=resultObj.data;
            showProductList(currentProductArray)
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        ORDER_ASC_BY_COST();
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ORDER_DESC_BY_COST();
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ORDER_BY_PROD_COUNT();
    });

    document.getElementById('buscador').addEventListener('keyup',()=>{
        BUSCAR();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList(currentProductArray);
    });

    

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductList(currentProductArray);
});
});

