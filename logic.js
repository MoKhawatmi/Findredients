let ourGrid=document.getElementById("res");
let searchValue;
let arrid=[];
let itemCounter=0;
function search(){
    searchValue=document.getElementById("search").value;
    searchValue=searchValue.replace(/-/g,",+");
    getFoods(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchValue}&number=2&apiKey=apikey`);
}

function getFoods(url){
    let xhr=new XMLHttpRequest();
    xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==XMLHttpRequest.DONE){ 
            setFoods(xhr.response);
        }else{
            return "error";
        }
    }
    xhr.open('GET',url);
    xhr.send();
}

function setFoods(json){
    if(json.length==0){
        alert(`no results found for ${searchValue}`);
    }else{
    ourGrid.innerHTML=json.map(foodLogic).join("");
    doId();
    } 
}


function foodLogic(foodItem){
     arrid.push(foodItem.id);
     return `<div class="imageItem"><img src="${foodItem.image}"></div>
     <div class="infoItem"><h2>${foodItem.title}</h2>
     <p class="summary"></p>
     <p class="more" data-id="${foodItem.id}" onclick="sendId(this)"><a href="./moreInfo.html" target="_blank">More</a></p></div>
     ` 
}

function sendId(obj){
    sessionStorage.setItem("itemId",obj.dataset.id);
}

function doId(){
    let duh=ourGrid.getElementsByClassName("infoItem");
    for(let i=0;i<arrid.length;i++){
        let xhr2=new XMLHttpRequest();
        xhr2.responseType='json';
        xhr2.onreadystatechange=()=>{
            if(xhr2.readyState==XMLHttpRequest.DONE){
                duh[i].getElementsByClassName("summary")[0].innerHTML=truncateText(xhr2.response.summary,300);
            }
        };
        xhr2.open('GET',`https://api.spoonacular.com/recipes/${arrid[i]}/summary?apiKey=apikey`);
        xhr2.send();
    }
}

function truncateText(text, maxLength) {
    let truncated ='';
    if (text.length > maxLength) {
        truncated = text.substr(0,maxLength) + '...';
    }
    return truncated;
}


