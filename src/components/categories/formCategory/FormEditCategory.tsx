import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Category from '../../../models/Category';
import { fetchData, postData, updateData } from '../../../services/Service';
import { toastAlert } from '../../../utils/ToastAlert';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config/firebaseConfig';

interface FormEditCategoryProps {
  id?: number;
}

function Input({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  required = false,
}: {
  label: string;
  type: string;
  name: string;
  value: string | number;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        className="border border-charcoalGray rounded-[10px] p-2 h-14"
      />
    </div>
  );
}

function FormEditCategory({ id }: FormEditCategoryProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: '',
    description: '',
    photo: '',
  });

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (id) {
      fetchData(`/categories/${id}`, setCategory, {
        headers: {
          Authorization: token,
        },
      });
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
        toastAlert('Foto carregada com sucesso', 'sucesso');
      } catch (error) {
        toastAlert('Erro ao carregar a foto: ' + error, 'erro');
      }
    }
  }

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  async function saveCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateData(`/categories/${id}`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });
        toastAlert('Categoria atualizada com sucesso', 'sucesso');
      } else {
        await postData(`/categories`, category, setCategory, {
          headers: {
            Authorization: token,
          },
        });
        toastAlert('Categoria criada com sucesso', 'sucesso');
      }
      navigate('/categories/all');
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('O token expirou, favor logar novamente', 'info');
        handleLogout();
      } else {
        toastAlert('Erro ao salvar a categoria: ' + error, 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-center my-8">
        {id ? 'Editar Categoria' : 'Cadastrar Categoria'}
      </h1>
      <form
        onSubmit={saveCategory}
        className="flex flex-col w-[600px] m-4 gap-4 input-login"
      >
        <Input
          label="Nome da Categoria"
          type="text"
          name="name"
          value={category.name}
          placeholder="Nome"
          onChange={updateState}
          required
        />
        <Input
          label="Descrição da Categoria"
          type="text"
          name="description"
          value={category.description}
          placeholder="Descrição"
          onChange={updateState}
          required
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto da Categoria</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="border border-charcoalGray rounded-[10px] p-2"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="rounded-[10px] bg-charcoalGray text-white w-2/6 h-[60px] p-4 flex justify-center items-center ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md cursor-pointer"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible
            />
          ) : id ? (
            'Atualizar'
          ) : (
            'Cadastrar'
          )}
        </button>
      </form>
    </div>
  );
}

export default FormEditCategory;
