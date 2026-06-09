'use client'

import { useToast } from "@/components/use-toast";
import { api } from "@/services/api";
import { bannerType } from "@/types/banner";
import { paginationResponseType } from "@/types/pagination-response";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

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
    <div className="relative z-40 w-full min-h-[90vh] md:min-h-[550px] lg:min-h-[650px] h-auto flex flex-col md:flex-row mb-12 lg:mb-24 overflow-hidden">
      
      <div className="absolute inset-0 bg-black/50 z-10 md:hidden" />

      <div className="absolute inset-0 md:left-auto md:right-0 md:w-[450px] lg:w-[600px] xl:w-[700px] z-0 overflow-hidden">
        <Image
          src={banner.image}
          alt={banner.title || 'Banner principal'}
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-20 flex flex-col justify-center items-center w-full md:w-[calc(100%-450px)] lg:w-[calc(100%-600px)] xl:w-[calc(100%-700px)] h-auto min-h-[90vh] md:min-h-[550px] lg:min-h-[650px] px-6 md:px-10 lg:px-16 xl:px-24 bg-transparent md:bg-white text-center py-24 lg:py-32">
        
        <h1 className="w-full text-4xl sm:text-5xl md:text-[52px] lg:text-6xl xl:text-[72px] font-bold md:font-normal text-white md:text-[#4DADB0] leading-tight md:leading-[1.1] mb-4 md:mb-6">
          {banner.title}
        </h1>
        
        {banner.subtitle && (
          <p className="w-full text-xl md:text-2xl text-white md:text-gray-600 mb-8 md:mb-12">
            {banner.subtitle}
          </p>
        )}

        {banner.button_text && banner.button_text !== '\0' && banner.button_text.trim() !== '' && (
          <a
            href="#inscricao"
            className="bg-white text-black md:bg-[#4DADB0] md:text-white px-8 py-3 md:px-12 md:py-4 rounded-full md:rounded-2xl text-lg md:text-xl font-bold md:font-semibold hover:bg-gray-200 md:hover:bg-[#3a8587] transition-all shadow-lg"
          >
            {banner.button_text}
          </a>
        )}
      </div>

      <div className="absolute bottom-0 w-full z-30 pointer-events-none drop-shadow-[0_-8px_16px_rgba(0,0,0,0.15)]">
        <div className="absolute bottom-0 w-full h-6 md:h-10 bg-white" />

        <div className="relative mx-auto w-[240px] md:w-[320px] lg:w-[360px] h-16 md:h-20 lg:h-24 bg-white rounded-t-[1.5rem] md:rounded-t-[2.5rem] flex items-center justify-center pointer-events-auto pb-2 md:pb-4">
          <a href="#sobre" className="text-black md:text-[#4DADB0] hover:text-[#3a8587] transition-colors">
            <LuChevronDown className="size-6 md:size-8 lg:size-10" />
          </a>
        </div>
      </div>

    </div>
  )
}
