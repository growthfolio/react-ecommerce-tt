import { useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';
import Category from '../../../models/Category';
import { deleteData, fetchData } from '../../../services/Service';
import { toastAlert } from '../../../utils/ToastAlert';

interface DeleteCategoryProps {
  id: number;
}

function DeleteCategory({ id }: DeleteCategoryProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [category, setCategory] = useState<Category>({} as Category);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  const token = user.token;

  async function searchById(id: string) {
    try {
      await fetchData(`/categories/${id}`, setCategory, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('O token expirou, favor logar novamente', 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      searchById(id.toString());
    }
  }, [id]);

  function goToCategories() {
    navigate('/categories/all');
  }

  async function deleteCategory() {
    setIsLoading(true);
    try {
      await deleteData(`/categories/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toastAlert('Categoria apagada com sucesso', 'sucesso');
    } catch (error) {
      toastAlert('Erro ao apagar a categoria', 'erro');
    }

    goToCategories();
  }
  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar categoria</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-charcoalGray text-white font-bold text-2xl">
          Categoria
        </header>
        <p className="p-8 text-3xl h-full">{category.name}</p>
        <div className="flex">
          <button
            className="text-slate-100 textButton bg-[#FF5757] w-full py-2"
            onClick={goToCategories}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-[#7BD389]  flex items-center justify-center"
            onClick={deleteCategory}
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
              <span className="text-white textButton">Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory;
