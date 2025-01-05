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
  }, []); // Removeu dependência desnecessária (categories.length)

  return (
    <div className="bg-darkMossGreen flex justify-center mb-5">
      <div className="container py-5 flex flex-col items-center justify-center text-white">
        {/* <h5 className="font-Roboto text-white mt-4 mb-5">
          Conheça nossas categorias
        </h5> */}
        <div className="px-1 py-1 flex flex-wrap justify-center gap-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoriesIcons key={category.id} category={category} />
            ))
          ) : (
            <p className="text-center text-white">Carregando categorias...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCategoryIcons;
