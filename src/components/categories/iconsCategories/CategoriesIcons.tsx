import { Link } from "react-router-dom";
import "../../../index.css";
import iconMapping from "../../../utils/iconMapping";
import Category from "../../../models/Category";

interface CategoriesIconsProps {
  category: Category;
}

function CategoriesIcons({ category }: CategoriesIconsProps) {
  const iconClass = iconMapping[category.name] || "fas fa-question-circle"; // Ícone padrão

  return (
    <Link
      to={`/categorias/nome/${category.name.toLocaleLowerCase()}`}
      className="flex flex-col items-center mx-4 text-center text-white transition-transform ease-in-out duration-300 hover:scale-105"
    >
      {/* Ícone */}
      <div className=" mr-1 rounded-none flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]">
        <i className={`${iconClass} text-white text-base sm:text-lg md:text-xl`}></i>
      {/* Nome da Categoria */}
      <p className="ml-2 mr-2 text-xs sm:text-sm md:text-md font-semibold">
        {category.name.toUpperCase()}
      </p>
      </div>
    </Link>
  );
}

export default CategoriesIcons;
