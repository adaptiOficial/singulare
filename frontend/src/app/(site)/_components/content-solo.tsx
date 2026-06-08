'use client';  // ← ADICIONE ESTA LINHA NO TOPO

import { contentType } from '@/types/content';
import Image from 'next/image';
import { useState } from 'react';  // ← Adicione este import

interface contentSoloProps {
    content: contentType
}

export function ContentSolo({ content }: contentSoloProps) {
    const [imageError, setImageError] = useState(false);
    
    // Verifica se content.text existe antes de processar
    if (!content?.text) return null;
    
    const [topicsRaw, description] = content.text.split('|')
    const topics = topicsRaw?.split(';').map((topic) => topic.trim()).filter(Boolean) || [];

    if (topics.length === 0) return null;

    return (
        <div className="flex items-center 
            md:pl-3 md:pr-3 md:py-16 md:gap-10
            lg:pl-6 lg:pr-6 lg:py-16 lg:gap-32
        ">
            <div className="bg-[#4DADB0] rounded-[20px] p-6 flex flex-col items-center gap-6 mt-8 w-[258px] h-[527px]
                md:contents
                lg:contents
            ">
                <div className='order-2 flex flex-col w-full shrink-0 gap-4 
                    md:order-1 md:w-[350px]
                    lg:order-1 lg:w-[450px]'>
                    <ul className="list-disc">
                        {topics.map((topic, index) => (
                            <li key={index} className="text-[14px] text-white
                                md:text-base md:text-black                
                                lg:text-2xl lg:text-black">
                                {topic}
                            </li>
                        ))}
                        {description && (
                            <p className='text-[13px] text-white list-none mt-2 
                                md:mt-2 md:-ml-4 md:text-base md:text-black
                                lg:mt-4 lg:-ml-6 lg:text-xl lg:text-black'>
                                {description.trim()}
                            </p>
                        )}
                    </ul>
                </div>

                <div className="order-1 relative shrink-0 w-[182px] h-[177px]
                    md:order-2 md:w-[240px] md:h-[240px]
                    lg:w-[420px] lg:h-[400px] lg:order-2">
                    <div className="hidden absolute bottom-[-25px] right-[-25px] w-full h-full bg-[#88D8DA] rounded-lg 
                        md:block md:bottom-[-18px] md:right-[-18px]
                        lg:block"/>
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        {!imageError ? (
                            <Image 
                                src={content.image || '/images/placeholder.jpg'} 
                                alt="Content Image" 
                                width={400} 
                                height={300} 
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                                unoptimized={true}  // ← Temporário para evitar otimização
                                // ou remova o unoptimized se quiser manter otimização
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">Imagem indisponível</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}