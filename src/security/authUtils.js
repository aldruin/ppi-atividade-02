import bcrypt from 'bcrypt';
import crypto from 'crypto';

const saltRounds = 10;

export const hashPassword = async (senha) => {
  try{
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
  } catch (error) {
    throw new Error('Erro ao criptografar a senha: ' + error.message);
  }
}

export const comparePassword = async (senhaFornecida, senhaArmazenada) => {
  try{
    const match = await bcrypt.compare(senhaFornecida, senhaArmazenada);
    return match;
  } catch (error){
    throw new Error('Erro ao comparar as senhas: ' + error.message);
  }
}

export const hashPasswordSHA256 = (senha) => {
  const hash = crypto.createHash('sha256').update(senha).digest('hex');
  return hash;
}