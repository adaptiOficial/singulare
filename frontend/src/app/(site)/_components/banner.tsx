'use client'
import { useToast } from "@/components/use-toast";
import { api } from "@/services/api";
import { bannerType } from "@/types/banner";
import { paginationResponseType } from "@/types/pagination-response";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Banner() {

      const { toast } = useToast();

  const [banner, setBanner] = useState<bannerType | null>(null);

  useEffect(() => {
    async function loadData() {
      const { response } =
        await api<paginationResponseType<bannerType[]>>(
          'GET',
          '/banners',
        );
        

      if (!response) {
        toast({
          title: 'Não foi possível carregar a imagem'
        });

        return;
      }
       const data = response.data[0];


        setBanner(data);
    
    }

    loadData();
  }, []);


  if (!banner){
return
  }

  return (
    <div className="relative w-full h-[600px] z-0">
      <Image
        src={banner.image}
        alt='imagem equipe'
        fill
        className="object-cover"
      />
    </div>
  )

}