import { Link } from 'react-router-dom';
import Category from '../../../models/Category';

interface MenuCategoriesProps {
  category: Category;
}

function MenuCategories({ category }: MenuCategoriesProps) {
  return (
    <Link
      to={`/categories/name/${category.name}`}
      className="block px-4 py-2 text-[12px]  bg-pureSnow text-charcoalGray hover:bg-light rounded-md transition duration-300 ease-in-out"
    >
      {category.name}
    </Link>
  );
}

export default MenuCategories;
