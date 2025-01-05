import "reactjs-popup/dist/index.css";
import "./ModalCategoria.css";
import {
  ModalButtonAlter,
  ModalButtonCreate,
  ModalButtonDelete,
} from "./modalButton/ModalButton";
interface ModalCategoriaProps {
  type: number;
  id: number;
}

function ModalCategoria(props: ModalCategoriaProps) {
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

export default ModalCategoria;