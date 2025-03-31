import Cliente from "../model/Cliente.js";
import { hashPassword, comparePassword } from '../security/authUtils.js';

export default class ClienteController {

  static async create(req, res) {
    try {
      const { nome, telefone, email, senha, cpf, data_nascimento, sexo } = req.body;
  
      const senhaCriptografada = await hashPassword(senha);
  
      const cliente = await Cliente.create(nome, telefone, email, senhaCriptografada, cpf, data_nascimento, sexo);
  
      if (!cliente) {
        return res.status(500).json({ success: false, message: 'Erro ao cadastrar o cliente.' });
      }
  
      return res.status(201).json({
        success: true,
        message: 'Cadastro realizado com sucesso!',
        cliente: cliente
      });
  
    } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).json({ success: false, message: 'Erro ao tentar cadastrar. Por favor, tente novamente.' });
    }
  }
  

  static async findAll(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const cliente = await Cliente.findById(id);
      if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { nome, telefone, email, senha, cpf, data_nascimento, sexo } = req.body;
      const updated = await Cliente.update(id, nome, telefone, email, senha, cpf, data_nascimento, sexo);
      if (!updated) return res.status(404).json({ error: "Cliente não encontrado" });
      res.json({ message: "Cliente atualizado com sucesso" });
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

      const deleted = await Cliente.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      res.json({ message: "Cliente removido com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res){
    try{
      const { email, senha } = req.body;
      const cliente = await Cliente.findByEmail(email);
      const redirectTo = req.session.redirectTo || '/';
      
      if (!cliente){
        return res.status(404).jason({ error: 'Cliente não encontrado' });
      }

      const senhaValida = await comparePassword(senha, cliente.senha);

      if (!senhaValida){
        res.redirect('/login.html');
      }

      req.session.autenticado = true;
      res.redirect(redirectTo);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
}
