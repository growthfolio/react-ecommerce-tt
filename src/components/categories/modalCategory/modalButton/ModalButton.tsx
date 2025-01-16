import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import plus from '../../../../assets/icons/plus.svg';
import FormCadCategory from '../../formCategory/FormCreateCategory';
import FormEditCategory from '../../formCategory/FormEditCategory';
import DeleteCategory from '../../deleteCategory/DeleteCategory';

export function ModalButtonCreate() {
  return (
    <>
      <Popup
        trigger={
          <button className="w-[200px] rounded-[15px] bg-seasalt px-3 py-2 flex justify-center items-center transition ease-in-out delay-50 hover:-translate-y-4 hover:scale-110 duration-300 shadow-lg">
            <div>
              <img src={plus} className="w-20" />
            </div>
          </button>
        }
        modal
        contentStyle={{
          width: 'fit-content',
          height: 'fit-content',
          padding: '2rem',
        }}
      >
        <div>
          <FormCadCategory />
        </div>
      </Popup>
    </>
  );
}

interface ModalEditCategoryProps {
  id: number;
}

export function ModalButtonAlter({ id }: ModalEditCategoryProps) {
  return (
    <>
      <Popup
        trigger={
          <button
            type="submit"
            className="mt-4 rounded-[7px]  bg-sunglow border border-sunglow hover:bg-[#f7f7f7]text-darkMossGreen textButton  text-darkMossGreen h-[40px] p-4 flex justify-center items-center transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-110 duration-300 shadow-lg "
          >
            <p className="textButton">Alterar</p>
          </button>
        }
        modal
        contentStyle={{
          width: 'fit-content',
          height: 'fit-content',
          padding: '2rem',
        }}
      >
        <div>
          <FormEditCategory id={id} />
        </div>
      </Popup>
    </>
  );
}

interface ModalButtonDeleteProps {
  id: number;
}

export function ModalButtonDelete({ id }: ModalButtonDeleteProps) {
  return (
    <>
      <Popup
        trigger={
          <button
            type="submit"
            className="mt-4 rounded-[7px]  bg-[#FF5757] border border-[#FF5757] hover:bg-[#f7f7f7]text-darkMossGreen textButton  text-darkMossGreen h-[40px] p-4 flex justify-center items-center transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-110 duration-300 shadow-lg "
          >
            <p className="textButton text-white">Deletar</p>
          </button>
        }
        modal
        contentStyle={{
          width: 'fit-content',
          height: 'fit-content',
          padding: '4rem',
        }}
      >
        <div>
          <DeleteCategory id={id} />
        </div>
      </Popup>
    </>
  );
}
