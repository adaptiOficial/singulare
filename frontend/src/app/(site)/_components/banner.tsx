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
      const { response } = await api<paginationResponseType<bannerType[]>>(
        'GET',
        '/banners',
      );

      if (!response) {
        toast({
          title: 'Não foi possível carregar o banner'
        });
        return;
      }
      
      const data = response.data[0];
      setBanner(data);
    }

    loadData();
  }, []);

  if (!banner) {
    return null;
  }

  return (
    <div className="relative w-full h-[100dvh] md:h-[600px] flex">
      
      <div className="absolute inset-0 bg-black/60 z-10 md:hidden" />

    
      <div className="absolute inset-0 md:left-1/2 md:w-1/2 w-full h-full z-0">
        <Image
          src={banner.image}
          alt={banner.title || 'Banner principal'}
          fill
          priority
          className="object-cover object-top md:object-center"
        />
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center md:items-start w-full md:w-1/2 h-full px-6 md:pl-[10%] md:pr-12 bg-transparent md:bg-white text-center md:text-left">
        
        <h1 className="text-4xl md:text-[44px] lg:text-[52px] font-bold text-white md:text-[#4DADB0] leading-tight mb-8">
          {banner.title}
        </h1>
        
        {banner.subtitle && (
          <p className="text-lg md:text-xl text-gray-200 md:text-gray-600 mb-8 max-w-xl">
            {banner.subtitle}
          </p>
        )}

        {banner.button_text && (
          <a
            href="#inscricao"
            className="bg-[#4DADB0] text-white px-10 py-4 rounded-xl text-lg md:text-xl font-semibold hover:bg-[#3a8587] transition-all shadow-lg shadow-[#4DADB0]/30"
          >
            {banner.button_text}
          </a>
        )}
      </div>

    </div>
  )
}