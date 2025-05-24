const { contextBridge, ipcRenderer } = require('electron')

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function excluirAlunos(pID) {
    return ipcRenderer.invoke('deletar-alunos', pID);

}
function alterarAluno(pNome, pMatricula, pID) {
    return ipcRenderer.invoke('alterar-aluno', pNome, pMatricula, pID);
}
function salvarAluno(alunoNome, alunoMatricula) {
    return ipcRenderer.invoke('salvar-aluno', alunoNome, alunoMatricula)
}
function buscarProf() {
    return ipcRenderer.invoke('buscar-prof');
}

function excluirProf(profID) {
    return ipcRenderer.invoke('deletar-prof', profID);

}
function alterarProf(profNome, profMatricula, profID) {
    return ipcRenderer.invoke('alterar-prof', profNome, profMatricula, profID);
}
function salvarProf(profNome, profMatricula) {
    return ipcRenderer.invoke('salvar-prof', profNome, profMatricula)
}

contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        alterarAluno: alterarAluno,
        salvarAluno: salvarAluno,
        buscarProf: buscarProf,
        excluirProf: excluirProf,
        alterarProf: alterarProf,
        salvarProf: salvarProf,

    }


)
