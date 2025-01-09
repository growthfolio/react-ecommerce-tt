import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Category from "../../../models/Category";
import { fetchData, postData, updateData } from "../../../services/Service";
import { toastAlert } from "../../../utils/ToastAlert";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";

function FormCategory() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    description: "",
    photo: "",
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchById(id: string) {
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

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const storageRef = ref(storage, `categories/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(snapshot.ref);
        setCategory((prev) => ({ ...prev, photo: photoURL }));
        toastAlert("Foto carregada com sucesso", "sucesso");
      } catch (error) {
        toastAlert("Erro ao carregar a foto: " + error, "erro");
      }
    }
  }

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  }

  async function generateNewCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await updateData(`/categories`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });
        toastAlert("Categoria atualizada com sucesso", "sucesso");
      } else {
        await postData(`/categories`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });
        toastAlert("Categoria cadastrada com sucesso", "sucesso");
      }
      navigate("/categories/all");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlert("O token expirou, favor logar novamente" + error, "info");
        handleLogout();
      } else {
        toastAlert("Erro ao salvar a categoria: " + error, "erro");
      }
    } finally {
      setIsLoading(false);
    }
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
      <form
        className="w-1/2 flex flex-col gap-4"
        onSubmit={generateNewCategory}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome da categoria</label>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            className="border-2 border-slate-700 rounded p-2"
            value={category.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
          <label htmlFor="description">Descrição da categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name="description"
            className="border-2 border-slate-700 rounded p-2"
            value={category.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
          <label htmlFor="photo">Foto da categoria</label>
          <input
            type="file"
            accept="image/*"
            className="border-2 border-slate-700 rounded p-2"
            onChange={handlePhotoUpload}
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

export default FormCategory;
