import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Category from "../../../models/Category";
import Product from "../../../models/Product";
import { fetchData, postData, updateData } from "../../../services/Service";
import { toastAlert } from "../../../utils/ToastAlert";

function FormProduct() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);

  const token = user.token;

  const [categories, setCategories] = useState<Category[]>([]);

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    description: "",
    photo: "",
  });

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0, 
    amount: 0,
    photo: "",
    description: "",
    sales: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: null,
    user: null,
    likes: 0,
  });

  async function searchProductById(id: string) {
    await fetchData(`/products/${id}`, setProduct, {
      headers: {
        Authorization: token,
      },
    });
  }
  
  async function searchByCategoryId(id: string) {
    await fetchData(`/categories/${id}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function searchCategory() {
    await fetchData("/categories/all", setCategories, {
      headers: {
        Authorization: token,
      },
    });
  }
  useEffect(() => {
    if (token === "") {
      toastAlert("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    searchCategory();

    if (id !== undefined) {
      searchProductById(id);
    }
  }, [id]);

  useEffect(() => {
    setProduct({
      ...product,
      category: category,
    });
  }, [category]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      category: category,
      user: user,
    }));
  }

  console.log(product);
  function backToAllProducts() {
    navigate("/products/all");
  }

  async function registerNewProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (id != undefined) {
      try {
        await updateData(`/products`, product, setProduct, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert("Produto atualizado com sucesso", "sucesso");
        backToAllProducts();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao atualizar o produto", "erro");
        }
      }
    } else {
      try {
        await postData(`/products`, product, setProduct, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert("Produto cadastrado com sucesso", "sucesso");
        backToAllProducts();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao cadastrar o produto", "erro");
        }
      }
    }

    setIsLoading(false);
  }

  const loadingCategory = category.description === "";

  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form
        onSubmit={registerNewProduct}
        className="flex flex-col w-[600px]  m-4 gap-4 input-login"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            value={product.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Nome"
            name="nome"
            required
            className="border border-darkMossGreen rounded-[10px] p-2 h-14"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Produto</label>
          <input
            value={product.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Descrição"
            name="descricao"
            required
            className="border border-darkMossGreen rounded-[10px] p-2 h-14"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço do Produto</label>
          <input
            value={product.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="number"
            placeholder="Preço"
            name="preco"
            required
            className="border border-darkMossGreen rounded-[10px] p-2 h-14"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="foto">Foto do produto</label>
            <input
              value={product.photo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateState(e)
              }
              type="text"
              placeholder="Foto(URL)"
              name="foto"
              required
              className="border border-darkMossGreen rounded-[10px] p-2 h-14"
            />
          </div>
          <p>Categoria do Produto</p>

          <select
            name="produto"
            id="produto"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => searchByCategoryId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione uma categoria
            </option>

            {categories.map((category) => (
              <>
                <option value={category.id}>{category.description}</option>
              </>
            ))}
          </select>
        </div>

        <button
          disabled={loadingCategory}
          type="submit"
          className="rounded-[10px] bg-darkMossGreen text-white w-2/6 h-[60px] p-4 flex justify-center items-center ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md cursor-pointer">
          {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
           : id !== undefined ? (
            "Editar"
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduct;
