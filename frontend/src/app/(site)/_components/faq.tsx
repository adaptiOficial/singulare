'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { faqType } from "@/types/faq";
import { api } from "@/services/api";

export  function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<faqType[] | null>(null);

  const getFaq = async () => {
     const { response } = await api<faqType[]>(
      'GET',
      '/faq-all',
    );

    if(response){
      setFaqs(response);
    }
  }

useEffect(() => {
  getFaq();
}, []);


  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center mx-[10%] lg:my-20 my-8 ">
    
      <div className="flex md:justify-start justify-center w-full lg:mb-20 sm:mb-8 mb-4">
        <h1 className="lg:text-[48px] md:text-[36px] text-[26px] font-bold">Dúvidas Frequentes</h1>
      </div>

      <div className=" text-white w-full rounded-xl  flex flex-col ">
        
        {faqs?.map((item, index) => (
          <div key={index} className=" mb-5 last:border-none ">
            
            {/* Pergunta */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center rounded-[20px] lg:py-8 py-3 lg:px-[66px] md:px-10 px-3 text-left bg-[#4DADB0]"
            >
              <span className="lg:text-[32px] md:text-[24px] sm:text-[18px] text-[13px]">{item.question}</span>
              <Image src={'/arrowUpBoldBlack.png'}  alt="arrow" width={16} height={9} className={`overflow-hidden transition-all  duration-300 ${
                openIndex === index ? "rotate-0" : "-rotate-180"
              }`}/>
             
            </button>

            {/* Resposta */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? " " : "max-h-0"
              }`}
            >
              <div className="bg-[#ABE3E5B2] rounded-[20px] lg:py-[72px] md:py-10 lg:px-[66px] md:px-10 px-3 py-8 mt-[10px]">
                <p className="lg:text-[32px] md:text-[24px] sm:text-[16px] text-[11px] text-white">
                  {item.answer}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}