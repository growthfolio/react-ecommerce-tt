// import { ChangeEvent, useContext, useEffect, useState } from "react";
// import { Dialog, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
// import {
//   ArrowCircleRight,
//   CaretDown,
//   CheckCircle,
//   UploadSimple,
// } from "@phosphor-icons/react";
// import { RotatingLines } from "react-loader-spinner";
// import { Link, useNavigate } from "react-router-dom";

// import UserLogin from "../../models/UserLogin";
// import User from "../../models/User";
// import { AuthContext } from "../../contexts/AuthContext";
// import { toastAlert } from "../../utils/ToastAlert";
// import { registerUser } from "../../services/Service";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../../config/firebaseConfig";

// interface ModalAuthProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const options = [
//   { type: "cliente", displayType: "Quero comprar", textPlaceholder: "CPF" },
//   { type: "admin", displayType: "Quero vender", textPlaceholder: "CNPJ" },
// ];

// function ModalAuth({ isOpen, onClose }: ModalAuthProps) {
//   const [isLoginMode, setIsLoginMode] = useState(true); // Alterna entre login e registro
//   const [loginCredentials, setLoginCredentials] = useState<UserLogin>(
//     {} as UserLogin
//   );
//   const [registerData, setRegisterData] = useState<User>({
//     name: "",
//     email: "",
//     password: "",
//     photo: "",
//     cpf_cnpj: "",
//     type: "cliente",
//   });
//   const [selectedOption, setSelectedOption] = useState(options[0]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const { user, handleLogin } = useContext(AuthContext);

//   const toggleAuthMode = () => setIsLoginMode(!isLoginMode);

//   useEffect(() => {
//     if (user?.token) {
//       navigate("/profile");
//       onClose();
//     }
//   }, [user, navigate, onClose]);

//   function updateLoginState(e: ChangeEvent<HTMLInputElement>) {
//     setLoginCredentials({
//       ...loginCredentials,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function updateRegisterState(e: ChangeEvent<HTMLInputElement>) {
//     setRegisterData({
//       ...registerData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   useEffect(() => {
//     setRegisterData((prev) => ({
//       ...prev,
//       type: selectedOption.type,
//     }));
//   }, [selectedOption]);

//   async function handleRegister(e: ChangeEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (
//       !registerData.name ||
//       !registerData.email ||
//       !registerData.cpf_cnpj ||
//       !registerData.password ||
//       confirmPassword !== registerData.password
//     ) {
//       toastAlert("Preencha todos os campos corretamente!", "error");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       let photoUrl = registerData.photo;

//       if (selectedFile) {
//         const storageRef = ref(storage, `images/${selectedFile.name}`);
//         const snapshot = await uploadBytes(storageRef, selectedFile);
//         photoUrl = await getDownloadURL(snapshot.ref);
//       }

//       const userToRegister = { ...registerData, photo: photoUrl };

//       await registerUser("/users/register", userToRegister, () => {
//         toastAlert("Usuário registrado com sucesso!", "success");
//         toggleAuthMode(); // Voltar para login após registrar
//       });
//     } catch (error) {
//       toastAlert("Erro ao registrar usuário!", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function handleLoginSubmit(e: ChangeEvent<HTMLFormElement>) {
//     e.preventDefault();
//     handleLogin(loginCredentials);
//   }

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
//       <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//           >
//             &times;
//           </button>
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-deepOcean">
//               {isLoginMode ? "Entrar" : "Registrar"}
//             </h2>
//           </div>
//           {isLoginMode ? (
//             <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={loginCredentials.email}
//                 onChange={updateLoginState}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Senha"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={loginCredentials.password}
//                 onChange={updateLoginState}
//               />
//               <button
//                 type="submit"
//                 className="bg-deepOcean text-white rounded-lg p-3 w-full flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <RotatingLines
//                     strokeColor="white"
//                     strokeWidth="5"
//                     animationDuration="0.75"
//                     width="24"
//                     visible={true}
//                   />
//                 ) : (
//                   <>
//                     Entrar
//                     <ArrowCircleRight
//                       size={20}
//                       weight="fill"
//                       className="ml-2"
//                     />
//                   </>
//                 )}
//               </button>
//               <p className="text-center text-sm text-gray-500">
//                 Ainda não tem uma conta?{" "}
//                 <button
//                   onClick={toggleAuthMode}
//                   className="text-deepOcean font-bold hover:underline"
//                 >
//                   Cadastre-se aqui.
//                 </button>
//               </p>
//             </form>
//           ) : (
//             <form onSubmit={handleRegister} className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Nome"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={registerData.name}
//                 onChange={updateRegisterState}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={registerData.email}
//                 onChange={updateRegisterState}
//               />
//               <input
//                 type="text"
//                 name="cpf_cnpj"
//                 placeholder={selectedOption.textPlaceholder}
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={registerData.cpf_cnpj}
//                 onChange={updateRegisterState}
//               />
//               <div className="relative flex flex-col items-start">
//                 <input
//                   type="file"
//                   id="photo"
//                   name="photo"
//                   accept="image/*"
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   onChange={(e) => {
//                     if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
//                   }}
//                 />
//                 <label
//                   htmlFor="photo"
//                   className="border border-gray-300 rounded-lg p-3 w-full cursor-pointer"
//                 >
//                   {selectedFile ? selectedFile.name : "Escolha uma foto"}
//                 </label>
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Senha"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={registerData.password}
//                 onChange={updateRegisterState}
//               />
//               <input
//                 type="password"
//                 placeholder="Confirmar Senha"
//                 className="border border-gray-300 rounded-lg p-3 w-full"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <Listbox value={selectedOption} onChange={setSelectedOption}>
//                 <ListboxButton className="border border-gray-300 rounded-lg p-3 w-full">
//                   {selectedOption.displayType}
//                 </ListboxButton>
//                 <ListboxOptions className="border border-gray-300 rounded-lg mt-1">
//                   {options.map((option, index) => (
//                     <ListboxOption key={index} value={option}>
//                       {option.displayType}
//                     </ListboxOption>
//                   ))}
//                 </ListboxOptions>
//               </Listbox>
//               <button
//                 type="submit"
//                 className="bg-deepOcean text-white rounded-lg p-3 w-full flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <RotatingLines
//                     strokeColor="white"
//                     strokeWidth="5"
//                     animationDuration="0.75"
//                     width="24"
//                     visible={true}
//                   />
//                 ) : (
//                   <>
//                     Registrar
//                     <ArrowCircleRight
//                       size={20}
//                       weight="fill"
//                       className="ml-2"
//                     />
//                   </>
//                 )}
//               </button>
//               <p className="text-center text-sm text-gray-500">
//                 Já tem uma conta?{" "}
//                 <button
//                   onClick={toggleAuthMode}
//                   className="text-deepOcean font-bold hover:underline"
//                 >
//                   Faça login aqui.
//                 </button>
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </Dialog>
//   );
// }

// export default ModalAuth;
