import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { ArrowCircleRight, CaretDown, CheckCircle } from "@phosphor-icons/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import CadastroImage from "../../assets/Logo.png";
import "./../../index.css";
import User from "../../models/User";
import { toastAlert } from "../../utils/ToastAlert";
import { registerUser } from "../../services/Service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

const options = [
  { type: "cliente", displayType: "Quero comprar", textPlaceholder: "CPF" },
  { type: "admin", displayType: "Quero vender", textPlaceholder: "CNPJ" },
];

function Register() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    photo: "",
    cpf_cnpj: "",
    type: "cliente",
  });

  const [userResponse, setUserResponse] = useState<User | null>(null);

  useEffect(() => {
    if (userResponse) {
      navigate("/login");
    }
  }, [userResponse, navigate]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Armazena o arquivo localmente

  function handleFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // Obtém o arquivo selecionado
    if (file) {
      setSelectedFile(file); // Armazena o arquivo localmente
      toastAlert("Arquivo selecionado. Envie o formulário para concluir o upload.", "info");
    }
  }


  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // Obtém o arquivo selecionado pelo usuário
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`); // Cria uma referência no Firebase Storage
      uploadBytes(storageRef, file) // Faz o upload do arquivo
        .then((snapshot) => {
          getDownloadURL(snapshot.ref) // Obtém a URL pública do arquivo
            .then((url) => {
              setUser((prevState) => ({
                ...prevState,
                photo: url, // Atualiza o estado do usuário com a URL
              }));
              toastAlert("Imagem enviada com sucesso!", "sucesso");
            });
        })
        .catch((error) => {
          console.error("Erro ao fazer upload:", error);
          toastAlert("Erro ao enviar a imagem.", "erro");
        });
    }
  }
  

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function updateUserState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    setUser((prevState) => ({
      ...prevState,
      type: selectedOption.type,
    }));
  }, [selectedOption]);

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (confirmPassword === user.password && user.password.length >= 8) {
      setIsLoading(true);
  
      try {
        let photoUrl = user.photo;
  
        // Faz o upload do arquivo apenas se um arquivo foi selecionado
        if (selectedFile) {
          const storageRef = ref(storage, `images/${selectedFile.name}`);
          const snapshot = await uploadBytes(storageRef, selectedFile);
          photoUrl = await getDownloadURL(snapshot.ref); // Obtém a URL pública do arquivo
        }

        // Atualiza o estado do usuário com a URL da foto
        const userToRegister = { ...user, photo: photoUrl };
        console.log("Corpo da requisição:", JSON.stringify(userToRegister, null, 2));
  
        await registerUser(`/users/register`, userToRegister, setUserResponse);
        toastAlert("Usuário cadastrado com sucesso", "sucesso");
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        toastAlert("Erro ao cadastrar o Usuário", "erro");
      } finally {
        setIsLoading(false);
      }
    } else {
      toastAlert("Dados inconsistentes. Verifique as informações de cadastro.", "erro");
      setUser({ ...user, password: "" });
      setConfirmPassword("");
      setIsLoading(false);
    }
  }
  

  return (
    <>
      <div className="bg-seasalt">
      <section className="grid justify-items-center font-roboto p-16">
        <article className="grid grid-cols-3 rounded-[30px] shadow-xl w-[850px] h-[850px] bg-seasalt">
          <div className="w-full bg-gradient-to-t from-[#070d17] via-[#070d17] to-[#04080f] h-[850px] rounded-s-[30px]">
            <span ></span>
            <img src={CadastroImage} className="w-40 h-40 mx-auto" alt="Cadastro" />
          </div>

          <form
            className="col-span-2 flex flex-col gap-6 p-10 rounded-e-[30px] bg-sunglow-light h-auto"
            onSubmit={registerNewUser}
          >
            <h4 className="text-emerald text-2xl font-roboto font-bold">Cadastrar</h4>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className="border border-davysGray rounded-[10px] p-3 h-14 text-darkMossGreen font-openSans"
              value={user.name}
              onChange={updateUserState}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="border border-davysGray rounded-[10px] p-3 h-14 text-darkMossGreen font-openSans"
              value={user.email}
              onChange={updateUserState}
            />
            <input
              type="text"
              id="cpf_cnpj"
              name="cpf_cnpj"
              placeholder={selectedOption.textPlaceholder}
              className="border border-davysGray rounded-[10px] p-3 h-14 text-darkMossGreen font-openSans"
              value={user.cpf_cnpj}
              onChange={updateUserState}
            />
            <input
              type="file"
              id="photo"
              name="photo"
              placeholder="Foto (URL)"
              className="border border-davysGray rounded-[10px] p-3 h-14 text-darkMossGreen font-openSans"
              value={user.photo}
              onChange={handleFileSelection}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              className="border border-davysGray rounded-[10px] p-3 h-14 text-darkMossGreen font-openSans"
              value={user.password}
              onChange={updateUserState}
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmar Senha"
              className="border border-davysGray rounded-[10px] p-3 h-14 text-darkMossGreen font-openSans"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              <div className="relative mt-1">
                <ListboxButton className="appearance-auto textButton text-darkMossGreen border border-darkMossGreen rounded-[30px] p-3 h-14 w-44">
                  <div className="flex justify-center">
                    {selectedOption.displayType}
                    <CaretDown size={10} className="ml-1 self-center text-darkMossGreen flex" weight="bold" />
                  </div>
                </ListboxButton>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute inset-x-0 z-10 mt-1 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                    {options.map((option, index) => (
                      <ListboxOption
                        key={index}
                        value={option}
                        className={({ active }) =>
                          `flex px-4 py-2 text-sm bg-white text-darkMossGreen hover:bg-sunglow-light rounded-md transition duration-300 ${
                            active ? "bg-sunglow-light text-darkMossGreen" : "text-darkMossGreen"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                              {option.displayType}
                            </span>
                            {selected && <CheckCircle size={18} className="ml-2 text-emerald" />}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </Listbox>

            <p className="text-darkMossGreen font-openSans">
              Já possui uma conta?{" "}
              <Link to="/login" className="text-emerald font-bold hover:underline">
                Faça o Login
              </Link>
            </p>
            <button
              type="submit"
              className="rounded-[10px] bg-emerald text-white w-2/6 h-[60px] flex justify-center items-center hover:bg-darkMossGreen transition"
            >
              {isLoading ? (
                <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
              ) : (
                <span className="flex">
                  Cadastrar
                  <span className="ml-2 flex items-center"><ArrowCircleRight size={18} color="#f7f7f7" weight="fill" />
                  </span>
                </span>
              )}
            </button>
          </form>
        </article>
      </section>
      </div>
    </>
  );
}

export default Register;
