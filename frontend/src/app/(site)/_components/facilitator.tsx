'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import { useToast } from "@/components/use-toast";
import { facilitatorType } from "@/types/facilitator";
import { paginationResponseType } from "@/types/pagination-response";

export function Facilitators() {
  const { toast } = useToast();
  const [facilitators, setFacilitators] = useState<facilitatorType[] | null>(null);

  useEffect(() => {
    async function loadData() {
      const { response } = await api<paginationResponseType<facilitatorType[]>>(
        'GET',
        '/facilitator',
      );

      if (!response) {
        toast({
          title: 'Não foi possível carregar os facilitadores'
        });
        return;
      }

      setFacilitators(response.data);
    }

    loadData();
  }, []);

  if (!facilitators || facilitators.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-white gap-16 pb-24">

      <div className="flex justify-center w-full px-8 pt-16">
        <h1 className="lg:text-[48px] md:text-[36px] text-[26px] font-bold">
          Facilitadores
        </h1>
      </div>

      <div className="flex flex-col gap-20 max-w-[1200px] w-full px-6 md:px-12 lg:px-16">
        {facilitators.map((facilitator, index) => {
          const ehPar = index % 2 === 0;

          return (
            <div
              key={facilitator.id}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
                !ehPar ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-[400px] shrink-0">
                <Image
                  src={facilitator.image || '/placeholder.png'}
                  alt={`Foto de ${facilitator.name}`}
                  fill
                  className={`object-cover transition-all duration-300
                    /* Padrão Mobile: Círculo perfeito */
                    rounded-full

                    /* Padrão Desktop: Quebra o círculo e aplica as formas do Figma */
                    md:rounded-none
                    ${
                      ehPar
                        ? 'md:rounded-b-[999px] md:rounded-t-2xl'
                        : 'md:rounded-t-[999px] md:rounded-b-2xl'
                    }
                  `}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4 text-cinzaCarvao">
                  {facilitator.name}
                </h3>

                <p className="text-md text-black leading-relaxed whitespace-pre-line text-justify">
                  {facilitator.description}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


