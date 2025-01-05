import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../../../models/Category";
import defaultCategories from "../defaultCategories/defaultCategories";
import CardCategory from "../cardCategory/CardCategory";


function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(defaultCategories);
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
