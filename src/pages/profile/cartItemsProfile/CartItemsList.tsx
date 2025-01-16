import React from 'react';
import CartItem from '../../../models/CartItem';
import { toastAlert } from '../../../utils/ToastAlert';
import { removeCartItem, updateCartItem } from '../../../services/cartService';

interface CartItemsListProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  userId: number;
  token: string;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  cartItems,
  setCartItems,
  userId,
  token,
}) => {
  const handleQuantityChange = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) {
      toastAlert('A quantidade deve ser no mínimo 1.', 'error');
      return;
    }

    try {
      const updatedItems = await updateCartItem(
        userId,
        cartItemId,
        quantity,
        token,
      );
      setCartItems(updatedItems);
      toastAlert('Quantidade atualizada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao atualizar quantidade do item:', error);
      toastAlert(
        'Erro ao atualizar quantidade do item. Tente novamente mais tarde.',
        'error',
      );
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(userId, cartItemId, token);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId),
      );
      toastAlert('Item removido do carrinho.', 'info');
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      toastAlert(
        'Erro ao remover item do carrinho. Tente novamente mais tarde.',
        'error',
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row bg-gray-100 shadow-lg rounded-lg p-4"
        >
          <img
            src={item.product.photo || 'https://via.placeholder.com/150'}
            alt={item.product.name}
            className="w-32 h-32 object-cover rounded-lg mr-4"
          />
          <div className="flex flex-col flex-1">
            <h3 className="text-xl font-semibold text-gray-800">
              {item.product.name}
            </h3>
            <p className="text-gray-600">{item.product.description}</p>
            <p className="font-semibold text-green-600 mt-2">
              R$ {item.unitPrice.toFixed(2)}
            </p>
            <div className="mt-4 flex items-center">
              <label htmlFor={`quantity-${item.id}`} className="mr-2">
                Quantidade:
              </label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                }
                min={1}
                max={item.product.amount}
                className="w-16 p-2 border rounded"
              />
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="mt-4 text-red-500 hover:underline"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsList;
