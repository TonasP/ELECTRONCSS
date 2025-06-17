
const tabelacliente = document.getElementById('clientesTableDados');

const modalNomecliente = document.getElementById('cliente-nome');
const modalMatriculacliente = document.getElementById('cliente-cpf');
const modalIDcliente = document.getElementById('cliente-id');
const modalPlanocliente= document.getElementById('cliente-plano');
const modalNumerocliente = document.getElementById("cliente-numero");
const modalEmailcliente= document.getElementById('cliente-email')

const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');
botaoIncluir.addEventListener('click', limparDados)
botaoSalvar.addEventListener('click', funcaoSalvar)
botaoExcluir.addEventListener('click', excluircliente)




function mostrarDetalhes(nome, matricula, id) {
    modalIDcliente.value = id;
    modalMatriculacliente.value = matricula;
    modalNomecliente.value = nome;
}
function limparDados() {
    mostrarDetalhes('', '', '')

}
async function funcaoSalvar() {
    clienteNome = modalNomecliente.value
    clienteMatricula = modalMatriculacliente.value
    if (modalIDcliente.value === '') {
        if (clienteNome === '' || clienteMatricula === '') {
            return
        }
        await window.senacAPI.salvarcliente(clienteNome, clienteMatricula)
        carregarclientes();
        mostrarDetalhes('', '', '')
        return
    }
    else {

        await alterarcliente()
        carregarclientes();
        mostrarDetalhes('', '', '')
        return

    }

}

async function alterarcliente() {
    const pID = modalIDcliente.value;
    const pNome = modalNomecliente.value;
    const pMatricula = modalMatriculacliente.value;



    const retorno = await window.senacAPI.alterarcliente(pNome, pMatricula, pID);

    carregarclientes();
    mostrarDetalhes("", "", "");
}

async function excluircliente() {
    const pID = modalIDcliente.value;


    const retorno = await window.senacAPI.excluirclientes(pID);


    //após deleção atualiza a lista de clientes

    carregarclientes();
    mostrarDetalhes('', '', '')
}


async function carregarclientes() {


    const listaclientes = await window.senacAPI.buscarclientes();
    tabelacliente.innerHTML = "";

    console.log(listaclientes)
    listaclientes.forEach(criarLinhacliente)

    if (!listaclientes.length > 0) {

        tabelacliente.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhacliente(cliente) {
    //paragrafo.textContent = paragrafo.textContent + cliente.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = cliente.nome;
    linha.appendChild(celulanome);

    //matricula
    const celulaMatricula = document.createElement("td");
    celulaMatricula.textContent = cliente.matricula;
    linha.appendChild(celulaMatricula);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(cliente.nome, cliente.matricula, cliente.id) }
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


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelacliente.appendChild(linha);

}
carregarclientes()