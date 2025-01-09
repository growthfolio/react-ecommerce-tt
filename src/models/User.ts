import Cart from "./Cart";
import Product from "./Product";


export default interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  cpf_cnpj?: string;
  type?: string;
  data?: Date;
  cart?: Cart | null;
  products?: Product[];
}
