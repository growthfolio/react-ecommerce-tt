import User from "./User";

export default interface Cart {
  id: number;
  user: User | null;
  createdAt?: Date;
  updatedAt?: Date;
}
