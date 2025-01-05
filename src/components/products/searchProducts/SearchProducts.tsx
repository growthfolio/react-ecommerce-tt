import { useContext, useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Product from "../../../models/Product";
import { fetchData } from "../../../services/Service";
import { toastAlert } from "../../../utils/ToastAlert";
import CardProduct from "../cardProduct/CardProduct";


function SearchProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const { handleLogout } = useContext(AuthContext);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        await fetchData(`/products/names/${name}`, setProducts, {});
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        }
      }
    }

    fetchProducts();
  }, [name]);
  return (
    <>
      {products.length === 0 && (
        <LineWave
          visible={true}
          height="200"
          width="2000"
          color="#3E5622"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <div className="w-[900px] mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center ">
        {products.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            category={product.category?.name || "Unknown Category"}
          />
        ))}
      </div>
    </>
  );
}

export default SearchProduct;
