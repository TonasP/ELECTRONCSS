

const paragrafo = document.getElementById('teste');
const tabelamateria = document.getElementById('materiasTableDados');
const modalNomemateria = document.getElementById('materia-nome');
const modaldescricaomateria = document.getElementById('materia-descricao');
const modalIDmateria = document.getElementById('materia-id');
const modalCursoMateriaID = document.getElementById('materia-curso-id')
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');
botaoIncluir.addEventListener('click', limparDados)
botaoSalvar.addEventListener('click', funcaoSalvar)
botaoExcluir.addEventListener('click', excluirmateria)




function mostrarDetalhes(nome, descricao, id, idcurso) {
    modalIDmateria.value = id;
    modaldescricaomateria.value = descricao;
    modalNomemateria.value = nome
    modalCursoMateriaID.value= idcurso;
}
function limparDados() {
    mostrarDetalhes('', '', '','')

}
async function funcaoSalvar() {
    materiaNome = modalNomemateria.value
    materiadescricao = modaldescricaomateria.value
    if (modalIDmateria.value === '') {
        if (materiaNome === '' || materiadescricao === '') {
            return
        }
        await window.senacAPI.salvarMateria(materiaNome, materiadescricao)
        carregarmaterias();
        mostrarDetalhes('', '', '','')
        return
    }
    else {

        await alterarmateria()
        carregarmaterias();
        mostrarDetalhes('', '', '','')
        return

    }

}

async function alterarmateria() {
    const pID = modalIDmateria.value;
    const pNome = modalNomemateria.value;
    const pdescricao = modaldescricaomateria.value;
    const pcursoID= modalCursoMateriaID.value



    const retorno = await window.senacAPI.alterarMateria(pNome, pdescricao, pID, pcursoID);

    carregarmaterias();
    mostrarDetalhes("", "", "",'');
}

async function excluirmateria() {
    const pID = modalIDmateria.value;


    const retorno = await window.senacAPI.excluirMateria(pID);


    //após deleção atualiza a lista de materias

    carregarmaterias();
    mostrarDetalhes('', '', '','')
}


async function carregarmaterias() {


    const listamaterias = await window.senacAPI.buscarMateria();
    tabelamateria.innerHTML = "";

    console.log(listamaterias)
    listamaterias.forEach(criarLinhamateria)

    if (!listamaterias.length > 0) {

        tabelamateria.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhamateria(materia) {
    //paragrafo.textContent = paragrafo.textContent + materia.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = materia.nome;
    linha.appendChild(celulanome);

    //descricao
    const celuladescricao = document.createElement("td");
    celuladescricao.textContent = materia.descricao;
    linha.appendChild(celuladescricao);
    //id do curso
    const celulaCursoId = document.createElement("td");
    celuladescricao.textContent = materia.idcurso;
    linha.appendChild(celulaCursoId);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(materia.nome, materia.descricao, materia.id, materia.idcurso) }
    );


    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    const iconeIncluir = document.getElementById('iIncluir')
    iconeIncluir.setAttribute('data-lucide', 'plus')
    const iconeSalvar = document.getElementById('iSalvar')
    iconeSalvar.setAttribute('data-lucide', 'save-all')
    const iconeExcluir = document.getElementById('iExcluir')
    iconeExcluir.setAttribute('data-lucide', 'trash2')

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com descricao,nome e botao à tabela
    tabelamateria.appendChild(linha);

}
carregarmaterias()