window.onload = executarFetch();

let aux = 0;
let selectedOption = [];

async function executarFetch() {
    let req = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    let json = await req.json();
    for (let i in json) {
        document.querySelector("select[name='estados'").innerHTML += `<option value="${json[i].id}">${json[i].nome}</option>`
    }
    
}

async function selectedUF(element) {
    
    let valueUF = element.selectedOptions[0].value;    
    document.querySelector("select[name='cidades']").innerHTML = `<option value="" id="firstChild">Aguarde, carregando...</option>`;   
   
    let reqCidades = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valueUF}/municipios`);
    let jsonCidades = await reqCidades.json();

    for (let i in jsonCidades) {
        document.querySelector("select[name='cidades']").innerHTML += `<option value="">${jsonCidades[i].nome}</option>`;
    };

    document.querySelector("#firstChild").textContent = "Selecione um município";
}

function enviarDados() {
    let selectedEstado = document.querySelector("select[name='estados'").selectedOptions[0].textContent;
    let selectedMunicipio = document.querySelector("select[name='cidades'").selectedOptions[0].textContent

    if ((selectedMunicipio == 'Selecione um Estado') && ((selectedEstado == 'Selecione'))) {
        document.querySelector(".hiddenp").textContent = 'Não há dados selecionados, por favor, escolha um estado e uma cidade e aperte em Enviar'
    } else { 
        if (aux < 1) {
            limparPrincipal(document.querySelector(".hiddenp"));
            document.querySelector("#resultados").innerHTML += `<div class="itemEnviado"><p>${selectedMunicipio}, ${selectedEstado}</p><span class="material-icons" title="Limpar" onclick="limparSpan(this)">close</span></div>`;
            auxStatus(1);
            selectedOption.push({cidade:`${selectedMunicipio}`, estado:`${selectedEstado}`});
        } else {
            let boolean = false;

            for (let i in selectedOption) {
                if (selectedOption[i].cidade == selectedMunicipio) {
                    boolean = true;
                }
            }

            if (boolean == true) {
                alert("Esta cidade e estado já estão adicionados");
            } else {                
                document.querySelector("#resultados").innerHTML += `<div class="itemEnviado"><p>${selectedMunicipio}, ${selectedEstado}</p><span class="material-icons" title="Limpar" onclick="limparSpan(this)">close</span></div>`;
                auxStatus(1);
                selectedOption.push({cidade:`${selectedMunicipio}`, estado:`${selectedEstado}`});
            }
        }
      

    }
}

function limparSpan(element) {
    let child = element.parentNode;
    let node = child.parentNode;
    node.removeChild(child);
    auxStatus(-1);

    if (aux == 0) {
        let resultadoHTML = document.querySelector("#resultados");
        resultadoHTML.innerHTML = '<div class="itemEnviado"><p class="hiddenp">Não há dados para exibir. Selecione uma cidade e um estado</p></div>';
    }

    let indexToRemove = child.firstChild.textContent;
    let virgulaIndex = indexToRemove.indexOf(',');
    indexToRemove = indexToRemove.slice(0,virgulaIndex);
    indexToRemove = selectedOption.map(function(e) { return e.cidade }).indexOf(indexToRemove);
    selectedOption.splice(indexToRemove, 1);



}

function limparPrincipal(element) {
    let child = element.parentNode;
    let node = child.parentNode;
    node.removeChild(child);
}

function auxStatus(value) {
    aux = aux+value;
}

function ordemAlfabetica() {
    let newResultados = [];
    let oldResultados = document.querySelectorAll("#resultados p");

    for (let i = 0; i < oldResultados.length; i++) {
        newResultados.push(oldResultados[i].textContent);
    }

    newResultados = newResultados.sort();
    
    resultadoHTML = document.querySelector("#resultados");
    resultadoHTML.innerHTML = '';
    for (let i = 0; i < newResultados.length; i++) {
        resultadoHTML.innerHTML += `<div class="itemEnviado"><p>${newResultados[i]}</p><span class="material-icons" title="Limpar" onclick="limparSpan(this)">close</span></div>`;
    }

}


function ordemEstados() {
    let newSelected = [];
    for (let i in selectedOption) {
        newSelected.push(selectedOption[i]);
    }
    
    console.log(newSelected)

    let newEstResults = [];
    let newEstados = newSelected.map(function(e) { return e.estado }).sort();

    console.log(newEstados);
    for (let i in selectedOption) {
        let boolean = false;
        let y = 0
        while (boolean == false) {            
            if (newSelected[y].estado == newEstados[i]) {
                
                newEstResults.push(`${newSelected[y].cidade}, ${newSelected[y].estado}`);
                boolean = true;
            } else {
                y++;
            }
        }
        newSelected[y].estado = 'incluso';
    }

    console.log(newEstResults);

    for (let i in newEstResults) {
        let virgula = newEstResults[i].indexOf(',');
        let newCidade = newEstResults[i].slice(0, virgula);

        let newEstadosubs = newEstResults[i].slice((virgula+2));
        selectedOption[i] = {cidade:`${newCidade}`, estado:`${newEstadosubs}`}
    }

    document.querySelector("#resultados").innerHTML = '';
    for (let i in selectedOption) {
        document.querySelector("#resultados").innerHTML += `<div class="itemEnviado"><p>${selectedOption[i].cidade}, ${selectedOption[i].estado}</p><span class="material-icons" title="Limpar" onclick="limparSpan(this)">close</span></div>`;
    }
}