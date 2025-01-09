import { useEffect, useState } from "react";
import "../../../index.css";
import { fetchData } from "../../../services/Service";
import Category from "../../../models/Category";
import CategoriesIcons from "./CategoriesIcons";

function ListCategoryIcons() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findCategories = async () => {
      try {
        await fetchData("/categories/all", setCategories, {
          headers: {},
        });
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    };

    findCategories();
  }, []);

  // Filtra as categorias para mostrar no máximo 7
  const limitedCategories = categories.slice(0, 8);

  return (
    <header className="py-3 shadow-md w-full">
      <div className="">
        {isLoading ? (
          <p className="text-white text-center animate-pulse">Carregando categorias...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {limitedCategories.map((category) => (
              <CategoriesIcons key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default ListCategoryIcons;
