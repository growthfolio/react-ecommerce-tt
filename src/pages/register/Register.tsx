import { ArrowCircleRight, UploadSimple } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import CadastroImage from "../../assets/Logo.png";
import "./../../index.css";
import User from "../../models/User";
import { toastAlert } from "../../utils/ToastAlert";
import { registerUser } from "../../services/Service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

// const options = [
//   { type: "cliente", displayType: "Quero comprar", textPlaceholder: "CPF" },
//   { type: "admin", displayType: "Quero vender", textPlaceholder: "CNPJ" },
// ];

function Register() {
  const navigate = useNavigate();

  // const [selectedOption, setSelectedOption] = useState(options[0]);
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
      toastAlert(
        "Arquivo selecionado. Envie o formulário para concluir o upload.",
        "info"
      );
    }
  }

  // function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0]; // Obtém o arquivo selecionado pelo usuário
  //   if (file) {
  //     const storageRef = ref(storage, `images/${file.name}`); // Cria uma referência no Firebase Storage
  //     uploadBytes(storageRef, file) // Faz o upload do arquivo
  //       .then((snapshot) => {
  //         getDownloadURL(snapshot.ref) // Obtém a URL pública do arquivo
  //           .then((url) => {
  //             setUser((prevState) => ({
  //               ...prevState,
  //               photo: url, // Atualiza o estado do usuário com a URL
  //             }));
  //             toastAlert("Imagem enviada com sucesso!", "sucesso");
  //           });
  //       })
  //       .catch((error) => {
  //         console.error("Erro ao fazer upload:", error);
  //         toastAlert("Erro ao enviar a imagem.", "erro");
  //       });
  //   }
  // }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function updateUserState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  // useEffect(() => {
  //   setUser((prevState) => ({
  //     ...prevState,
  //     type: selectedOption.type,
  //   }));
  // }, [selectedOption]);

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmPassword === user.password && user.password.length >= 8) {
      setIsLoading(true);

      try {
        let photoUrl = user.photo;

        if (selectedFile) {
          const storageRef = ref(storage, `images/${selectedFile.name}`);
          const snapshot = await uploadBytes(storageRef, selectedFile);
          photoUrl = await getDownloadURL(snapshot.ref); // Obtém a URL pública do arquivo
        }

        const userToRegister = { ...user, photo: photoUrl };
        console.log(
          "Corpo da requisição:",
          JSON.stringify(userToRegister, null, 2)
        );

        await registerUser(`/users/register`, userToRegister, setUserResponse);
        toastAlert("Usuário cadastrado com sucesso", "sucesso");
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        toastAlert("Erro ao cadastrar o Usuário", "erro");
      } finally {
        setIsLoading(false);
      }
    } else {
      toastAlert(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro"
      );
      setUser({ ...user, password: "" });
      setConfirmPassword("");
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-seasalt min-h-[80vh] registerBackground flex justify-center items-center px-4">
      <section className="grid grid-cols-1 md:grid-cols-3 max-w-screen-md rounded-[30px] shadow-xl bg-seasalt w-full">
        {/* Lado Esquerdo (Imagem e Background) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-t from-[#070d17] via-[#070d17] to-[#04080f] rounded-s-[30px] p-6">
          <img
            src={CadastroImage}
            className="items-centerw-40 h-40"
            alt="Cadastro"
          />
        </div>

        {/* Formulário */}
        <form
          className="col-span-2 flex flex-col gap-6 p-8 rounded-e-[30px] bg-sunglow-light w-full"
          onSubmit={registerNewUser}
        >
          <h4 className="text-emerald text-2xl font-bold text-center">
            Cadastrar
          </h4>

          {/* Nome */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
            value={user.name}
            onChange={updateUserState}
          />

          {/* Email */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
            value={user.email}
            onChange={updateUserState}
          />

          {/* CPF/CNPJ */}
          <input
            type="text"
            id="cpf_cnpj"
            name="cpf_cnpj"
            placeholder="CPF"
            className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
            value={user.cpf_cnpj}
            onChange={updateUserState}
          />

          {/* Upload de Foto */}
          <div className="relative flex flex-col items-start border border-davysGray rounded-lg p-3">
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-labelledby="photo-label"
              onChange={(e) => {
                handleFileSelection(e);
                if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
              }}
            />
            <label
              id="photo-label"
              htmlFor="photo"
              className="flex items-center gap-2 cursor-pointer w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <UploadSimple size={24} className="text-darkMossGreen" />
                <span>
                  {selectedFile ? selectedFile.name : "Escolha uma foto"}
                </span>
              </div>
            </label>
            {selectedFile && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="absolute right-4 text-red-500 hover:text-red-700 transition"
                aria-label="Limpar arquivo selecionado"
              >
                ✕
              </button>
            )}
          </div>

          {/* Senhas */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
            value={user.password}
            onChange={updateUserState}
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Senha"
            className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />

          {/* Tipo de Cadastro (Cliente/Admin) */}
          {/* <Listbox value={selectedOption} onChange={setSelectedOption}>
              <div className="relative">
                <ListboxButton className="border border-darkMossGreen rounded-lg p-3 h-14 text-darkMossGreen w-full flex items-center justify-between">
                  <span>{selectedOption.displayType}</span>
                  <CaretDown
                    size={18}
                    className="text-darkMossGreen"
                    weight="bold"
                  />
                </ListboxButton>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute inset-x-0 mt-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-1">
                    {options.map((option, index) => (
                      <ListboxOption
                        key={index}
                        value={option}
                        className={({ active }) =>
                          `px-4 py-2 text-sm rounded-md transition ${
                            active ? "bg-sunglow-light" : ""
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span className={selected ? "font-medium" : ""}>
                              {option.displayType}
                            </span>
                            {selected && (
                              <CheckCircle size={18} className="text-emerald" />
                            )}
                          </div>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </Listbox> */}

          {/* Login Link */}
          <p className="text-center text-sm text-darkMossGreen">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="text-emerald font-bold hover:underline"
            >
              Faça o Login
            </Link>
          </p>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            className="bg-emerald text-white rounded-lg h-14 flex items-center justify-center gap-2 hover:bg-darkMossGreen transition"
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
              <>
                Cadastrar
                <ArrowCircleRight size={20} weight="fill" />
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;
