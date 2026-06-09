'use client'

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
  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR')
  }

  async function handleDownload() {
    const { response } = await api<paginationResponseType<Inscription[]>>(
      'GET',
      '/inscriptions'
    )

    const inscriptions = response?.data ?? []

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
      ...inscriptions.map((item: Inscription) => [
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
    link.download = `inscricoes-${new Date().toISOString().split('T')[0]}.csv`

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={handleDownload}>
      Baixar Planilha de Inscrições
    </Button>
  )
}