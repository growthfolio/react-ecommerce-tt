import { Link } from 'react-router-dom';
import '../../../index.css';
import iconMapping from '../../../utils/iconMapping';
import Category from '../../../models/Category';

interface CategoriesIconsProps {
  category: Category;
}

function CategoriesIcons({ category }: CategoriesIconsProps) {
  const { imgPath } = iconMapping[category.name] || {
    iconClass: 'fas fa-question-circle',
    imgPath: 'src/assets/category/icons/default.jpeg',
  };

  return (
    <Link
      to={`/categories/name/${category.name.toLocaleLowerCase()}`}
      className="flex flex-col w-[100%] items-center justify-center gap-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Ícone como imagem */}
      <div className="flex w-[100%] items-center justify-center rounded-full">
        <img
          src={imgPath}
          alt={`Ícone da categoria ${category.name}`}
          className="w-[100%] h-[100%] object-contain"
        />
      </div>

      {/* Nome da Categoria */}
      {/* <p className="text-sm font-semibold uppercase">{category.name}</p> */}
    </Link>
  );
}

export default CategoriesIcons;
