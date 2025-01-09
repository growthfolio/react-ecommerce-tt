import { Link } from "react-router-dom";
import "../../../index.css";
import Category from "../../../models/Category";

interface CategoriesIconsImgProps {
  category: Category;
}

function CategoriesIconsImg({ category }: CategoriesIconsImgProps) {
  // Caminho para os ícones baseado no nome da categoria
  const iconPath = `/assets/category/icons/${category.name.toLocaleLowerCase()}-categoria.png`;

  return (
    <Link
      to={`/categorias/nome/${category.name.toLocaleLowerCase()}`}
      className="flex flex-col items-center justify-center gap-2 p-2 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Ícone como imagem */}
      <div className="flex items-center justify-center bg-none rounded-full w-[60px] h-[60px]">
        <img
          src={iconPath}
          alt={`Ícone da categoria ${category.name}`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Nome da Categoria */}
      <p className="text-sm font-semibold uppercase">{category.name}</p>
    </Link>
  );
}

export default CategoriesIconsImg;