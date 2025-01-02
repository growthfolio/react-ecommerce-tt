export default interface UsuarioLogin {
    id: number;
    name: string;
    email: string;
    password: string;
    photo: string;
    cpfCnpj: string; // Corrigido de cpf_cnpj para camelCase
    type: string;
    date: Date; // Corrigido para usar o tipo Date
    token: string;
  }
  