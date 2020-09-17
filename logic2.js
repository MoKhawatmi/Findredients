/*take

title
image
servings
ready time
summary
go over extended ing and take name and original name

*/ 

let id=sessionStorage.getItem("itemId");
let url=`https://api.spoonacular.com/recipes/${id}/information?apiKey=apikey`;
let ourFlex= document.getElementById("sim");



let xhr=new XMLHttpRequest();
xhr.responseType="json";
xhr.onreadystatechange=()=>{
    if(xhr.readyState==XMLHttpRequest.DONE){
        getSteps(xhr.response);
    }
}

xhr.open('GET',url)
xhr.send();

function getSteps(json1){
    let xhr=new XMLHttpRequest();
    xhr.responseType="json";
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==XMLHttpRequest.DONE){
            if(xhr.response.length>0){
            console.log(xhr.response);
            setInfo(json1,xhr.response);
            }else{
                setInfo(json1,undefined);
            }
        }
    }
    xhr.open('GET',`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=apikey`);
    xhr.send();
}

function returnSteps(item){
    return `<li><b>Step ${item.number}</b>: ${item.step}</li>`
}

function setInfo(json1,json2){
    let ing=json1.extendedIngredients;
    document.body.innerHTML+=`<div class="mainImg-div"><img class="main-img" src="${json1.image}">
    <h2>${json1.title}</h2></div>
    <div class="gen-div">
    <h3>Description:</h3>
    <p>${json1.summary}</p>
    </div>
    <div class="gen-div">
    <div>
    <h3>Ready in: ${json1.readyInMinutes} minutes</h3>
    <h3>Servings: ${json1.servings}</h3>
    </div>
    <div>
    <h3>Ingredients:</h3>
    <ol>
        ${ing.map(ingredientFunc).join("")}
    </ol>
    </div>
    </div>
    <div class="gen-div">
    <h3>Steps:</h3>
      <ul class="steps">
        ${json2?json2[0].steps.map(returnSteps).join(""):"No steps available :("}
      </ul>
    </div>
    `
    getSimilar(id);
}

function ingredientFunc(item){
    return `<li>${item.name}: ${item.original}</li>`
}

function getSimilar(id){
    let url=`https://api.spoonacular.com/recipes/${id}/similar?apiKey=apikey`;
    let xhs= new XMLHttpRequest();
    xhs.responseType="json";
    xhs.onreadystatechange=()=>{
        if(xhs.readyState==XMLHttpRequest.DONE){
            setSimilar(xhs.response);
        }
    }
    xhs.open('GET',url);
    xhs.send();  
}



function setSimilar(json){
    
    let similarList= json.map(returnSimilar).join("");
    let ourFlex=`<h3>Similar recipes:</h3> <div class=similar>${similarList}</div>`;
    document.body.innerHTML+=ourFlex;
}

function returnSimilar(item){
    return `<div class="similar-item" data-id="${item.id}" onclick="showSimilarItem(this)"><img src="simMeal.GIF"><h5>${item.title}</h5></div>`;
}

function showSimilarItem(element){
    sessionStorage.setItem("itemId",element.dataset.id);
    location.reload();
}
