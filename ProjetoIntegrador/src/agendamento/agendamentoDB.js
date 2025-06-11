const db = require('../db');

async function buscarAgendamentos() {
    const result = await db.query(`
        select 
    clientes.nome as cliente, funcionarios.nome as funcionario, 
    clientes.id as cliente_id, funcionarios.id as funcionario_id.
    agendamentos.data_marcada as data, agendamentos.tipo as tipo
    from "GymControl".agendamentos 
    join "GymControl".clientes on clientes.id = agendamentos.id_cliente
    join "GymControl".funcionarios on funcionarios.id = agendamentos.id_funcionario`)
}
async function deletarAgendamento(event, agendamentoId) {
    event = ''
    const resultado = await db.query('DELETE FROM "GymControl".agendamentos WHERE ID = $1', [agendamentoId]);
    return resultado.rows;

}
async function alterarAgendamento(event, id_cliente, id_funcionario, data_marcada, tipo) {
    event = ''
    const resultado2 = await db.query('UPDATE "GymControl".agendamentos id_cliente=$2, id_funcionario=$3, data_marcada=$4, tipo= WHERE id = $1', [id_cliente, id_funcionario, data_marcada, tipo]);
    return resultado2.rows;

}
async function salvarAgendamento(event, id_cliente, id_funcionario, data_marcada, tipo) {
    event = ''
    const resultado = await db.query('INSERT INTO "GymControl".agendamentos(id_cliente, id_funcionario, data_marcada, tipo)VALUES ($1, $2,$3,$4);', [id_cliente, id_funcionario, data_marcada, tipo]);
    return resultado.rows;
}

module.exports = {
    buscarAgendamentos,
    deletarAgendamento,
    alterarAgendamento,
    salvarAgendamento,
}