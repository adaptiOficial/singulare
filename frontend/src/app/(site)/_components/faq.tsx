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
    <div className="flex flex-col items-center bg-cloudDancer shadow-[0_-1px_20px_hsl(var(--branco-gelo))] pb-16">
      
      <div className="flex justify-center pt-12 bg-cloudDancer w-80 relative -top-4 px-8 py-4 rounded-t-xl ">
        <h1 className="text-xl font-semibold">Dúvidas Frequentes</h1>
      </div>

      <div className="bg-zinc-800 text-white w-[900px] rounded-xl p-6 flex flex-col">
        
        {faqs?.map((item, index) => (
          <div key={index} className="border-b border-zinc-500 last:border-none">
            
            {/* Pergunta */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <span>{item.question}</span>
              <Image src={'/arrowUp.svg'}  alt="arrow" width={14} height={7} className={`overflow-hidden transition-all  duration-300 ${
                openIndex === index ? "rotate-0" : "-rotate-180"
              }`}/>
             
            </button>

            {/* Resposta */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-sm text-zinc-300">
                {item.answer}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}