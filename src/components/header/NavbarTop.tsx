import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CaretDown,
  MagnifyingGlass,
  ShoppingCart,
  SignIn,
  SignOut,
  User,
  UserSquare,
} from "@phosphor-icons/react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlert } from "../../utils/ToastAlert";
import HamburgerMenu from "./HamburgerMenu";

function NavbarTop() {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function logout() {
    handleLogout();
    toastAlert("Usuário deslogado com sucesso", "sucesso");
    navigate("/login");
  }

  function handleSearch() {
    if (searchTerm.trim() === "") {
      toastAlert("Digite algo para pesquisar.", "warning");
      return;
    }

    navigate(`/products/names/${searchTerm}`);
    setSearchTerm("");
  }

  const userDropdown = user.token ? (
    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-seasalt shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="px-1 py-1">
        <MenuItem>
          <Link
            to="/profile"
            className="flex px-4 py-2 text-sm bg-seasalt text-darkMossGreen hover:bg-sunglow-light rounded-md"
          >
            <UserSquare size={16} />
            <p className="px-2">Meu Perfil</p>
          </Link>
        </MenuItem>
        {user.type === "admin" && (
          <>
            <MenuItem>
              <Link
                to="registerProduct"
                className="flex px-4 py-2 text-sm bg-seasalt text-darkMossGreen hover:bg-sunglow-light rounded-md"
              >
                <p className="px-2">Criar Produto</p>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/registerCategory"
                className="flex px-4 py-2 text-sm bg-seasalt text-darkMossGreen hover:bg-sunglow-light rounded-md"
              >
                <p className="px-2">Criar Categoria</p>
              </Link>
            </MenuItem>
          </>
        )}
        <MenuItem>
          <Link
            to="/login"
            onClick={logout}
            className="flex px-4 py-2 text-sm bg-seasalt text-darkMossGreen hover:bg-sunglow-light rounded-md"
          >
            <SignOut size={16} />
            <p className="px-2">Sair</p>
          </Link>
        </MenuItem>
      </div>
    </MenuItems>
  ) : (
    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-seasalt shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="px-1 py-1">
        <MenuItem>
          <Link
            to="/login"
            className="flex px-4 py-2 text-sm bg-seasalt text-darkMossGreen hover:bg-sunglow-light rounded-md"
          >
            <SignIn size={16} />
            <p className="px-2">Entrar</p>
          </Link>
        </MenuItem>
      </div>
    </MenuItems>
  );

  return (
    <div className="w-full bg-black text-white flex flex-col md:flex-row items-center justify-between py-3 px-4 md:px-6">
      {/* Logo e elementos do topo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img src={Logo} alt="Logo Safari" className="w-25 md:w-20" />
        </Link>
        {isMobile && (
          <HamburgerMenu user={user} logout={logout} />
        )}
      </div>

      {/* Barra de pesquisa */}
      <div className={`flex flex-1 ${isMobile ? "hidden" : "justify-center"}`}>
        <div className="flex items-center bg-seasalt rounded-full border w-full max-w-2xl lg:max-w-xl md:max-w-lg sm:max-w-md">
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow ml-2 px-1 py-2 rounded-full text-black focus:outline-none text-sm md:text-base"
            aria-label="Pesquisar produtos"
          />
          <button
            onClick={handleSearch}
            className="bg-emerald p-2 rounded-full flex justify-center items-center"
            aria-label="Iniciar busca"
          >
            <MagnifyingGlass size={24} />
          </button>
        </div>
      </div>

      {/* Botões do usuário e carrinho */}
      {!isMobile && (
        <div className="flex items-center gap-6">
          <Menu as="div" className="relative inline-block">
            <MenuButton className="flex items-center gap-1 text-white">
              <User size={22} color="#f7f7f7" weight="light" />
              <CaretDown size={12} />
            </MenuButton>
            <Transition>{userDropdown}</Transition>
          </Menu>
          <Link
            to="/cart"
            className="flex items-center gap-2 p-2 rounded-md"
            aria-label="Ir para o carrinho"
          >
            <ShoppingCart size={22} color="#f7f7f7" weight="light" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavbarTop;
