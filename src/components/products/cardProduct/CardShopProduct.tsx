import coracao from '../../../assets/icons/heart.svg';
import Product from '../../../models/Product';
import ModalProduct from '../modalProduct/ModalProduct';

interface CardShopProductProps {
  product: Product;
}

function CardShopProduct({ product }: CardShopProductProps) {
  return (
    <>
      <div className="grid grid-row-3 gap-4  rounded-[15px] bg-seasalt px-3 py-2">
        <div>
          <div className="bg-[#3E5622] w-min p-1 px-2 h-min rounded-md text-center my-4">
            <p className="text-white fontCategoriaProdutoCard w-max font-bold capitalize ">
              {product.category?.name}
            </p>
          </div>
          <img
            src={product.photo}
            className=" w-[275px] h-[200px] object-cover rounded-[5px]"
            alt="Imagem do produto ${product.nome}"
          />
        </div>

        <div className="grid gap-1">
          <p className=" fontProdutoNameCard text-[16px] text-darkMossGreen capitalize my-1">
            {product.name}
          </p>
          <div className="">
            <hr />
          </div>
          <div className="flex justify-between fontProdutoNameCard text-[15px] text-darkMossGreen">
            <p className="  font-semibold uppercase">R${product.price}</p>
            <p className=" flex gap-1 font-semibold">
              <img src={coracao} alt="icone de coração" />
              {product.likes}
            </p>
          </div>

          <ModalProduct type={2} id={product.id} />

          <ModalProduct type={3} id={product.id} />
        </div>
      </div>
    </>
  );
}

export default CardShopProduct;
