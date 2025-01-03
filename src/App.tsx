import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importando as páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListCategory from './pages/ListCategory';
import FormCategory from './pages/FormCategory';
import SearchByCategory from './pages/SearchByCategory';
import DeleteCategory from './pages/DeleteCategory';
import ListProduct from './pages/ListProduct';
import SearchProducts from './pages/SearchProducts';
import FormProduct from './pages/FormProduct';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories/all" element={<ListCategory />} />
            <Route path="/categories/:id" element={<FormCategory />} />
            <Route path="/categories/name/:name" element={<SearchByCategory />} />
            <Route path="/registerCategory" element={<FormCategory />} />
            <Route path="/editCategory/:id" element={<FormCategory />} />
            <Route path="/deleteCategory/:id" element={<DeleteCategory />} />
            <Route path="/product/all" element={<ListProduct />} />
            <Route path="/product/names/:name" element={<SearchProducts />} />
            <Route path="/registerProduct" element={<FormProduct />} />
            <Route path="/editProduct/:id" element={<FormProduct />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;