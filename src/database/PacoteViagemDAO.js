import conectar from "./conexao.js";

export default class PacoteViagemDAO {
  static async create(pacote) {
    const conexao = await conectar();
    const sql =
      "INSERT INTO pacotesviagem (destino, data_partida, data_retorno, preco, descricao) VALUES (?, ?, ?, ?, ?)";
    const values = [
      pacote.destino,
      pacote.data_partida,
      pacote.data_retorno,
      pacote.preco,
      pacote.descricao
    ];
    await conexao.execute(sql, values);
    await conexao.release();
  }

  static async findAll() {
    const conexao = await conectar();
    const sql = "SELECT * FROM pacotesviagem";
    const [rows] = await conexao.execute(sql);
    await conexao.release();
    return rows;
  }

  static async findById(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM pacotesviagem WHERE id = ?";
    const [rows] = await conexao.execute(sql, [id]);
    await conexao.release();
    return rows.length ? rows[0] : null;
  }

  static async update(pacote) {
    const conexao = await conectar();

    const pacoteAtual = await PacoteViagemDAO.findById(pacote.id);
    if (!pacoteAtual) {
      await conexao.release();
      return null;
    }

    const destino = pacote.destino ?? pacoteAtual.destino;
    const data_partida = pacote.data_partida ?? pacoteAtual.data_partida;
    const data_retorno = pacote.data_retorno ?? pacoteAtual.data_retorno;
    const preco = pacote.preco ?? pacoteAtual.preco;
    const descricao = pacote.descricao ?? pacoteAtual.descricao;

    const sql = `
      UPDATE pacotesviagem
      SET destino = ?, data_partida = ?, data_retorno = ?, preco = ?, descricao = ?
      WHERE id = ?
    `;

    const values = [destino, data_partida, data_retorno, preco, descricao, pacote.id];

    await conexao.execute(sql, values);
    await conexao.release();
    return true;
  }


  static async delete(id) {
    const conexao = await conectar();
    const sqlDelete = "DELETE FROM pacotesviagem WHERE id = ?";
    await conexao.execute(sqlDelete, [id]);
    await conexao.release();
    return true;
  }
}
