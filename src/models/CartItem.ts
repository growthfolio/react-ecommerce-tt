import Cart from './Cart';
import Product from './Product';

export default interface CartItem {
  id: number;
  cart: Cart | null;
  product: Product; // Agora obrigatório
  quantity: number; // Agora obrigatório
  unitPrice: number; // Agora obrigatório
  subTotal: number; // Agora obrigatório
}

export function calculateSubTotal(cartItem: CartItem): number {
  return (cartItem.quantity ?? 0) * (cartItem.unitPrice ?? 0);
}
