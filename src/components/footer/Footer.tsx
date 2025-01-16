import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from '@phosphor-icons/react';

function Footer() {
  return (
    <>
      <div
        className="flex justify-around gap-5 align-middle p-10 mt-20 
      bg-gradient-to-t from-[#070d17] via-[#04080f] to-[#070d17] text-white
      "
      >
        {/* Unidade II */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold font-white uppercase text-[#f88629]">
            Unidade II
          </h6>
          <p>R. Carlos Leal Evans, Nº 255, SP</p>
          <p>Jardim Santa Francisca, Guarulhos, 07024-020</p>
          <p>CNPJ: 02.423.640/0003-00</p>
        </div>

        {/* Central de Atendimento */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase text-[#f88629]">
            Central de Atendimento
          </h6>
          <p>
            <span className="font-bold">Telefone:</span> (11) 2911-9888
          </p>
          <p>
            <span className="font-bold">Horário de atendimento:</span>
          </p>
          <p>Segunda a Quinta das 08:00h às 18h</p>
          <p>Sexta das 08:00h às 17h</p>
        </div>

        {/* Redes Sociais */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase text-[#f88629]">Redes Sociais</h6>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook">
              <FacebookLogo size={28} weight="fill" className="text-gray-200" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramLogo
                size={28}
                weight="fill"
                className="text-gray-200"
              />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LinkedinLogo size={28} weight="fill" className="text-gray-200" />
            </a>
          </div>
        </div>

        {/* Minha Conta */}
        <div className="grid grid-rows justify-items-center">
          <h6 className="font-bold uppercase text-[#f88629]">Minha Conta</h6>
          <a href="#" className="text-white-600 hover:underline">
            Meus pedidos
          </a>
          <a href="/profile" className="text-white-600 hover:underline">
            Minha conta
          </a>
        </div>
      </div>

      {/* Rodapé final    #f88629  #00923f */}
      <div className="flex justify-center border-t-2 via-[#04080f] to-[#070d17]] py-2 bg-gradient-to-t from-[#070d17] via-[#04080f] to-[#070d17] text-white">
        <p className="paragraph me-1">Copyright © </p>
        <p className="paragraphBold me-1">Safari Distribuira |</p>
        <p className="paragraph me-1">Desenvolvido por</p>
        <p className="paragraphBold">Felipe Macedo Apps</p>
      </div>
    </>
  );
}

export default Footer;
