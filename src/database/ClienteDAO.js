import conectar from "./conexao.js";

export default class ClienteDAO {
  static async create(cliente) {
    const conexao = await conectar();
    const sql =
      "INSERT INTO clientes (nome, telefone, email, senha, cpf, data_nascimento, sexo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      cliente.nome,
      cliente.telefone,
      cliente.email,
      cliente.senha,
      cliente.cpf,
      cliente.data_nascimento,
      cliente.sexo
    ];
    await conexao.execute(sql, values);
    await conexao.release();
  }

  static async findAll() {
    const conexao = await conectar();
    const sql = "SELECT * FROM clientes";
    const [rows] = await conexao.execute(sql);
    await conexao.release();
    return rows;
  }

  static async findById(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM clientes WHERE id = ?";
    const [rows] = await conexao.execute(sql, [id]);
    await conexao.release();
    return rows.length ? rows[0] : null;
  }

  static async findByEmail(email) {
    const conexao = await conectar();
    const sql = "SELECT * FROM clientes WHERE email = ?";
    const [rows] = await conexao.execute(sql, [email]);
    await conexao.release();
    return rows.length ? rows[0] : null;
  }

  static async update(cliente) {
    const conexao = await conectar();

    const clienteAtual = await ClienteDAO.findById(cliente.id);
    if (!clienteAtual) {
      await conexao.release();
      return null;
    }

    const nome = cliente.nome ?? clienteAtual.nome;
    const telefone = cliente.telefone ?? clienteAtual.telefone;
    const email = cliente.email ?? clienteAtual.email;
    const senha = cliente.senha ?? clienteAtual.senha;
    const cpf = cliente.cpf ?? clienteAtual.cpf;
    const data_nascimento = cliente.data_nascimento ?? clienteAtual.data_nascimento;
    const sexo = cliente.sexo ?? clienteAtual.sexo;

    const sql = `
      UPDATE clientes
      SET nome = ?, telefone = ?, email = ?, senha = ?, cpf = ?, data_nascimento = ?, sexo = ?
      WHERE id = ?
    `;

    const values = [nome, telefone, email, senha, cpf, data_nascimento, sexo, cliente.id];

    await conexao.execute(sql, values);
    await conexao.release();
    return true;
  }


  static async delete(id) {
    const conexao = await conectar();
    const sqlDelete = "DELETE FROM clientes WHERE id = ?";
    await conexao.execute(sqlDelete, [id]);
    await conexao.release();
    return true;
  }
}
