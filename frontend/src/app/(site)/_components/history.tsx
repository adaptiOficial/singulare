'use client'

import Image from "next/image";
import { useToast } from "@/components/use-toast";
import { myhistoryType } from "@/types/myhistory";
import { api } from "@/services/api";
import { paginationResponseType } from "@/types/pagination-response";
import { useEffect, useState } from "react";

export function History() {

  const { toast } = useToast();

  const [history, setHistory] = useState<myhistoryType | null>(null);

  useEffect(() => {

    async function loadData() {

      const { response } =
        await api<paginationResponseType<myhistoryType[]>>(
          'GET',
          '/my-histories',
        );

      if (!response) {

        toast({
          title: 'Não foi possível carregar a imagem'
        });

        return;
      }

      setHistory(response.data[0]);
    }

    loadData();

  }, []);

  if (!history) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-cloudDancer gap-24 mb-24">

      {/* Conteúdo */}
     <div className="flex items-stretch gap-20 max-w-[1200px] w-full">

        {/* Texto */}
        <div className="flex-1 flex flex-col justify-between">

          {/* Conteúdo alinhado em cima */}
          <div>
            <h1 className="text-2xl font-semibold mb-4">
              Nossa História
            </h1>

            <p className="text-md text-zinc-700 leading-relaxed">
              {history.text}
            </p>
          </div>

          {/* Linha embaixo */}
          <div className="h-[1px] bg-zinc-400 w-full mt-8" />

        </div>

        {/* Imagem */}
        <div className="flex-1 relative">

          {/* Fundo escuro */}
          <div className="absolute left-6 -top-4 w-full h-full bg-cinzaCarvao rounded-2xl" />

          <Image
            src={history.image}
            alt="Equipe"
            width={600}
            height={400}
            className="relative border-4 border-cloudDancer rounded-2xl object-cover"
          />

        </div>

      </div>
    </div>
  );
}