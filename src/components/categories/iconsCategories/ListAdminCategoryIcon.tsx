import "../../../index.css";
import Category from "../../../models/Category";
import CardCategory from "../cardCategory/CardCategory";
import ModalCategory from "../modalCategory/ModalCategory";


interface CategoryCardProps {
  category: Category[];
}

function ListAdminCategoryIcon(props: CategoryCardProps) {

  return (
    <>

      <div className=" flex justify-center mb-5">
        <div className="container flex flex-col items-center justify-center text-white">
          <div className="mt-4">
            <h5 className="font-Roboto text-darkMossGreen mb-5">
              Categorias
            </h5>
          </div>
          <div className="w-[900px] mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center ">
            <ModalCategory type={1} id={0} />

            {Array.isArray(props.category) && props.category.length > 0 ? (
              props.category.map((category) => (
                <CardCategory key={category.id} category={category} />
              ))
            ) : (
              <p className="text-black">Nenhum produto encontrado.</p>
            )}
          </div>
          <div className="mb-4"></div>
          <div className="flex justify-center gap-5 mb-9"></div>
        </div>
      </div>
    </>
  );
}

export default ListAdminCategoryIcon;