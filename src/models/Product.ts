
import Category from "./Category";
import User from "./User";

export default interface Product {
  id: number;
  amount: number;
  createdAt: Date;
  description: string;
  likes: number;
  name: string;
  photo: string;
  price: number;
  sales: number;
  updatedAt: Date;
  category: Category | null;
  user: User | null;
}