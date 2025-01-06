import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import Category from "../../models/Category";
import { fetchData } from "../../services/Service";

function NavbarBottom() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchData("/categories/all", setCategories, { headers: {} });
  }, []);

  return (
    <nav className="w-full bg-gradient-to-t from-[#070d17] via-[#04080f] to-[#070d17] text-white flex justify-center py-3">
      <div className="flex gap-10 text-[16px] font-bold">
        <Link to="/home" className="hover:text-[#f88629]">Home</Link>
        <Link to="/products/all" className="hover:text-[#f88629]">Produtos</Link>
        <Menu as="div" className="relative inline-block">
          <MenuButton className="hover:text-[#f88629]">
            Categorias
          </MenuButton>
          <Transition>
            <MenuItems className="absolute mt-2 z-10 rounded-lg rounded-tl-none w-56 bg-seasalt shadow-lg">
              <MenuItem>
                <Link to="/categories/all" className="block text-black px-4 py-2 text-sm">Todas Categorias</Link>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id}>
                  <Link to={`/categories/${category.id}`} className="block px-4 py-2 text-black text-sm">
                    {category.name}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>
        <Link to="/about" className="hover:text-[#f88629]">Sobre</Link>
      </div>
    </nav>
  );
}

export default NavbarBottom;
