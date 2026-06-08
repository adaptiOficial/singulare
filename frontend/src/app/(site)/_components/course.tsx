'use client'

import { api } from "@/services/api";
import { courseType } from "@/types/course";
import { paginationResponseType } from "@/types/pagination-response";
import Image from "next/image";
import { useToast } from "@/components/use-toast";
import { useEffect, useState } from "react";

export function Course() {
  const { toast } = useToast();
  const [course, setCourse] = useState<courseType | null>(null);

  useEffect(() => {
    async function loadData() {
      const { response } = await api<paginationResponseType<courseType[]>>(
        'GET',
        '/courses',
      );

      if (!response) {
        toast({ title: 'Não foi possível carregar sobre o curso' });
        return;
      }

      setCourse(response.data[0]);
    }

    loadData();
  }, [toast]);

  if (!course) return null;

  return (
    <div className="container mb-24 flex flex-col items-center md:items-start px-4">
      
      <h1 className="hidden md:block text-3xl font-bold text-left mb-10 lg:text-5xl">
        Sobre o Curso
      </h1>

      <div className="flex flex-col gap-16 w-full">
        
        <div className="block w-full text-center md:text-left">
          
          <div className="md:float-left md:mr-8 mb-6 md:mb-4 lg:w-[40%] shrink-0 flex justify-center md:block">
            <div className="relative w-[320px] h-[240px] lg:w-full lg:h-auto">
              <div className="absolute bottom-3 right-4 w-full h-full bg-[#4BB5B8] rounded-3xl lg:contents" />
              <Image
                src={course.primary_image}
                alt="Equipe"
                width={512}
                height={640}
                className="relative z-10 object-cover rounded-3xl w-full h-full lg:w-[480px] lg:h-[550px] lg:rounded"
              />
            </div>
          </div>

          <h1 className="block md:hidden text-[26px] font-bold text-center mb-4">
            Sobre o Curso
          </h1>

          <h2 className="text-base font-semibold lg:text-2xl mb-3">{course.title}</h2>
          <p className="text-base lg:text-2xl text-justify md:text-left leading-relaxed">
            {course.primary_text}
          </p>
        </div>

        <div className="hidden md:block md:h-[4px] md:bg-[#88D8DA] md:w-[40%] md:ml-auto lg:h-[4px] lg:bg-[#88D8DA] lg:w-[40%] lg:ml-auto clear-both" />

        <div className="block w-full text-center md:text-left">
          
          <div className="md:float-right md:ml-8 mb-6 md:mb-4 lg:w-[40%] shrink-0 flex justify-center md:block">
            <div className="relative w-[320px] h-[240px] lg:w-full lg:h-auto">
              <div className="absolute bottom-3 right-4 w-full h-full bg-[#4BB5B8] rounded-3xl lg:contents" />
              <Image
                src={course.secondary_image}
                alt="Imagem secundária"
                width={512}
                height={640}
                className="relative z-10 object-cover rounded-3xl w-full h-full lg:w-[480px] lg:h-[550px] lg:rounded"
              />
            </div>
          </div>

          <p className="text-base lg:text-2xl text-justify md:text-left leading-relaxed">
            {course.secondary_text}
          </p>
        </div>

        <div className="hidden md:block md:h-[4px] md:bg-[#88D8DA] md:w-[40%] md:mr-auto lg:h-[4px] lg:bg-[#88D8DA] lg:w-[40%] lg:mr-auto clear-both" />
        
      </div>
    </div>
  );
}