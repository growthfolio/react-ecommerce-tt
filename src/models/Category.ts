import Product from "./Product";

export default interface Category {
  id: number;
  name: string;
  description: string;
  photo: string;
  products?: Product[]; // Corrigido de product para products e pluralizado
}
