import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "../../assets/icons/arrow_white.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { toastAlert } from "../../utils/ToastAlert";
import User from "../../models/User";
import Category from "../../models/Category";
import { fetchData } from "../../services/Service";
import ListAdminCategoryIcon from "../../components/categories/iconsCategories/ListAdminCategoryIcon";
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
    const [youCategory, setCategory] = useState<Category[]>();
  
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
      <>
        <div className="mx-auto my-4 overflow-hidden flex flex-col">
          <section className="justify-center">
            <div className="h-[300px] bg-seasalt flex justify-center items-center">
              <h3 className="font-roboto">Bem Vindo ao seu Perfil</h3>
            </div>
          </section>
          <div className="justify-center w-full">
            <div className="relative grid grid-flow-row justify-items-center text-black text-2xl rounded-xl">
              <div className="flex justify-center mt-[-6rem]">
                <img
                  src={user.photo}
                  alt={`Foto de perfil de ${user.name}`}
                  className="w-[200px] h-[200px] object-cover rounded-full self-start border-8 border-[#3E5622]"
                />
              </div>
              <div className="m-10">
                <h3 className="font-bold text-darkMossGreen">{user.name}</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-flow-row m-4 w-4/6 h-[400px] bg-seasalt rounded-3xl">
              <div className="p-10 grid grid-cols-2 gap-4 content-end pt-[70px] font-bold text-[#525C60]">
                <div>
                  <p>Nome: {user.name} </p>
                </div>
                <div>
                  <p>Email: {user.email}</p>
                </div>
                <div>
                  {currentUser != null && <p>CPF/CNPJ: {currentUser.cpf_cnpj}</p>}
                </div>
                <div>{localDate && <p>Usuário desde: {localDate}</p>}</div>
              </div>
              <div className="flex justify-end items-end">
                <button className="rounded-[10px] bg-sunglow text-darkMossGreen font-bold w-1/6 h-[60px] p-4 m-6 transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-110 duration-300 shadow-lg">
                  <span className="flex ml-4">
                    Editar
                    <img src={Row} className="w-4 ms-2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
  
          {currentUser?.type?.toLowerCase() === "admin" && (
            // <ListAdminCategoryIcon category={youCategory}></ListAdminCategoryIcon>
            <span></span>
          )}
  
          {currentUser?.type?.toLowerCase() === "admin" && (
            <>
              <section className="w-ful flex justify-center items-center mt-[50px]  mb-[40px] ">
                <div className="flex gap-4 ">
                  <h5>Seus Produtos</h5>
                </div>
              </section>
              <ListShopProduct user={currentUser}></ListShopProduct>
            </>
          )}
        </div>
      </>
    );
  }
  
  export default Profile;  