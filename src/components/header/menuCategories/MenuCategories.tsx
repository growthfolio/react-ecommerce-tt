import { Link } from 'react-router-dom';
import Category from '../../../models/Category';

interface MenuCategoriesProps {
  category: Category;
}

function MenuCategories({ category }: MenuCategoriesProps) {
  return (
    <Link
      to={`/categories/name/${category.name}`}
      className="block px-4 py-2 text-[12px]  bg-seasalt text-darkMossGreen hover:bg-sunglow-light rounded-md transition duration-300 ease-in-out"
    >
      {category.name}
    </Link>
  );
}

export default MenuCategories;
