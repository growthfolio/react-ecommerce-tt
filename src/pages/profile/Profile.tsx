import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { toastAlert } from '../../utils/ToastAlert';
import User from '../../models/User';
import { fetchData } from '../../services/Service';
import { fetchCartItems } from '../../services/cartService';
import CartItem, { calculateSubTotal } from '../../models/CartItem';
import CartItemsList from './cartItemsProfile/CartItemsList';

function Profile() {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (!user.token) {
      toastAlert('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [user.token, navigate]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        await fetchData(`/users/${user.id}`, setCurrentUser, {
          header: { Authorization: user.token },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', 'info');
          handleLogout();
        }
      }
    }

    if (user.token) {
      fetchUserData();
    }
  }, [user.token, user.id, handleLogout]);

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
        const items = await fetchCartItems(user.id, user.token);
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

  const formatDatabaseDate = (
    dateString: string | undefined,
  ): string | null => {
    if (!dateString) return null;
    const databaseDate = new Date(dateString);
    databaseDate.setHours(databaseDate.getHours() - 3); // Ajuste do fuso horário
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(databaseDate);
  };

  const formattedDate = formatDatabaseDate(currentUser?.data?.toString());

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#070d17] to-[#070d17] text-white rounded-t-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-center">
          Bem-vindo, {user.name}
        </h1>
        <p className="text-center mt-2">
          Gerencie suas informações e acompanhe seus produtos.
        </p>
      </section>

      {/* Foto e Informações */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <img
            src={user.photo}
            alt={`Foto de perfil de ${user.name}`}
            className="w-40 h-40 object-cover rounded-full border-4 border-green-500 shadow-lg"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {user.name}
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-600">Nome:</p>
              <p className="font-medium text-gray-800">{user.name}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-600">Email:</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
            {currentUser?.cpf_cnpj && (
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-600">CPF/CNPJ:</p>
                <p className="font-medium text-gray-800">
                  {currentUser.cpf_cnpj}
                </p>
              </div>
            )}
            {formattedDate && (
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-600">Usuário desde:</p>
                <p className="font-medium text-gray-800">{formattedDate}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carrinho de Compras */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Seu Carrinho</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
        ) : (
          <CartItemsList
            cartItems={cartItems}
            setCartItems={setCartItems}
            userId={user.id ?? 0}
            token={user.token ?? ''}
          />
        )}
        <div className="mt-6 text-right">
          <h2 className="text-2xl font-bold text-gray-800">
            Total: R$ {total.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
