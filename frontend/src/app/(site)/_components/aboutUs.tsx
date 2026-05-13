'use client'

import { api } from "@/services/api";
import { aboutUsType } from "@/types/aboutUs";
import { paginationResponseType } from "@/types/pagination-response";
import Image from "next/image";
import { useToast } from "@/components/use-toast";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";

export function AboutUs() {
  const { toast } = useToast();

  const [aboutUs, setAboutUs] = useState<aboutUsType | null>(null);

  useEffect(() => {
    async function loadData() {
      const { response } =
        await api<paginationResponseType<aboutUsType[]>>(
          'GET',
          '/about-us',
        );
        

      if (!response) {
        toast({
          title: 'Não foi possível carregar a imagem'
        });

        return;
      }
       const data = response.data[0];


        setAboutUs(data);
    
    }

    loadData();
  }, []);


  if (!aboutUs){
return
  }

  return (
    <div className="flex flex-col items-center bg-cloudDancer gap-24 mb-24">

      <div className="relative -top-6 bg-cloudDancer w-80 flex justify-center rounded-t-xl pt-2 ">
        <Image
          src={'/arrowUpBlack.svg'}
          alt="arrowUp"
          width={47}
          height={38}
          className="animate-[jump_2s_ease-in-out_infinite]"
        />
      </div>

      <div className="flex items-stretch gap-20 max-w-[1200px] w-full">

        <div className="flex-1 relative">

          <div className="absolute -left-6 -top-4 w-full h-full bg-cinzaCarvao rounded-2xl" />

          <Image
            src={aboutUs.image}
            alt="Equipe"
            width={600}
            height={400}
            className="relative border-4 border-cloudDancer rounded-2xl object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">

          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-2xl font-semibold mb-4">
              SOBRE NÓS
            </h1>

            <p className="text-md text-zinc-700 leading-relaxed">
              {aboutUs.text}
            </p>
          </div>

          <div className="mt-auto h-[1px] bg-zinc-400 w-full" />
        </div>
      </div>
    </div>
  );
}