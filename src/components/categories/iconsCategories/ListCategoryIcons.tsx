import { useEffect, useState } from "react";
import "../../../index.css";
import { fetchData } from "../../../services/Service";
import Category from "../../../models/Category";
import CategoriesIcons from "./CategoriesIcons";

function ListCategoryIcons() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const findCategories = async () => {
      try {
        await fetchData("/categories/all", setCategories, {
          headers: {},
        });
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    findCategories();
  }, []);

  return (
    <header className="bg-gradient-to-b from-[#070d17] via-[#04080f] to-[#04080f] py-3 shadow-md w-full z-50">
      <div className="container mx-auto flex justify-center items-center gap-4 flex-wrap text-center">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoriesIcons key={category.id} category={category} />
          ))
        ) : (
          <p className="text-white animate-pulse">Carregando categorias...</p>
        )}
      </div>
    </header>
  );
}

export default ListCategoryIcons;
