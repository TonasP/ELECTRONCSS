const db = require('../db');
const { ipcMain } = require('electron')
async function buscarnota() {

    //const resultado = await db.query('select notas.id as id, alunos.nome as aluno, professores.nome as professor, materias.nome as materia, notas.avaliacao  from notas join public.professores on professores.id = notas.id_professor join public.alunos on alunos.id = notas.id_aluno join public.materias on materias.id = notas.id_materia ')
    const resultado = await db.query('select * from public.notas')
    return resultado.rows;

}

async function deletarnota(event,notaId){  
    event = ''  
    const resultado = await db.query('DELETE FROM notas WHERE id = $1',[notaId]);
    return resultado.rows;

}
async function alterarnota(event,notaProf, notaAluno, notaMateria, notaId) {
   event =''
    const resultado2 = await db.query('UPDATE public.notas SET id_professor = $1, id_aluno = $2, id_materia = $3 WHERE id = $4', [notaProf, notaAluno, notaMateria, notaId]);
    return resultado2.rows;

}
async function salvarnota(event,notaProf, notaAluno, notaMateria){
   event=''
    const resultado = await db.query('INSERT INTO public.notas(id_professor, id_aluno, id_materia)VALUES ($1, $2, $3);', [notaProf, notaAluno, notaMateria]);
    return resultado.rows;
}



module.exports = {
    buscarnota,
    deletarnota,
    alterarnota,
    salvarnota,
    
}