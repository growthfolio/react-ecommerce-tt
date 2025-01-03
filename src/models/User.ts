import Cart from "./Cart";
import Product from "./Product";


export default interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: string;
  cpfCnpj: string; // Corrigido de cpf_cnpj para camelCase
  type: string;
  data: Date;
  cart?: Cart | null;
  products?: Product[]; // Corrigido para refletir a lista de produtos corretamente
}
