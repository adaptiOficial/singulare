'use client'

import Image from 'next/image'
import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative w-full bg-[#4BB5B8] text-white">
      <div className="flex h-[10vh] items-center justify-between px-6 lg:px-16">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo-singulare.png"
            alt="Logo Empresa"
            width={27}
            height={48}
          />

          <Image
            src="/nome-singulare.png"
            alt="Nome da Empresa"
            width={137}
            height={48}
            className="mt-2"
          />
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex lg:w-[90%] lg:justify-evenly lg:text-2xl lg:font-normal">
          <a href="#sobre">Sobre o Curso</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#inscricao">Inscrição</a>
          <a href="#faq">Perguntas Frequentes</a>
        </div>

        {/* Botão Mobile */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          {isOpen ? (
            <LuX size={32} />
          ) : (
            <LuMenu size={32} />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
        {isOpen && (
        <div className="text-[22px] absolute left-0 top-full z-50 flex w-full flex-col bg-[#F2F2F2] shadow-lg lg:hidden">
            <a
            href="#sobre"
            className="px-6 py-4 text-black font-medium"
            onClick={() => setIsOpen(false)}
            >
            Sobre o Curso
            </a>

            <a
            href="#conteudo"
            className="px-6 py-4 text-black font-medium"
            onClick={() => setIsOpen(false)}
            >
            Conteúdo
            </a>

            <a
            href="#inscricao"
            className="px-6 py-4 text-black font-medium"
            onClick={() => setIsOpen(false)}
            >
            Inscrição
            </a>

            <a
            href="#faq"
            className="px-6 py-4 text-black font-medium"
            onClick={() => setIsOpen(false)}
            >
            Perguntas Frequentes
            </a>
        </div>
        )}
    </nav>
  )
}