import 'reactjs-popup/dist/index.css';
import './ModalProduct.css';
import {
  ModalButtonAlter,
  ModalButtonCreate,
  ModalButtonDelete,
} from './modalButton/ModalButton';

interface ModalProductProps {
  type: number;
  id: number;
}

function ModalProduct(props: ModalProductProps) {
  // Componente do botão para o tipo 1

  switch (props.type) {
    case 1:
      return (
        <>
          <ModalButtonCreate></ModalButtonCreate>
        </>
      );
      break;
    case 2:
      return (
        <>
          <ModalButtonAlter id={props.id}></ModalButtonAlter>
        </>
      );
      break;
    case 3:
      return (
        <>
          <ModalButtonDelete id={props.id}></ModalButtonDelete>
        </>
      );
      break;
  }
}

export default ModalProduct;
