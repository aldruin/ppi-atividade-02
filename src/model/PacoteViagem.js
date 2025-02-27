import PacoteViagemDAO from "../database/PacoteViagemDAO.js";

export default class PacoteViagem {
  constructor(id, destino, data_partida, data_retorno, preco, descricao) {
    this.id = id;
    this.destino = destino;
    this.data_partida = data_partida;
    this.data_retorno = data_retorno;
    this.preco = preco;
    this.descricao = descricao;
  }

  static async create(destino, data_partida, data_retorno, preco, descricao) {
    const pacote = new PacoteViagem(null, destino, data_partida, data_retorno, preco, descricao);
    const id = await PacoteViagemDAO.create(pacote);
    return id;
  }

  static async findAll() {
    const rows = await PacoteViagemDAO.findAll();
    return rows.map(
      (row) =>
        new PacoteViagem(
          row.id,
          row.destino,
          row.data_partida,
          row.data_retorno,
          row.preco,
          row.descricao
        )
    );
  }

  static async findById(id) {
    const row = await PacoteViagemDAO.findById(id);
    if (!row) return null;
    return new PacoteViagem(
      row.id,
      row.destino,
      row.data_partida,
      row.data_retorno,
      row.preco,
      row.descricao
    );
  }

  static async update(id, destino, data_partida, data_retorno, preco, descricao) {
    const pacote = new PacoteViagem(id, destino, data_partida, data_retorno, preco, descricao);
    const updated = await PacoteViagemDAO.update(pacote);
    return updated;
  }

  static async delete(id) {
    const deleted = await PacoteViagemDAO.delete(id);
    return deleted;
  }
}
