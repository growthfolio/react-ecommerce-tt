// import { Link } from "react-router-dom";
import './Home.css';
import ListProduct from '../../components/products/listProduct/ListProduct';
import Carousel from '../../utils/Carousel';
import carouselMock from '../../utils/carouselMock';

function Home() {
  return (
    <>
      <main>
        <section className=" bg-seasalt  justify-center items-center">
          <Carousel slides={carouselMock} />
        </section>
        <section className="w-ful flex justify-center items-center mt-[50px]  mb-[40px] ">
          <div className="flex gap-4">
            <h5
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '30px',
                color: '#36454F',
              }}
            >
              Produtos em Destaque
            </h5>
          </div>
        </section>
        <section className="w-full">
          <ListProduct />
        </section>
      </main>
    </>
  );
}

export default Home;
