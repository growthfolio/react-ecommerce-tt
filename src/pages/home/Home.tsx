import { Link } from "react-router-dom";
import "./Home.css";
import { ArrowRight } from "@phosphor-icons/react";
import { Preloader } from "../../components/loader/Preloader";
import ListProduct from "../../components/products/listProduct/ListProduct";
import ListCategoryIcons from "../../components/categories/iconsCategories/ListCategoryIcons";
import Carousel from "../../utils/Carousel";
import carouselMock from "../../utils/carouselMock";

function Home() {
  return (
    <>
      <Preloader></Preloader>
      <main>
        {/* Banner principal */}
        <section className=" bg-seasalt  justify-center items-center">
        <Carousel slides={carouselMock} />

          {/* <div className="flex gap-4 image-container p-[200px]">
            <div className="w-[500px] border-red flex flex-col justify-center">
              <p className="font-roboto text-darkMossGreen text-[20px]">
                Qualidade e Confiabilidade
              </p>
              <h3 className="text-[#4682B4]">Encontre os melhores materiais para construção e reforma</h3>
              <button
                type="submit"
                className="mt-4 rounded-[10px] bg-sunglow border border-sunglow hover:bg-[#f7f7f7] text-darkMossGreen w-2/6 h-[60px] p-4 flex justify-center items-center gap-2 transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-110 duration-300 shadow-lg"
              >
                <span className="flex items-center gap-1">
                  Confira agora!
                  <span className="bg-gray-200 rounded-full p-1 flex items-center justify-center">
                    <ArrowRight className="text-darkMossGreen" size={11} />
                  </span>
                </span>
              </button>
            </div>
          </div> */}
        </section>
        <ListCategoryIcons />
        {/* Título para os produtos */}
        <section className="w-ful flex justify-center items-center mt-[50px]  mb-[40px] ">
          <div className="flex gap-4 ">
            <h5>Produtos em Destaque</h5>
          </div>
        </section>
        <ListProduct />
        {/* Links para Produtos e Categorias */}
        <section className="flex justify-center mt-[70px]">
          <div className="justify-around items-center grid grid-cols-2 gap-6 container w-[900px]">
            <Link
              to="/products/all"
              className=" bg-darkMossGreen rounded-2xl  flex justify-center items-center h-[200px] transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-110 duration-300"
            >
              <h5 className="text-white">Produtos</h5>
            </Link>
            <Link
              to="/categories/all"
              className=" bg-darkMossGreen rounded-2xl flex justify-center items-center	h-[200px] transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-110 duration-300"
            >
              <h5 className="text-white">Categorias</h5>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
