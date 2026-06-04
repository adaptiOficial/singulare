import Image from "next/image";

export default function Investimento() {
    return(
        <div className="lg:mx-[150px] lg:my-20 sm:mx-[100px] my-8 mx-8">
            <h1 className="lg:text-[48px] md:text-[36px] max-md:text-[22px] font-semibold">Investimento</h1>
            <Image 
            src="/investimento.png" 
            alt="Imagem do Investimento" 
            width={1114} height={774}
            />
        </div>
    )
}
