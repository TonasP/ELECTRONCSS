const paragrafo = document.getElementById('teste');
const tabelanota = document.getElementById('notasTableDados');
const modalNomenota = document.getElementById('nota-nome');
const modaldescricaonota = document.getElementById('nota-descricao');
const modalIDnota = document.getElementById('nota-id');
const modalCursoNotaID = document.getElementById('nota-curso-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');

botaoIncluir.addEventListener('click', limparDados);
botaoSalvar.addEventListener('click', funcaoSalvar);
botaoExcluir.addEventListener('click', excluirnota);

function mostrarDetalhes(nome, descricao, id, idcurso) {
    modalIDnota.value = id;
    modaldescricaonota.value = descricao;
    modalNomenota.value = nome;
    modalCursoNotaID.value = (typeof idcurso === 'object') ? String(idcurso.id) : String(idcurso);

}

function limparDados() {
    mostrarDetalhes('', '', '', '');
}

async function funcaoSalvar() {
    const notaNome = modalNomenota.value;
    const notadescricao = modaldescricaonota.value;
    const notaCursoId = modalCursoNotaID.value;

    if (modalIDnota.value === '') {
        if (notaNome === '' || notadescricao === '') {
            return;
        }
        await window.senacAPI.salvarNota(notaNome, notadescricao, notaCursoId);
        carregarnotas();
        mostrarDetalhes('', '', '', '');
        return;
    } else {
        await alterarnota();
        mostrarDetalhes('', '', '', '');
        return;
    }
}

async function alterarnota() {
    const pID = modalIDnota.value;
    const pNome = modalNomenota.value;
    const pdescricao = modaldescricaonota.value;
    const pcursoID = modalCursoNotaID.value;

    await window.senacAPI.alterarNota(pNome, pdescricao, pcursoID, pID );
    carregarnotas();
    mostrarDetalhes("", "", "", '');
}

async function excluirnota() {
    const pID = modalIDnota.value;
    await window.senacAPI.excluirNota(pID);
    carregarnotas();
    mostrarDetalhes('', '', '', '');
}

async function carregarnotas() {
    const listanotas = await window.senacAPI.buscarNota();
    
    tabelanota.innerHTML = "";

    listanotas.forEach(criarLinhanota);

    if (listanotas.length === 0) {
        tabelanota.textContent = "sem dados";
    }

    atualizarDropdownComIdCurso();
    lucide.createIcons(); // renderiza os ícones do Lucide
}

function criarLinhanota(nota) {
    const linha = document.createElement("tr");

    const celulanome = document.createElement("td");
    celulanome.textContent = nota.nome;
    linha.appendChild(celulanome);

    const celuladescricao = document.createElement("td");
    celuladescricao.textContent = nota.descricao;
    linha.appendChild(celuladescricao);

    const celulaCursoId = document.createElement("td");
    celulaCursoId.textContent = typeof nota.idcurso === 'object'
        ? `${nota.idcurso.id} - ${nota.idcurso.nome}`
        : nota.idcurso;
    linha.appendChild(celulaCursoId);

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click", function () {
        mostrarDetalhes(nota.nome, nota.descricao, nota.id, nota.idcurso);
    });

    const icone = document.createElement("i");
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelanota.appendChild(linha);

    // Atualiza os ícones dos botões principais
    const iconeIncluir = document.getElementById('iIncluir');
    iconeIncluir.setAttribute('data-lucide', 'plus');
    const iconeSalvar = document.getElementById('iSalvar');
    iconeSalvar.setAttribute('data-lucide', 'save-all');
    const iconeExcluir = document.getElementById('iExcluir');
    iconeExcluir.setAttribute('data-lucide', 'trash2');
}

function criarDropDown(cursos) {
    const dropdown = document.getElementById("nota-curso-id");
    dropdown.innerHTML = ""; // limpa o dropdown antes de adicionar

    cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso.id;
        option.textContent = `${curso.id} - ${curso.nome}`;
        dropdown.appendChild(option);
    });
}

async function atualizarDropdownComIdCurso() {
    const dropdown = document.getElementById("nota-curso-id");
    dropdown.innerHTML = "";

    const cursos = await window.senacAPI.buscarCurso();

    cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso.id;
        option.textContent = `${curso.id} - ${curso.nome}`;
        dropdown.appendChild(option);
    });
}

carregarnotas();
