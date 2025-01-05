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
    <Link to={`/categorias/nome/${category.name.toLocaleLowerCase()}`}>
      <div className="bg-white p-1 rounded-[20px] text-center flex-grow text-white w-[120px] h-[120px] mx-2 transition ease-in-out delay-50 hover:-translate-y-4 hover:scale-110 duration-300 shadow-lg">
        <div className="mt-2 flex justify-center align-middle">
          {/* Renderiza ícone baseado no mapeamento */}
          <i className={`${iconClass} text-darkMossGreen text-4xl mb-2`}></i>
        </div>
        <p className="text-darkMossGreen font-bold m-4 truncate text-[12px]">
          {category.name}
        </p>
      </div>
    </Link>
  );
}

export default CategoriesIcons;
