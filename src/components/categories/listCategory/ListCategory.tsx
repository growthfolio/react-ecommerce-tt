import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../../../models/Category';
import CardCategory from '../cardCategory/CardCategory';
import { fetchData } from '../../../services/Service';

function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const findCategories = async () => {
      try {
        await fetchData('/categories/all', setCategories, {
          headers: {},
        });
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    findCategories();
  }, []);

  return (
    <>
      <div className="mt-[40px] w-4/6 container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((category) => (
          <>
            <Link to={`/categories/name/${category.name.toLocaleLowerCase()}`}>
              <CardCategory key={category.id} category={category} />
            </Link>
          </>
        ))}
      </div>
    </>
  );
}

export default ListCategories;
