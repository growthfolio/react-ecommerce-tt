import Cart from "./Cart";
import Product from "./Product";


export default interface CartItem {
  id: number;
  cart: Cart | null;
  product?: Product | null;
  quantity?: number;
  unitPrice?: number;
}

export function calculateSubTotal(cartItem: CartItem): number {
  return (cartItem.quantity ?? 0) * (cartItem.unitPrice ?? 0);
}
