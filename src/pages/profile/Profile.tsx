import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { toastAlert } from "../../utils/ToastAlert";
import User from "../../models/User";
// import Category from "../../models/Category";
import { fetchData } from "../../services/Service";
import ListShopProduct from "../../components/products/listProduct/ListShopProduct";

function Profile() {
    let navigate = useNavigate();
  
    const { user, handleLogout } = useContext(AuthContext);
  
    useEffect(() => {
      if (user.token === "") {
        toastAlert("Você precisa estar logado", "info");
        navigate("/login");
      }
    }, [user.token]);
  
    const [currentUser, setCurrentUser] = useState<User>();
    // const [youCategory, setCategory] = useState<Category[]>();
  
    const token = user.token;
    const userId = user.id;
    useEffect(() => {
      async function fetchUserData() {
        try {
          await fetchData(`/users/${userId}`, setCurrentUser, {
            header: { Authorization: token },
          });
        } catch (error: any) {
          if (error.toString().includes("403")) {
            toastAlert("O token expirou, favor logar novamente", "info");
            handleLogout();
          }
        }
      }
      fetchUserData();
    }, []);
    
  
    let databaseDate;
    let localDate;
  
    if (currentUser && currentUser.data) {
      // Get the 'CreationAt' date from the database
      databaseDate = new Date(currentUser.data);
  
      // TODO: FIX TIMEZONE IN BACKEND
      // Remove 3 hours from the date (Remove the timezone)
      databaseDate.setHours(databaseDate.getHours() - 3);
  
      // Format the date to Friendly Date
      localDate = new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "medium",
      }).format(databaseDate);
    }
  
    console.log(currentUser);
  
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#070d17] to-[#070d17] text-white 
        rounded-lg rounded-b-none
        shadow-md p-6 mb-6">
          <h1 className="text-3xl text-white font-bold text-center">Bem-vindo, {user.name}</h1>
          <p className="text-white text-center mt-2">Gerencie suas informações e acompanhe seus produtos.</p>
        </section>
  
        {/* Foto e Informações */}
        <div className="flex flex-col md:flex-row items-center 
        md:items-start md:justify-between bg-gray-100/10 shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <img
              src={user.photo}
              alt={`Foto de perfil de ${user.name}`}
              className="w-40 h-40 object-cover rounded-full border-4 border-green-500 shadow-lg"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-600">Nome:</p>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-600">Email:</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
              {currentUser?.cpf_cnpj && (
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-600">CPF/CNPJ:</p>
                  <p className="font-medium text-gray-800">{currentUser.cpf_cnpj}</p>
                </div>
              )}
              {localDate && (
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-600">Usuário desde:</p>
                  <p className="font-medium text-gray-800">{localDate}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button className="bg-yellow-400 text-green-800 font-semibold px-6 py-2 rounded-lg shadow hover:shadow-md hover:bg-yellow-500 transition duration-200">
                Editar
              </button>
            </div>
          </div>
        </div>
  
        {/* Admin Section */}
        {currentUser?.type?.toLowerCase() === "admin" && (
          <>
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Suas Categorias</h3>
              {/* <div className="bg-white shadow-lg rounded-lg p-6">
                {youCategory ? (
                  <ListAdminCategoryIcon category={youCategory} />
                ) : (
                  <p className="text-gray-600">Nenhuma categoria cadastrada.</p>
                )}
              </div> */}
            </section>
            <section className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Seus Produtos</h3>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <ListShopProduct user={currentUser} />
              </div>
            </section>
          </>
        )}
      </div>
    );
  }
  
  export default Profile;  