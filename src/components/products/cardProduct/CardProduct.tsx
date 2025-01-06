import { useState, useContext } from "react";
import { ShoppingCart, Star } from "@phosphor-icons/react";
import Product from "../../../models/Product";
import { toastAlert } from "../../../utils/ToastAlert";
import { addToCart, fetchCartByUserId } from "../../../services/cartService";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardProductProps {
  product: Product;
  category: string;
}

function CardProduct({ product, category }: CardProductProps) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  const handleAddToCart = async () => {
    if (!user || !user.id || !user.token) {
      toastAlert("Você precisa estar logado para adicionar produtos ao carrinho.", "error");
      return;
    }

    try {
      // Busca o carrinho do usuário para obter o `cartId`
      const cart = await fetchCartByUserId(user.id, user.token);

      if (!cart || !cart.id) {
        toastAlert("Erro ao recuperar o carrinho do usuário.", "error");
        return;
      }

      const cartId = cart.id;
      const productId = product.id;
      const quantity = 1;
      const unitPrice = product.price;

      // Adiciona o item ao carrinho
      await addToCart(user.id, cartId, productId, quantity, unitPrice, user.token);
      toastAlert(`${product.name} foi adicionado ao carrinho!`, "success");
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      toastAlert("Erro ao adicionar produto ao carrinho.", "error");
    }
  };

  const truncateDescription = (description: string, maxLength: number) =>
    description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;

  return (
    <article className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="p-3">
        <header>
          <div className="text-darkBlue h-min rounded-md text-center mb-3">
            <p className="text-white bg-darkMossGreen p-1 px-2 fontcategoryProdutoCard w-max font-bold capitalize">
              {category}
            </p>
          </div>
          <img
            src={product.photo || "https://via.placeholder.com/275x200"}
            className="w-[275px] h-[200px] object-cover rounded-md"
            alt={`Foto do produto ${product.name}`}
          />
        </header>

        <section className="flex flex-col flex-grow px-2">
          <p className="fontProdutoNameCard text-[16px] text-darkMossGreen capitalize my-1">
            {product.name}
          </p>
          <div>
            <hr />
          </div>
          <p
            className="text-sm text-gray-600"
            title={product.description}
          >
            {truncateDescription(product.description, 60)}
          </p>
          <div className="flex justify-between items-center fontProdutoNameCard text-[15px] text-darkMossGreen mt-2">
            <p className="font-bold text-lg text-primaryColor">
              R${product.price}
            </p>
            <button
              className="flex items-center gap-1 font-semibold transition-transform transform hover:scale-110"
              onClick={toggleLike}
              aria-label={liked ? "Descurtir produto" : "Curtir produto"}
            >
              <Star
                size={22}
                color={liked ? "#FFD700" : "#ccc"}
                weight={liked ? "fill" : "regular"}
              />
            </button>
          </div>
        </section>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 px-4 py-2 
          bg-[#f88629] text-white font-semibold rounded-lg rounded-b-none shadow-md 
          transition-transform transform hover:bg-[#00923f]"
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
