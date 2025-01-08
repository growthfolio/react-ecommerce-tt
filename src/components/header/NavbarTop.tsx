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
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlert } from "../../utils/ToastAlert";

function NavbarTop() {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  function logout() {
    handleLogout();
    toastAlert("Usuário deslogado com sucesso", "sucesso");
    navigate("/login");
  }

  function handleSearch() {
    if (searchTerm) {
      navigate(`/products/names/${searchTerm}`);
    }
  }

  const userDropdown = user.token ? (
    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-seasalt shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
    <div className="w-full bg-gradient-to-t from-[#070d17] via-[#04080f] to-[#04080f] text-white flex items-center justify-between py-3 px-6">
      {/* Logo */}
      <Link to="/home" className="flex items-center">
        <img src={Logo} alt="Logo" className="w-20" />
      </Link>

      {/* Barra de pesquisa */}
      <div className="flex flex-1 justify-center">
        <div className="flex items-center bg-seasalt rounded-r-full border w-full max-w-2xl lg:max-w-xl md:max-w-lg sm:max-w-md">
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow ml-2 px-1 py-2 rounded-full text-black focus:outline-none text-sm md:text-base"
          />
          <button
            onClick={handleSearch}
            className="bg-emerald p-2 rounded-full border-1 border-emerald rounded-l-none flex justify-center items-center"
          >
            <span>
              <MagnifyingGlass size={28} />
            </span>
          </button>
        </div>
      </div>

      {/* Botões do usuário e carrinho */}
      <div className="flex items-center gap-6">
        {/* Perfil */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="flex items-center gap-1 text-white">
            <span className="">
              <User size={22} color="#f7f7f7" weight="light" />
            </span>
            <CaretDown size={12} />
          </MenuButton>
          <Transition>{userDropdown}</Transition>
        </Menu>
        {/* Carrinho */}
        <Link
          to="/cart"
          className="flex items-center gap-2 p-2 rounded-md text-black"
        >
          <ShoppingCart size={22} color="#f7f7f7" weight="light" />
        </Link>
      </div>
    </div>
  );
}

export default NavbarTop;
