const tabelanota = document.getElementById('notasTableDados');
const modalIDnota = document.getElementById('nota-id');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');
const botaoFiltrar = document.getElementById('btnFiltro')
const botaoLimparFiltro = document.getElementById("btn-limparFiltro")

const dropdownAluno = document.getElementById('aluno-nome');
const dropdownProfessor = document.getElementById('professor-nome');
const dropdownMateria = document.getElementById('materia-nome');
const dropdownAvaliacao = document.getElementById('avaliacao');
const dropDownFiltro = document.getElementById('filtro')

botaoFiltrar.addEventListener('click',filtrarNotas)
botaoLimparFiltro.addEventListener('click',limparFiltro)
botaoLimparFiltro.addEventListener('click', filtrarNotas)
botaoIncluir.addEventListener('click', limparDados);
botaoSalvar.addEventListener('click', funcaoSalvar);
botaoExcluir.addEventListener('click', excluirnota);

function mostrarDetalhes(alunoId, professorId, notaId, avaliacao, materiaId) {
    modalIDnota.value = notaId;
    dropdownAluno.value = alunoId;
    dropdownProfessor.value = professorId;
    dropdownMateria.value = materiaId;
    dropdownAvaliacao.value = avaliacao;
}

function limparDados() {
    mostrarDetalhes('', '', '', '', '');
}
function limparFiltro(){
    dropDownFiltro.value = 0
}

async function funcaoSalvar() {
    const alunoId = dropdownAluno.value;
    const professorId = dropdownProfessor.value;
    const materiaId = dropdownMateria.value;
    const avaliacaoNota = dropdownAvaliacao.value;


    if (modalIDnota.value === '') {
        await window.senacAPI.salvarNota(professorId, alunoId, materiaId, avaliacaoNota);
        limparDados()
    } else {
        await window.senacAPI.alterarNota(professorId, alunoId,  materiaId, avaliacaoNota, modalIDnota.value);
       limparDados()
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
async function filtrarNotas() {
    const filtro = dropDownFiltro.value; // obtém o valor já selecionado
    // Se a opção "Todas as Matérias" for selecionada (valor "0")
    if (filtro === '0' || filtro === 0) {
        await carregarnotas();
        return; // sai da função para não continuar filtrando
    }
    const filtroMaterias = await window.senacAPI.filtrarNota(filtro);
    tabelanota.innerHTML = '';
    
    if (!filtroMaterias || filtroMaterias.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.textContent = "Sem dados";
        linha.appendChild(celula);
        tabelanota.appendChild(linha);
    } else {
        filtroMaterias.forEach(criarLinhanota);
    }
    lucide.createIcons();
}
async function carregarnotas() {
    if (dropDownFiltro.value=0){
        filtrarNotas(filtro)
    }
    const listanotas = await window.senacAPI.buscarNota();
    tabelanota.innerHTML = "";

    if (!listanotas || listanotas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
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
    const celulaIconeAvaliacao = document.createElement("td")
    if (nota.avaliacao ==='Aprovado'){
    celulaIconeAvaliacao.innerHTML='<i data-lucide = "smile" class= "aprovado"></i>'
    linha.appendChild(celulaIconeAvaliacao)
}
    else{
    celulaIconeAvaliacao.innerHTML='<i data-lucide ="frown" class="reprovado"></i>'
    linha.appendChild(celulaIconeAvaliacao)    
    }
    

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
        mostrarDetalhes(nota.aluno_id, nota.professor_id, nota.id, nota.avaliacao, nota.materia_id);
    });
    
   const iconeIncluir = document.getElementById('iIncluir');
if (iconeIncluir) iconeIncluir.setAttribute('data-lucide', 'plus');

const iconeSalvar = document.getElementById('iSalvar');
if (iconeSalvar) iconeSalvar.setAttribute('data-lucide', 'save-all');

const iconeExcluir = document.getElementById('iExcluir');
if (iconeExcluir) iconeExcluir.setAttribute('data-lucide', 'trash2');

const iconeFiltrar = document.getElementById('IFiltrar');
if (iconeFiltrar) iconeFiltrar.setAttribute('data-lucide', 'list-filter');

const iconeLimparFiltro = document.getElementById('IlimparFiltro');
if (iconeLimparFiltro) iconeLimparFiltro.setAttribute('data-lucide', 'refresh-ccw');
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelanota.appendChild(linha);
}

async function preencherDropdownAlunos() {
    const alunos = await window.senacAPI.buscarAlunos();
    dropdownAluno.innerHTML = "";

    alunos.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.id;
        option.textContent = aluno.nome;
        dropdownAluno.appendChild(option);
    });
}

async function preencherDropdownProfessores() {
    const professores = await window.senacAPI.buscarProf();
    dropdownProfessor.innerHTML = "";

    professores.forEach(prof => {
        const option = document.createElement("option");
        option.value = prof.id;
        option.textContent = prof.nome;
        dropdownProfessor.appendChild(option);
    });
}

async function preencherDropdownMaterias() {
    const materias = await window.senacAPI.buscarMateria();
    dropdownMateria.innerHTML = "";

    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia.id;
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
async function dropDownfiltrarMateria(){
    const materias = await window.senacAPI.buscarMateria()
    dropDownFiltro.innerHTML =''

    const todasAsOpcoes = document.createElement('option')
    todasAsOpcoes.value = 0
    todasAsOpcoes.textContent ="Todas as Matérias"

    dropDownFiltro.appendChild(todasAsOpcoes)
    materias.forEach(materia =>{
        const option = document.createElement("option")
        option.value= materia.id
        option.textContent= materia.nome
        dropDownFiltro.appendChild(option)
    })
}

async function preencherDropdowns() {
    await preencherDropdownAlunos();
    await preencherDropdownProfessores();
    await preencherDropdownMaterias();
    await preencherDropdownAvaliacao();
    await dropDownfiltrarMateria()
}

// Inicializar
preencherDropdowns();
carregarnotas();


