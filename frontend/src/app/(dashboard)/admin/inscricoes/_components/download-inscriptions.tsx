'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { api } from '@/services/api'
import { paginationResponseType } from '@/types/pagination-response'

interface Inscription {
  id: string
  nome: string
  email: string
  telefone: string
  cpf_cnpj: string
  quantidade_inscricoes: number
  ramo_atividade: string
  done: string
  created_at: string
  updated_at: string
}

export default function DownloadInscription() {
  // 1. Estados para armazenar a data de início e fim
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR')
  }

  async function handleDownload() {
    // Validação de preenchimento dos campos
    if (!startDate || !endDate) {
      alert('Por favor, selecione ambas as datas (Início e Fim) antes de baixar.')
      return
    }

    // Validação caso o usuário coloque a data de início maior que a data de fim
    if (new Date(startDate) > new Date(endDate)) {
      alert('A data de início não pode ser maior que a data de fim.')
      return
    }

    // 2. Busca todas as inscrições da API
    const { response } = await api<paginationResponseType<Inscription[]>>(
      'GET',
      '/inscriptions'
    )

    const allInscriptions = response?.data ?? []

    // 3. Normalização das datas limites para cobrir todo o período do dia selecionado
    // 'T00:00:00' garante o início do primeiro dia e 'T23:59:59' garante até o último segundo do último dia
    const startLimit = new Date(`${startDate}T00:00:00`)
    const endLimit = new Date(`${endDate}T23:59:59`)

    // 4. FILTRAGEM POR PERÍODO NO FRONT-END
    const filteredInscriptions = allInscriptions.filter((item) => {
      const inscriptionDate = new Date(item.created_at)
      return inscriptionDate >= startLimit && inscriptionDate <= endLimit
    })

    if (filteredInscriptions.length === 0) {
      alert('Nenhuma inscrição encontrada neste período.')
      return
    }

    // 5. Geração do CSV
    const csv = [
      [
        'Nome',
        'Email',
        'Telefone',
        'CPF/CNPJ',
        'Quantidade',
        'Ramo',
        'Status',
        'Criado em'
      ],
      ...filteredInscriptions.map((item: Inscription) => [
        item.nome,
        item.email,
        item.telefone,
        item.cpf_cnpj,
        item.quantidade_inscricoes,
        item.ramo_atividade ?? '-',
        item.done === '1' ? 'Confirmada' : 'Pendente',
        formatDate(item.created_at)
      ])
    ]
      .map((row) =>
        row.map((value) => `"${String(value ?? '')}"`).join(';')
      )
      .join('\n')

    const blob = new Blob(
      ['\uFEFF' + csv],
      {
        type: 'text/csv;charset=utf-8;'
      }
    )

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    // O nome do arquivo agora reflete o período selecionado
    link.download = `inscricoes_${startDate}_a_${endDate}.csv`

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4 max-w-md bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900">Exportar Inscrições por Período</h3>
      
      <div className="flex max-xl:flex-col max-xl:items-center items-end gap-3">
        {/* Input Data de Início */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="start-date" className="text-xs font-medium text-gray-600">
            Data de Início
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Input Data de Fim */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="end-date" className="text-xs font-medium text-gray-600">
            Data de Fim
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            min={startDate} // Impede visualmente escolher uma data fim menor que a de início
          />
        </div>

        {/* Botão de Download alinhado ao lado dos inputs */}
        <Button 
          onClick={handleDownload} 
          disabled={!startDate || !endDate}
          className="h-[38px]" // Alinha a altura com a dos inputs
        >
          Baixar
        </Button>
      </div>
    </div>
  )
}