// ======= nota.js (JavaScript principal) =======
const tabelanota = document.getElementById('notasTableDados');
const modalIDnota = document.getElementById('nota-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');

botaoIncluir.addEventListener('click', limparDados);
botaoSalvar.addEventListener('click', funcaoSalvar);
botaoExcluir.addEventListener('click', excluirnota);

function mostrarDetalhes(aluno, professor, id, avaliacao) {
    modalIDnota.value = id;

    const dropdownAluno = document.getElementById('aluno-nome');
    dropdownAluno.value = typeof aluno === 'object' ? aluno.id : aluno;

    const dropdownProfessor = document.getElementById('professor-nome');
    dropdownProfessor.value = typeof professor === 'object' ? professor.id : professor;

    const dropdownMateria = document.getElementById('materia-nome');
    dropdownMateria.value = typeof avaliacao === 'object' && avaliacao.materia ? avaliacao.materia.id : avaliacao.materia || '';

    const dropdownAvaliacao = document.getElementById('avaliacao');
    dropdownAvaliacao.value = typeof avaliacao === 'object' ? avaliacao.nota : avaliacao || '';
}

function limparDados() {
    mostrarDetalhes('', '', '', '');
}

async function funcaoSalvar() {
    const alunoId = document.getElementById('aluno-nome').value;
    const professorId = document.getElementById('professor-nome').value;
    const materiaId = document.getElementById('materia-nome').value;
    const avaliacaoNota = document.getElementById('avaliacao').value;

    if (!alunoId || !professorId || !materiaId || !avaliacaoNota) return;

    if (modalIDnota.value === '') {
        await window.senacAPI.salvarNota(alunoId, professorId, { materia: materiaId, nota: avaliacaoNota });
    } else {
        await window.senacAPI.alterarNota(alunoId, professorId, { materia: materiaId, nota: avaliacaoNota }, modalIDnota.value);
    }

    carregarnotas();
    mostrarDetalhes('', '', '', '');
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

    lucide.createIcons();
}

function criarLinhanota(nota) {
    const linha = document.createElement("tr");

    const celulaAluno = document.createElement("td");
    celulaAluno.textContent = typeof nota.aluno === 'object' ? nota.aluno.nome : nota.aluno;
    linha.appendChild(celulaAluno);

    const celulaMateria = document.createElement("td");
    celulaMateria.textContent = typeof nota.avaliacao === 'object' && nota.avaliacao.materia && typeof nota.avaliacao.materia === 'object' ? nota.avaliacao.materia.nome : nota.avaliacao.materia;
    linha.appendChild(celulaMateria);

    const celulaProfessor = document.createElement("td");
    celulaProfessor.textContent = typeof nota.professor === 'object' ? nota.professor.nome : nota.professor;
    linha.appendChild(celulaProfessor);

    const celulaAvaliacao = document.createElement("td");
    celulaAvaliacao.textContent = typeof nota.avaliacao === 'object' ? nota.avaliacao.nota : nota.avaliacao;
    linha.appendChild(celulaAvaliacao);

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click", function () {
        mostrarDetalhes(nota.aluno, nota.professor, nota.id, nota.avaliacao);
    });

    const icone = document.createElement("i");
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelanota.appendChild(linha);

    document.getElementById('iIncluir').setAttribute('data-lucide', 'plus');
    document.getElementById('iSalvar').setAttribute('data-lucide', 'save-all');
    document.getElementById('iExcluir').setAttribute('data-lucide', 'trash2');

    lucide.createIcons();
}

async function preencherDropdownAlunos() {
    const alunos = await window.senacAPI.buscarAlunos();
    const dropdown = document.getElementById("aluno-nome");
    dropdown.innerHTML = "";

    alunos.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.id;
        option.textContent = `${aluno.id} - ${aluno.nome}`;
        dropdown.appendChild(option);
    });
}

async function preencherDropdownProfessores() {
    const professores = await window.senacAPI.buscarProf();
    const dropdown = document.getElementById("professor-nome");
    dropdown.innerHTML = "";

    professores.forEach(prof => {
        const option = document.createElement("option");
        option.value = prof.id;
        option.textContent = `${prof.id} - ${prof.nome}`;
        dropdown.appendChild(option);
    });
}

async function preencherDropdownMaterias() {
    const materias = await window.senacAPI.buscarMateria();
    const dropdown = document.getElementById("materia-nome");
    dropdown.innerHTML = "";

    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia.id;
        option.textContent = `${materia.id} - ${materia.nome}`;
        dropdown.appendChild(option);
    });
}

function preencherDropdownAvaliacao() {
    const opcoes = ['Aprovado', 'Reprovado'];
    const dropdown = document.getElementById("avaliacao");
    dropdown.innerHTML = "";

    opcoes.forEach(avaliacao => {
        const option = document.createElement("option");
        option.value = avaliacao;
        option.textContent = avaliacao;
        dropdown.appendChild(option);
    });
}

async function preencherDropdowns() {
    await preencherDropdownAlunos();
    await preencherDropdownProfessores();
    await preencherDropdownMaterias();
    preencherDropdownAvaliacao();
}
     preencherDropdowns();
     carregarnotas();
