import Image from "next/image";

export function WaterMark(){

    return (
        <div className="flex px-32   justify-between bg-cinzaCarvao w-full text-white py-4 ">
            <p>Desenvolvido por <span className="font-bold">Adapti Soluções Web</span></p>
            <div className="flex gap-4">
                 <a href=""><Image src={'/facebook.svg'} alt='facebook-icon' width={24} height={24}/></a>
                 <a href=""><Image src={'/linkedin.svg'} alt='facebook-icon' width={24} height={24} /></a>
            </div>

        </div>
    )
}