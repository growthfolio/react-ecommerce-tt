import { useEffect, useState } from "react";
import "../../../index.css";
import { fetchData } from "../../../services/Service";
import Category from "../../../models/Category";
import CategoriesIconsImg from "./CategoriesIconsImg";

function ListCategoryIcons() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ordem desejada das categorias
  const desiredOrder = [
    "suvinil",
    "glasu",
    "eletrica",
    "seguranca",
    "ferragens",
    "hidraulica",
    "pintura",
    "promocao",
  ];

  // Função para buscar categorias
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

  // useEffect para carregar categorias
  useEffect(() => {
    findCategories();
  }, []);

  // Filtrar e ordenar as categorias
  const filteredCategories = categories
    .filter((category) => desiredOrder.includes(category.name.toLowerCase()))
    .sort(
      (a, b) =>
        desiredOrder.indexOf(a.name.toLowerCase()) -
        desiredOrder.indexOf(b.name.toLowerCase())
    );

  return (
    <header className="w-full bg-black">
      <div className="w-full">
        {isLoading ? (
          <p className="text-white text-center animate-pulse">
            Carregando categorias...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 h-full">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-center"
              >
                <CategoriesIconsImg category={category} />
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default ListCategoryIcons;
