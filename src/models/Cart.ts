import User from "./User";

export default interface Cart {
  cartItems: never[];
  id: number;
  user: User | null;
  createdAt?: Date;
  updatedAt?: Date;
}
