import PacoteViagem from "../model/PacoteViagem.js";

export default class PacoteViagemController {
  static async create(req, res) {
    try {
      const { destino, data_partida, data_retorno, preco, descricao } = req.body;
      const pacote = await PacoteViagem.create(destino, data_partida, data_retorno, preco, descricao);

      return res.status(201).json({
        success: true,
        message: 'Pacote cadastrado com sucesso!',
        cliente: pacote
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const pacotes = await PacoteViagem.findAll();
      res.json(pacotes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const pacote = await PacoteViagem.findById(id);
      if (!pacote) return res.status(404).json({ error: "Pacote não encontrado" });
      res.json(pacote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { destino, data_partida, data_retorno, preco, descricao } = req.body;
      const updated = await PacoteViagem.update(id, destino, data_partida, data_retorno, preco, descricao);
      if (!updated) return res.status(404).json({ error: "Pacote não encontrado" });
      res.json({ message: "Pacote atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const deleted = await PacoteViagem.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Pacote não encontrado" });
      }

      res.json({ message: "Pacote removido com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


}
