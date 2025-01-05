import { LineWave } from "react-loader-spinner";
import User from "../../../models/User";
import ModalProduct from "../modalProduct/ModalProduct";
import CardShopProduct from "../cardProduct/CardShopProduct";


interface CardProductProps {
  user: User;
}

function ListShopProduct(props: CardProductProps) {
  return (
    <>
      {props.user.products === null && (
        <LineWave
          visible={true}
          height="200"
          width="2000"
          color="#3E5622"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <div className="w-[900px] mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center ">
        <ModalProduct type={1} id={0} />

        {Array.isArray(props.user?.products) ? (
          props.user.products.map((product) => (
            <CardShopProduct key={product.id} product={product} />
          ))
        ) : (
          <p className="text-black">Nenhum produto encontrado.</p>
        )}
      </div>
    </>
  );
}

export default ListShopProduct;
