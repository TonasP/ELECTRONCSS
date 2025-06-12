
const tabelaAgendamentos = document.getElementById('AgendamentosTableDados');
const modal = document.getElementById('modal');
const modalIDAgendamento = document.getElementById('Agendamento-id');


const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoIncluir = document.getElementById('btn-incluir');

const dropdownCliente = document.getElementById('cliente-nome');
const dropdownFuncionario = document.getElementById('funcionario-nome');
const dropdownData = document.getElementById('data');
const dropdownTipo = document.getElementById('tipo');



botaoIncluir.addEventListener('click', () => limparDadosModal());
botaoSalvar.addEventListener('click', salvarDadosAgendamento);
botaoExcluir.addEventListener('click', excluirAgendamento);


function mostrarDetalhes(agendamento) {
    modalIDAgendamento.value = agendamento.id; 
    dropdownCliente.value = agendamento.cliente_id;
    dropdownFuncionario.value = agendamento.funcionario_id;
    dropdownData.value = agendamento.data
    dropdownTipo.value = agendamento.tipo;
}


function limparDadosModal() {
    modalIDAgendamento.value = '';
    dropdownCliente.value = '';
    dropdownFuncionario.value = '';
    dropdownData.value = '';
    dropdownTipo.value = 'Aula de Musculação'; 
}


async function salvarDadosAgendamento() {
    const id = modalIDAgendamento.value;
    const clienteId = dropdownCliente.value;
    const funcionarioId = dropdownFuncionario.value;
    const dataMarcada = dropdownData.value;
    const tipoAtendimento = dropdownTipo.value;

    if (id) {
        
        await window.GymAPI.alterarAgendamento(id, clienteId, funcionarioId, dataMarcada, tipoAtendimento);
    } else {
       
        await window.GymAPI.salvarAgendamento(clienteId, funcionarioId, dataMarcada, tipoAtendimento);
    }

    await carregarAgendamentos();
    limparDadosModal();
}

async function excluirAgendamento() {
    const id = modalIDAgendamento.value;
    if (id) {
        await window.GymAPI.excluirAgendamentos(id);
        await carregarAgendamentos();
        limparDadosModal();
    }
}


async function carregarAgendamentos() {
    const agendamentos = await window.GymAPI.buscarAgendamentos();
    tabelaAgendamentos.innerHTML = ""; 

    if (!agendamentos || agendamentos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = 5;
        celula.textContent = "Nenhum agendamento encontrado.";
        linha.appendChild(celula);
        tabelaAgendamentos.appendChild(linha);
        return;
    }

    agendamentos.forEach(criarLinhaAgendamento);
    lucide.createIcons(); 
}


function criarLinhaAgendamento(agendamento) {
    const linha = document.createElement("tr");

    linha.innerHTML=''

    const celulanome = document.createElement('td');
    celulanome.textContent = agendamento.cliente;
    linha.appendChild(celulanome)
    
    const celulafuncionario = document.createElement('td')
    celulafuncionario.textContent =agendamento.funcionario
    linha.appendChild(celulafuncionario)

    const celuladata = document.createElement('td')
    celuladata.textContent = agendamento.data
    linha.appendChild(celuladata)

    const celulatipo = document.createElement("td")
    celulatipo.textContent = agendamento.tipo
    linha.appendChild(celulatipo)

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.innerHTML = `<i data-lucide="edit"></i>`;
    botao.addEventListener("click", () => mostrarDetalhes(agendamento));
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaAgendamentos.appendChild(linha);
}

/**
 * Funções para preencher os dropdowns de clientes e funcionários.
 * NOTA: Elas dependem de funções 'buscarClientes' e 'buscarFuncionarios' que precisam ser criadas no backend.
 */
async function preencherDropdownClientes() {
     const clientes = await window.GymAPI.buscarClientes(); // Exemplo
     dropdownCliente.innerHTML = "";
     clientes.forEach(cliente => {
         const option = document.createElement("option");
        option.value = cliente.id;
         option.textContent = cliente.nome;
       dropdownCliente.appendChild(option);
     });
}

async function preencherDropdownFuncionarios() {
     const funcionarios = await window.GymAPI.buscarFuncionarios(); // Exemplo
     dropdownFuncionario.innerHTML = "";
     funcionarios.forEach(funcionario => {
         const option = document.createElement("option");
         option.value = funcionario.id;
         option.textContent = funcionario.nome;
         dropdownFuncionario.appendChild(option);
     });
}

/**
 * Função de inicialização
 */
async function init() {
    // Ícones dos botões principais
    document.getElementById('iIncluir')?.setAttribute('data-lucide', 'plus');
    document.getElementById('iSalvar')?.setAttribute('data-lucide', 'save');
    document.getElementById('iExcluir')?.setAttribute('data-lucide', 'trash-2');
    document.getElementById('IFiltrar')?.setAttribute('data-lucide', 'filter');
    document.getElementById('IlimparFiltro')?.setAttribute('data-lucide', 'rotate-cw');
    lucide.createIcons();

    await carregarAgendamentos();
    await preencherDropdownClientes(); // Descomente quando a função for criada no backend
    await preencherDropdownFuncionarios(); // Descomente quando a função for criada no backend
}

// Inicia a aplicação
init();