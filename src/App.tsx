import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Importando as páginas
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ListCategory from "./components/categories/listCategory/ListCategory";
import SearchByCategory from "./components/categories/searchProductsByCategory/SearchByCategory";
import ListProduct from "./components/products/listProduct/ListProduct";
import SearchProducts from "./components/products/searchProducts/SearchProducts";
import FormProduct from "./components/products/formProduct/FormProduct";
import DeleteCategory from "./components/categories/deleteCategory/DeleteCategory";
import FormCategory from "./components/categories/formCategory/FormCreateCategory";
import CartPage from "./pages/cart/Cart";
import FormEditCategory from "./components/categories/formCategory/FormEditCategory";
import FormEditProduct from "./components/products/formProduct/FormEditProduct";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <div className="min-h-[80vh] bg-seasalt">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories/all" element={<ListCategory />} />
            <Route path="/categories/:id" element={<FormCategory />} />
            <Route
              path="/categories/name/:name"
              element={<SearchByCategory />}
            />
            <Route path="/registerCategory" element={<FormCategory />} />
            <Route path="/editCategory/:id" element={<FormEditCategory />} />
            <Route
              path="/deleteCategory/:id"
              element={<DeleteCategory id={0} />}
            />
            <Route path="/products/all" element={<ListProduct />} />
            <Route path="/product/names/:name" element={<SearchProducts />} />
            <Route path="/registerProduct" element={<FormProduct />} />
            <Route path="/editProduct/:id" element={<FormEditProduct id={0} />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
