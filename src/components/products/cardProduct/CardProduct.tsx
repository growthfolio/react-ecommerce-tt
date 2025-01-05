import coracao from "../../../assets/icons/heart.svg";
import Product from "../../../models/Product";


interface CardProductProps {
  product: Product;
  category: String;
}

function CardProduct(props: CardProductProps) {
  return (
    <>
      <button className="grid grid-row-3 gap-4  rounded-[15px] bg-seasalt px-3 py-2 transition ease-in-out delay-50 hover:-translate-y-4 hover:scale-110 duration-300 shadow-md">
        <div>
          <div className="bg-[#3E5622] w-min p-1 px-2 h-min rounded-md text-center my-4">
            <p className="text-white fontcategoryProdutoCard w-max font-bold capitalize ">
              {props.category}
            </p>
          </div>
          <img
            src={props.product.photo}
            className=" w-[275px] h-[200px] object-cover rounded-[5px]"
            alt="Foto do produto ${props.product.name}"
          />
        </div>

        <div className="grid gap-1">
          <p className=" fontProdutoNameCard text-[16px] text-darkMossGreen capitalize my-1">
            {props.product.name}
          </p>
          <div className="">
            <hr />
          </div>
          <div className="flex justify-between fontProdutoNameCard text-[15px] text-darkMossGreen">
            <p className="  font-semibold uppercase">R${props.product.price}</p>
            <p className=" flex gap-1 font-semibold">
              <img src={coracao} alt="icone de coração" />
              {props.product.likes}
            </p>
          </div>
        </div>
      </button>
    </>
  );

  /* <p>{product.description}</p>
    <p>category: {product.category?.description}</p>
    <p>Data: {new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date(product.data))}</p> */

  /* <div className="flex">
        <Link to={`/editProduto/${product.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deleteProduct/${product.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div> */
}

export default CardProduct;
