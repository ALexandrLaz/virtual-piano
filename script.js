"use strict"
const btnCont = document.querySelectorAll('button.btn');
const pianoKey = document.querySelectorAll('div.piano-key'); 
const piano = document.querySelector('div.piano'); 

const clickBtnCont = (e) =>{
    for(let i = 0; i < btnCont.length; i++){
        btnCont[i].classList.remove("btn-active")
    }
    e.target.classList.toggle("btn-active");

    //Стилизация span для нот и букв
    if(e.target.getAttribute("data-name") == "notes"){
        for(let i = 0; i < pianoKey.length; i++){
            if(pianoKey[i].getElementsByTagName("span") && pianoKey[i].getElementsByTagName("span").length != 0){
                pianoKey[i].getElementsByTagName("span")[0].remove();
            }
            if(i > 6){
                pianoKey[i].prepend(cE("span", pianoKey[i].getAttribute("data-note"), "upper"))
            }else{
                pianoKey[i].prepend(cE("span", pianoKey[i].getAttribute("data-note"), "for-span"))
            }
        }
    }else if(e.target.getAttribute("data-name") == "letters"){
        for(let i = 0; i < pianoKey.length; i++){
            if(pianoKey[i].getElementsByTagName("span") && pianoKey[i].getElementsByTagName("span").length != 0){
                pianoKey[i].getElementsByTagName("span")[0].remove();
            }
            if(i > 6){
                pianoKey[i].prepend(cE("span", pianoKey[i].getAttribute("data-letter"), "upper"));
            }else{
                pianoKey[i].prepend(cE("span", pianoKey[i].getAttribute("data-letter"), "for-span"))
            } 
        }
    }
}
for(let i = 0; i < btnCont.length; i++){
    btnCont[i].addEventListener("click", clickBtnCont);
}
// динамическое создание элемента
function cE(name, text, classN){
    let nameElem = document.createElement(name);
    if(nameElem != undefined){
        nameElem.innerHTML = text;
    }
    if(classN != undefined){
        nameElem.classList.toggle(classN);
    }
    return nameElem;
}
//Клики мышкой по клавишам
const pianoKeyMouseover = (e) =>{
    e.target.classList.toggle("piano-key-active");
    e.target.children[0].classList.toggle("piano-key-active");
    e.target.children[1].currentTime = 0;
    e.target.children[1].play();
} 
const pianoKeyMouseout = (e) =>{
    e.target.classList.toggle("piano-key-active");
    e.target.children[0].classList.toggle("piano-key-active");
}
const pianoKeyClickDown = (e) =>{
    e.target.classList.toggle("piano-key-active");
    e.target.children[0].classList.toggle("piano-key-active");
    e.target.children[1].currentTime = 0;
    e.target.children[1].play();
    if(e.target.classList.contains("piano-key-active")){
            piano.addEventListener("mouseover", pianoKeyMouseover);
            piano.addEventListener("mouseout", pianoKeyMouseout);     
    }
}
const pianoKeyClickUp = (e) =>{
    e.target.classList.toggle("piano-key-active");
    e.target.children[0].classList.toggle("piano-key-active");
    piano.removeEventListener("mouseover", pianoKeyMouseover);
    piano.removeEventListener("mouseout", pianoKeyMouseout);
} 
// Клики клавиатурой по клавишам
const ceyDown = (e) => {
    if(!e.repeat){
        switch (e.which){
            case 68: play(e);
            case 70: play(e);
            case 71: play(e);
            case 72: play(e);
            case 74: play(e);
            case 75: play(e);
            case 76: play(e);
            case 82: play(e);
            case 84: play(e);
            case 85: play(e);
            case 73: play(e);
            case 79: play(e);
            default: break;
        }
    }  
}
function play(e){
    for (let index = 0; index < pianoKey.length; index++) {
        if(pianoKey[index].getAttribute("data-key") == e.which){
            pianoKey[index].classList.add("piano-key-active");
            pianoKey[index].children[0].classList.add("piano-key-active");
            pianoKey[index].children[1].currentTime = 0;
            pianoKey[index].children[1].play();
        }
    }
}
const ceyUp = (e) => {
    for (let i = 0; i < pianoKey.length; i++) {
        if(pianoKey[i].classList.contains("piano-key-active")){
            pianoKey[i].classList.remove("piano-key-active");
            pianoKey[i].children[0].classList.remove("piano-key-active")
        }
    }
}
for(let i = 0; i < pianoKey.length; i++){
    pianoKey[i].addEventListener("mousedown", pianoKeyClickDown);
    pianoKey[i].addEventListener("mouseup", pianoKeyClickUp);
}
document.body.addEventListener("keydown", ceyDown);
document.body.addEventListener("keyup", ceyUp);



// Fullscreen or not
const fullscreen = document.getElementsByTagName("button")[2];
const fullS = (e) =>{
    if(document.fullscreenElement){
        document.exitFullscreen();
    }else{
        document.documentElement.requestFullscreen();
    }
}
fullscreen.addEventListener("click", fullS);