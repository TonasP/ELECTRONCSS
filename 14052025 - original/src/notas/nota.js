const tabelanota = document.getElementById('notasTableDados');
const modalIDnota = document.getElementById('nota-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');

const dropdownAluno = document.getElementById('aluno-nome');
const dropdownProfessor = document.getElementById('professor-nome');
const dropdownMateria = document.getElementById('materia-nome');
const dropdownAvaliacao = document.getElementById('avaliacao');

botaoIncluir.addEventListener('click', limparDados);
botaoSalvar.addEventListener('click', funcaoSalvar);
botaoExcluir.addEventListener('click', excluirnota);

function mostrarDetalhes(aluno, professor, id, avaliacao, materia) {
    if (!modalIDnota || !dropdownAluno || !dropdownProfessor || !dropdownMateria || !dropdownAvaliacao) {
        console.error("Um ou mais elementos esperados não existem no DOM.");
        return;
    }

    modalIDnota.value = id;
    dropdownAluno.value = aluno;
    dropdownProfessor.value = professor;
    dropdownMateria.value = materia;
    dropdownAvaliacao.value = avaliacao;
}

function limparDados() {
    mostrarDetalhes('', '', '', '', '');
}

async function funcaoSalvar() {
    const alunoId = dropdownAluno.value;
    const professorId = dropdownProfessor.value;
    const materiaId = dropdownMateria.value;
    const avaliacaoNota = dropdownAvaliacao.value;

    if (!alunoId || !professorId || !materiaId || !avaliacaoNota) return;

    if (modalIDnota.value === '') {
        await window.senacAPI.salvarNota(alunoId, professorId, materiaId, avaliacaoNota);
    } else {
        await window.senacAPI.alterarNota(alunoId, professorId, materiaId, avaliacaoNota, modalIDnota.value);
    }

    await carregarnotas();
    limparDados();
}

async function excluirnota() {
    const pID = modalIDnota.value;
    if (pID) {
        await window.senacAPI.excluirNota(pID);
        await carregarnotas();
        limparDados();
    }
}

async function carregarnotas() {
    const listanotas = await window.senacAPI.buscarNota();
    tabelanota.innerHTML = "";

    if (!listanotas || listanotas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = 5;
        celula.textContent = "Sem dados";
        linha.appendChild(celula);
        tabelanota.appendChild(linha);
        return;
    }

    listanotas.forEach(criarLinhanota);
    lucide.createIcons();
}

function criarLinhanota(nota) {
    const linha = document.createElement("tr");

    const celulaAluno = document.createElement("td");
    celulaAluno.textContent = nota.aluno;
    linha.appendChild(celulaAluno);

    const celulaMateria = document.createElement("td");
    celulaMateria.textContent = nota.materia;
    linha.appendChild(celulaMateria);

    const celulaProfessor = document.createElement("td");
    celulaProfessor.textContent = nota.professor;
    linha.appendChild(celulaProfessor);

    const celulaAvaliacao = document.createElement("td");
    celulaAvaliacao.textContent = nota.avaliacao;
    linha.appendChild(celulaAvaliacao);

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.innerHTML = `<i data-lucide="edit"></i>`;
    botao.addEventListener("click", () => {
        mostrarDetalhes(nota.aluno, nota.professor, nota.id, nota.avaliacao, nota.materia);
    });

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelanota.appendChild(linha);
}

async function preencherDropdownAlunos() {
    const alunos = await window.senacAPI.buscarAlunos();
    dropdownAluno.innerHTML = "";

    alunos.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.nome;
        option.textContent = aluno.nome;
        dropdownAluno.appendChild(option);
    });
}

async function preencherDropdownProfessores() {
    const professores = await window.senacAPI.buscarProf();
    dropdownProfessor.innerHTML = "";

    professores.forEach(prof => {
        const option = document.createElement("option");
        option.value = prof.nome;
        option.textContent = prof.nome;
        dropdownProfessor.appendChild(option);
    });
}

async function preencherDropdownMaterias() {
    const materias = await window.senacAPI.buscarMateria();
    dropdownMateria.innerHTML = "";

    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia.nome;
        option.textContent = materia.nome;
        dropdownMateria.appendChild(option);
    });
}

function preencherDropdownAvaliacao() {
    const opcoes = ['Aprovado', 'Reprovado'];
    dropdownAvaliacao.innerHTML = "";

    opcoes.forEach(avaliacao => {
        const option = document.createElement("option");
        option.value = avaliacao;
        option.textContent = avaliacao;
        dropdownAvaliacao.appendChild(option);
    });
}

async function preencherDropdowns() {
    await preencherDropdownAlunos();
    await preencherDropdownProfessores();
    await preencherDropdownMaterias();
    preencherDropdownAvaliacao();
}

// Inicializar
preencherDropdowns();
carregarnotas();
