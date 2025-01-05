import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Category from "../../../models/Category";
import { fetchData, postData, updateData } from "../../../services/Service";
import { toastAlert } from "../../../utils/ToastAlert";

interface FormCategoryProps {
    id: number;
}

function FormEditCategory({ id }: FormCategoryProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [category, setCategory] = useState<Category>({} as Category);

  let navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext); //email ou usuario
  const token = user.token;

  async function searchById(id: number) {
    await fetchData(`/categories/${id}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      searchById(id);
    }
  }, [id]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });

    console.log(JSON.stringify(category));
  }

  async function createNewCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await updateData(`/categories`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });

        alert("Categoria atualizada com sucesso");
        goToAllCategory();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao atualizar a categoria", "erro");
        }
      }
    } else {
      try {
        await postData(`/categories`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert("Categoria cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao cadastrar a categoria", "erro");
        }
      }
    }
    setIsLoading(false);
    goToAllCategory();
  }

  function goToAllCategory() {
    navigate("/categories/all");
  }

  useEffect(() => {
    if (token === "") {
      toastAlert("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastre uma nova categoria" : "Editar categoria"}
      </h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={createNewCategory}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da categoria</label>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={category.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
          <label htmlFor="descricao">Descrição da categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={category.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
          <label htmlFor="foto">Foto da categoria</label>
          <input
            type="text"
            placeholder="Link da foto"
            name="foto"
            className="border-2 border-slate-700 rounded p-2"
            value={category.photo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
        </div>
        <button
          className="rounded-[10px] bg-darkMossGreen border border-darkMossGreen hover:bg-[#f7f7f7] hover:text-darkMossGreen text-white w-2/6 h-[60px] p-4 flex justify-center items-center"
          type="submit"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Editar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormEditCategory;
