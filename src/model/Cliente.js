import ClienteDAO from "../database/ClienteDAO.js";


export default class Cliente{
  constructor(id, nome, telefone, email, senha, cpf, data_nascimento, sexo){
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.sexo = sexo;
  }

  static async create(nome, telefone, email, senha, cpf, data_nascimento, sexo) {
      const cliente = new Cliente(null, nome, telefone, email, senha, cpf, data_nascimento, sexo);

      const exist = await ClienteDAO.findByEmail(email);
      if (exist) {
        return { message: 'Email de cliente já cadastrado' };
      }

      const id = await ClienteDAO.create(cliente);
      return cliente;
    }
  
    static async findAll() {
      const rows = await ClienteDAO.findAll();
      return rows.map(
        (row) =>
          new Cliente(
            row.id,
            row.nome,
            row.telefone,
            row.email,
            row.senha,
            row.cpf,
            row.data_nascimento,
            row.sexo
          )
      );
    }
  
    static async findById(id) {
      const row = await ClienteDAO.findById(id);
      if (!row) return null;
      return new Cliente(
        row.id,
        row.nome,
        row.telefone,
        row.email,
        row.senha,
        row.cpf,
        row.data_nascimento,
        row.sexo
      );
    }

    static async findByEmail(email) {
      const row = await ClienteDAO.findByEmail(email);
      if (!row) return null;
      return new Cliente(
        row.id,
        row.nome,
        row.telefone,
        row.email,
        row.senha,
        row.cpf,
        row.data_nascimento,
        row.sexo
      );
    }
  
    static async update(id, nome, telefone, email, senha, cpf, data_nascimento, sexo) {
      const cliente = new Cliente(id, nome, telefone, email, senha, cpf, data_nascimento, sexo);
      const updated = await ClienteDAO.update(cliente);
      return updated;
    }
  
    static async delete(id) {
      const deleted = await ClienteDAO.delete(id);
      return deleted;
    }

}