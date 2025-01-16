import { useContext, useEffect, useState } from 'react';
import { LineWave } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Category from '../../../models/Category';
import { toastAlert } from '../../../utils/ToastAlert';
import { fetchData } from '../../../services/Service';
import CardProduct from '../../products/cardProduct/CardProduct';

function SearchByCategory() {
  const [category, setCategory] = useState<Category[]>([]);
  const { handleLogout } = useContext(AuthContext);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    async function searchData() {
      try {
        await fetchData(`/categories/name/${name}`, setCategory, {});
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', 'info');
          handleLogout();
        }
      }
    }

    console.log(category[0]);

    searchData();
  }, [name]);

  return (
    <div>
      {category.length > 0 && category[0].products ? (
        <div className=" mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center ">
          {category[0].products.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              category={category[0].name}
            />
          ))}
        </div>
      ) : (
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
    </div>
  );
}

export default SearchByCategory;
