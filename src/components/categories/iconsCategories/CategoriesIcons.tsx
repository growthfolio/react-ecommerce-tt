import { Link } from 'react-router-dom';
import '../../../index.css';
import iconMapping from '../../../utils/iconMapping';
import Category from '../../../models/Category';

interface CategoriesIconsProps {
  category: Category;
}

function CategoriesIcons({ category }: CategoriesIconsProps) {
  const iconClass = iconMapping[category.name] || 'fas fa-question-circle';

  return (
    <Link
      to={`/categories/name/${category.name.toLocaleLowerCase()}`}
      className="flex flex-col items-center justify-center gap-2 p-2 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Ícone */}
      <div className="flex items-center justify-center bg-none rounded-full w-[60px] h-[60px]">
        <i className={`${iconClass} text-white text-2xl`}></i>
      </div>

      {/* Nome da Categoria */}
      <p className="text-sm font-semibold uppercase">{category.name}</p>
    </Link>
  );
}

export default CategoriesIcons;
