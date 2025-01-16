import { useState, useContext } from 'react';
import { ShoppingCart, Star } from '@phosphor-icons/react';
import Product from '../../../models/Product';
import { toastAlert } from '../../../utils/ToastAlert';
import { addToCart, fetchCartByUserId } from '../../../services/cartService';
import { AuthContext } from '../../../contexts/AuthContext';

interface CardProductProps {
  product: Product;
  category: string;
}

function CardProduct({ product, category }: CardProductProps) {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(!!product.likes); // Inicializa com base no estado atual
  const [likes, setLikes] = useState(product.likes);

  const toggleLike = () => {
    setLiked((prevLiked) => {
      const isLiked = !prevLiked;
      setLikes((prevLikes) => prevLikes + (isLiked ? 1 : -1));
      return isLiked;
    });
  };

  const handleAddToCart = async () => {
    if (!user || !user.id || !user.token) {
      toastAlert(
        'Você precisa estar logado para adicionar produtos ao carrinho.',
        'error',
      );
      return;
    }

    try {
      const cart = await fetchCartByUserId(user.id, user.token);
      if (!cart || !cart.id) {
        toastAlert('Erro ao recuperar o carrinho do usuário.', 'error');
        return;
      }

      await addToCart(
        user.id,
        cart.id,
        product.id,
        1,
        product.price,
        user.token,
      );

      toastAlert(`${product.name} foi adicionado ao carrinho!`, 'success');
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      toastAlert('Erro ao adicionar produto ao carrinho.', 'error');
    }
  };

  const truncateDescription = (description: string, maxLength: number) =>
    description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;

  return (
    <article className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="p-3">
        <header className="mb-3">
          <div className="text-darkBlue rounded-md text-center">
            <p className="text-white bg-charcoalGray p-1 px-2 font-bold capitalize w-max rounded-md">
              {category}
            </p>
          </div>
          <div className="mx-auto w-[275px] h-[200px] flex items-center justify-center rounded-md overflow-hidden">
            <img
              src={product.photo || 'https://via.placeholder.com/275x200'}
              className="object-contain w-full h-full"
              alt={`Foto do produto ${product.name}`}
            />
          </div>
        </header>

        <section className="flex flex-col px-2">
          <p className="text-[16px] text-charcoalGray font-bold capitalize my-1">
            {product.name}
          </p>
          <p className="text-sm text-gray-600" title={product.description}>
            {truncateDescription(product.description, 60)}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-lg text-primaryColor">
              R${product.price.toFixed(2)}
            </p>
            <button
              className="flex items-center gap-1 transition-transform transform hover:scale-110"
              onClick={toggleLike}
              aria-label={
                liked
                  ? `Descurtir produto ${product.name}`
                  : `Curtir produto ${product.name}`
              }
            >
              <Star
                size={22}
                color={liked ? '#FFD700' : '#ccc'}
                weight={liked ? 'fill' : 'regular'}
              />
              <span className="text-gray-600 text-sm">{likes}</span>
            </button>
          </div>
        </section>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 px-4 py-2 
          bg-[#f88629] text-white font-semibold rounded-lg shadow-md 
          transition-transform transform hover:bg-[#00923f] hover:scale-105"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingCart size={20} />
          Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
}

export default CardProduct;
