const db = require('../db');
const { ipcMain } = require('electron')

async function buscarClientes() {

    const resultado = await db.query('SELECT * FROM"GymControl".clientes order by id')

    return resultado.rows;
}

async function deletarCliente(event,clienteId){    
    event =''
    const resultado = await db.query('DELETE FROM"GymControl".clientes WHERE ID = $1',[clienteId]);
    return resultado.rows;

}
async function alterarCliente(event, clienteid,clienteNome, clienteCpf, data_nascimento, plano_id, numero_celular, email) {
    event =''
    const resultado2 = await db.query(`UPDATE "GymControl".clientes
	nome=$1, cpf=$2, data_nascimento=$3, plano_id=$4, numero_celular=$5, email=$6
	WHERE id = $7;`, [clienteNome, clienteCpf, data_nascimento, plano_id, numero_celular, email, clienteid]);
    return resultado2.rows;

}
async function salvarCliente(event,clienteNome, clienteCpf, data_nascimento, plano_id, numero_celular, email){
    event = ''
    const resultado = await db.query('INSERT INTO"GymControl".clientes(nome, cpf, data_nascimento, plano_id, numero_celular, email)VALUES ($1, $2, $3, $4, $5, $6);', [clienteNome, clienteCpf, data_nascimento, plano_id, numero_celular, email]);
    return resultado.rows;
}

module.exports = {
   buscarClientes,
   deletarCliente,
   alterarCliente,
   salvarCliente,
}