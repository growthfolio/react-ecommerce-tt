import { Link } from 'react-router-dom';
import '../../../index.css';
import Category from '../../../models/Category';

interface AdminCategoriesIconsProps {
  category: Category;
}

function AdminCategoriesIcons({ category }: AdminCategoriesIconsProps) {
  return (
    <>
      <div className="grid grid-rows m-4 rounded-xl bg-pureSnow transition ease-in-out delay-50 hover:-translate-y-4 hover:scale-110 duration-300 shadow-lg">
        <Link to={`/categories/${category.id}`}>
          <div className="p-1 rounded-t-lg text-center flex-grow text-white w-[120px] h-[120px] mx-2">
            <p className="text-charcoalGray bold m-4 truncate text-[12px]">
              {category.name}
            </p>
            <div className="mt-2 flex justify-center align-middle">
              <img
                src={category.photo}
                alt="Icone categoria"
                className="w-[50px] h-[50px] mb-5 py-auto"
              />
            </div>
          </div>
        </Link>
        <div className="flex w-[45px] h-[30px] self-center ">
          <Link
            to={`/editarCategoria/${category.id}`}
            className=" w-[8rem] p-3 rounded-bl-lg text-black hover:text-white bg-[#FFD242] flex items-center justify-center"
          >
            <button>Editar</button>
          </Link>
          <Link
            to={`/deletarCategoria/${category.id}`}
            className="w-[8rem] p-3 rounded-br-lg text-white hover:text-black bg-[#FF5757] flex items-center justify-center"
          >
            <button className="">Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminCategoriesIcons;
