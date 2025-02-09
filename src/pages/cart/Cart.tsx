import { useState, useEffect, useContext } from 'react';
import { calculateSubTotal } from '../../models/CartItem';
import CartItem from '../../models/CartItem';
import { AuthContext } from '../../contexts/AuthContext';
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
} from '../../services/cartService';
import { toastAlert } from '../../utils/ToastAlert';

function CartPage() {
  const { user } = useContext(AuthContext); // Usuário autenticado
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Itens do carrinho
  const [total, setTotal] = useState<number>(0); // Total do carrinho

  // Carrega os itens do carrinho ao montar o componente
  useEffect(() => {
    const loadCartItems = async () => {
      if (!user?.id || !user?.token) {
        toastAlert(
          'Você precisa estar logado para acessar o carrinho.',
          'error',
        );
        return;
      }

      try {
        const items = await fetchCartItems(user.id, user.token); // Chama o serviço real
        setCartItems(items);
      } catch (error) {
        console.error('Erro ao carregar itens do carrinho:', error);
        toastAlert(
          'Erro ao carregar itens do carrinho. Tente novamente mais tarde.',
          'error',
        );
      }
    };

    loadCartItems();
  }, [user?.id, user?.token]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + calculateSubTotal(item),
      0,
    );
    setTotal(newTotal);
  }, [cartItems]);

  const handleRemoveItem = async (cartItemId: number) => {
    if (!user?.id || !user?.token) {
      toastAlert('Você precisa estar logado para realizar essa ação.', 'error');
      return;
    }

    try {
      await removeCartItem(user.id, cartItemId, user.token);
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

  const handleQuantityChange = async (cartItemId: number, quantity: number) => {
    if (!user?.id || !user?.token) {
      toastAlert('Você precisa estar logado para realizar essa ação.', 'error');
      return;
    }

    if (quantity < 1) {
      toastAlert('A quantidade deve ser no mínimo 1.', 'error');
      return;
    }

    try {
      const items = await updateCartItem(
        user.id,
        cartItemId,
        quantity,
        user.token,
      );
      setCartItems(items);
      toastAlert('Quantidade atualizada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao atualizar quantidade do item:', error);
      toastAlert(
        'Erro ao atualizar quantidade do item. Tente novamente mais tarde.',
        'error',
      );
    }
  };

  // Finaliza a compra
  const handleCheckout = () => {
    toastAlert('Função de finalizar compra ainda não implementada.', 'info');
    // Implementar lógica de finalização de compra
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Carrinho de Compras
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4"
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
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value) || 1,
                      )
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
      )}
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold text-gray-800">
          Total: R$ {total.toFixed(2)}
        </h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default CartPage;
