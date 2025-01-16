import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Category from '../../../models/Category';
import Product from '../../../models/Product';
import { fetchData, updateData } from '../../../services/Service';
import { toastAlert } from '../../../utils/ToastAlert';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config/firebaseConfig';

interface FormEditProductProps {
  id: number;
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

function FormEditProduct({ id }: FormEditProductProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: '',
    description: '',
    photo: '',
  });

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    amount: 0,
    photo: '',
    description: '',
    sales: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: null,
    likes: 0,
  });

  async function searchProductById(id: string) {
    await fetchData(`/products/${id}`, setProduct, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function searchCategory() {
    await fetchData('/categories/all', setCategories, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const storageRef = ref(storage, `products/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(snapshot.ref);
        setProduct((prev) => ({ ...prev, photo: photoURL }));
        toastAlert('Foto carregada com sucesso', 'sucesso');
      } catch (error) {
        toastAlert('Erro ao carregar a foto' + error, 'erro');
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    searchCategory();
    if (id) {
      searchProductById(id.toString());
    }
  }, [id]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      category: category,
      user: user,
    }));
  }

  async function saveProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateData(`/products`, product, setProduct, {
        headers: {
          Authorization: token,
        },
      });
      toastAlert('Produto atualizado com sucesso', 'sucesso');
      navigate('/products/all');
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('O token expirou, favor logar novamente', 'info');
        handleLogout();
      } else {
        toastAlert('Erro ao atualizar o produto' + error, 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-center my-8">Editar Produto</h1>
      <form
        onSubmit={saveProduct}
        className="flex flex-col w-[600px] m-4 gap-4 input-login"
      >
        <Input
          label="Nome do Produto"
          type="text"
          name="name"
          value={product.name}
          placeholder="Nome"
          onChange={updateState}
          required
        />
        <Input
          label="Descrição do Produto"
          type="text"
          name="description"
          value={product.description}
          placeholder="Descrição"
          onChange={updateState}
          required
        />
        <Input
          label="Preço do Produto"
          type="number"
          name="price"
          value={product.price}
          placeholder="Preço"
          onChange={updateState}
          required
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto do produto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="border border-charcoalGray rounded-[10px] p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="categoria">Categoria do Produto</label>
          <select
            name="categoria"
            id="categoria"
            value={product.category?.id || ''}
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => {
              const selectedCategory = categories.find(
                (cat) => cat.id === parseInt(e.target.value),
              );
              if (selectedCategory) setCategory(selectedCategory);
            }}
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.description}
              </option>
            ))}
          </select>
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
          ) : (
            'Salvar'
          )}
        </button>
      </form>
    </div>
  );
}

export default FormEditProduct;
