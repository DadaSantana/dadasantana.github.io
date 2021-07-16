let inputTypeFile = document.querySelector("input[type='file']");
let selectedImg;
let condition = true;

function starUpload(){
    inputTypeFile.click();
    inputTypeFile.value = "";
    condition = true;
    clicou();
}

function jadeu() {
    console.log("Deu");
}

function clicou() {
    if (condition == true) {
        let p =  new Promise((resolve, reject) => {
            if (inputTypeFile.value == "") {
                null
            } else {
                resolve('Imagem Carregada');
                condition = false;
            }
        });
        p.then(function() {
            let image = inputTypeFile.files[0];
            let url = URL.createObjectURL(image);
            let divPrevious = document.querySelector(".add-img");    
            divPrevious.innerHTML = '';
            divPrevious.style.backgroundImage = `url('${url}')`;
            divPrevious.style.backgroundSize = 'cover'
            divPrevious.style.backgroundPosition = 'center'

            selectedImg = image;
        });
        p.catch();
    }
    
}

setInterval(clicou, 1000);

function salvarThumb(title, description, image) {
    title = document.getElementById("img-title").value;
    description = document.getElementById("img-resume").value;
    image = selectedImg;
    let url = URL.createObjectURL(image);


    let areaHTML = document.querySelector(".area");
    let contentHTML = `<div class="item-thumbnail"><img src="${url}" alt=""><div class="texts"><h3>${title}</h3><p>${description}</p></div></div><hr>`

    areaHTML.innerHTML += contentHTML;
    limparPreenchimento();
}

function limparPreenchimento() {
    document.getElementById("img-title").value = '';
    document.getElementById("img-resume").value = '';
    document.querySelector(".add-img").style.background = 'rgb(247, 247, 255)';
    document.querySelector(".add-img").innerHTML = `<span class="material-icons">upload_file</span><p>Add Imagem</p>`;
}