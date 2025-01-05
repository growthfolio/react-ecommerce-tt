
import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import "../../index.css";

function Footer() {
  return (
    <>
      <div className="flex justify-around gap-5 align-middle p-10 mt-20 bg-gray-100">
        {/* Unidade II */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase">Unidade II</h6>
          <p>R. Carlos Leal Evans, Nº 255, SP</p>
          <p>Jardim Santa Francisca, Guarulhos, 07024-020</p>
          <p>CNPJ: 02.423.640/0003-00</p>
        </div>

        {/* Redes Sociais */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase">Redes Sociais</h6>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram">
              <InstagramLogo size={24} weight="fill" className="text-blue-600" />
            </a>
            <a href="#" aria-label="Facebook">
              <FacebookLogo size={24} weight="fill" className="text-blue-600" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LinkedinLogo size={24} weight="fill" className="text-blue-600" />
            </a>
          </div>
        </div>

        {/* Central de Atendimento */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase">Central de Atendimento</h6>
          <p>
            <span className="font-bold">Telefone:</span> (11) 2911-9888
          </p>
          <p>
            <span className="font-bold">Horário de atendimento:</span>
          </p>
          <p>Segunda a Quinta das 08:00h às 18h</p>
          <p>Sexta das 08:00h às 17h</p>
        </div>

        {/* Minha Conta */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase">Minha Conta</h6>
          <a href="#" className="text-blue-600 hover:underline">
            Meus pedidos
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Minha conta
          </a>
        </div>
      </div>

      {/* Rodapé final */}
      <div className="flex justify-center border-t-2 py-2 bg-gray-100">
        <p className="paragraph me-1">Copyright © </p>
        <p className="paragraphBold me-1">Safari Distribuira |</p>
        <p className="paragraph me-1">Desenvolvido por</p>
        <p className="paragraphBold">Felipe Macedo Apps</p>
      </div>
    </>
  );
}

export default Footer;
