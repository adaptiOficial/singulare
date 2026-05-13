import Image from "next/image"
export function Navbar(){
    return (
        <div className="w-full flex justify-between items-center px-16 text-xl font-semibold bg-cinzaCarvao text-white h-28 ">
            <div>
            <Image src='/logoAdapti.png' alt="Logo Empresa" width={100} height={100} />
            </div>
            <div className="flex gap-4">
                <a href="">Sobre Nós</a>
                <a href="">Nosso Serviços</a>
                <a href="">Feedback</a>
                <a href="">Dúvidas Frequentes</a>
            </div>

        </div>
    )
} 
    