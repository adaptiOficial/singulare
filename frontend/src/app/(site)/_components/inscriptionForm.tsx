'use client'
import { createInscription } from "@/actions/inscription";
import { useState } from "react";
import { useToast } from "@/components/use-toast";
import { formatPhone } from "@/lib/phone";
import { formatCpf } from "@/lib/cpf";
import { ResponseErrorType } from "@/services/api";

export function InscriptionForm() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [quantidadeInscricoes, setQuantidadeInscricoes] = useState("");
  const [ramoAtividade, setRamoAtividade] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const form = new FormData();
    form.append('nome_completo', nomeCompleto);
    form.append('email', email);
    form.append('telefone', telefone);
    form.append('cpf_cnpj', cpfCnpj);
    form.append('quantidade_inscricoes', quantidadeInscricoes);
    form.append('ramo_atividade', ramoAtividade);

    const parsed = JSON.parse(await createInscription(form));

    if (parsed.error) {
      const apiError = parsed.error as ResponseErrorType;
      if (apiError.errors) {
        setErrors(apiError.errors);
      }
      toast({
        title: "Não foi possível enviar a inscrição",
        description: apiError.message || "Por favor, verifique os campos destacados.",
        variant: "destructive"
      });
    } else {
      toast({ title: "Inscrição enviada com sucesso!" });
      setNomeCompleto("");
      setEmail("");
      setTelefone("");
      setCpfCnpj("");
      setQuantidadeInscricoes("");
      setRamoAtividade("");
      setErrors({});
    }
  };

  const inputStyle = "w-full h-[54px] rounded-lg px-5 text-black outline-none placeholder-[#848484] placeholder:text-lg placeholder:font-semibold focus:ring-2 focus:ring-[#167174]";
  const labelStyle = "block text-black text-lg font-semibold mb-1 ml-1";

  return (
    <>
    <div className="flex flex-col items-center bg-[#4DADB0] md:py-24 py-16 px-[10%]">
      <div className="w-full max-w-6xl"> 
        <h1 className="lg:text-6xl md:text-4xl max-md:text-center text-[28px] font-bold text-white mb-10 md:ml-10 text-left">
          Faça sua inscrição
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className={labelStyle}>Nome completo <span className="text-red-600">*</span></label>
              <input className={inputStyle} placeholder="Nome" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} />
              {errors.nome && <span className="text-red-900 text-xs mt-1 px-2 font-bold">{errors.nome}</span>}
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>E-mail <span className="text-red-600">*</span></label>
              <input className={inputStyle} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <span className="text-red-900 text-xs mt-1 px-2 font-bold">{errors.email}</span>}
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>Telefone <span className="text-red-600">*</span></label>
              <input className={inputStyle} placeholder="(xx) xxxxx-xxxx" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} />
              {errors.telefone && <span className="text-red-900 text-xs mt-1 px-2 font-bold">{errors.telefone}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className={labelStyle}>CPF/CNPJ <span className="text-red-600">*</span></label>
              <input className={inputStyle} placeholder="CPF/CNPJ" value={cpfCnpj} onChange={(e) => setCpfCnpj(formatCpf(e.target.value))} />
              {errors.cpf_cnpj && <span className="text-red-900 text-xs mt-1 px-2 font-bold">{errors.cpf_cnpj}</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelStyle}>Quantidade de inscrições <span className="text-red-600">*</span></label>
              <input className={inputStyle} type="number" min="1" placeholder="Quantidade" value={quantidadeInscricoes} onChange={(e) => setQuantidadeInscricoes(e.target.value)} />
              {errors.quantidade_inscricoes && <span className="text-red-900 text-xs mt-1 px-2 font-bold">{errors.quantidade_inscricoes}</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelStyle}>Ramo de atividade da empresa</label>
              <input className={inputStyle} placeholder="Ramo de atividade" value={ramoAtividade} onChange={(e) => setRamoAtividade(e.target.value)} />
              {errors.ramo_atividade && <span className="text-red-900 text-xs mt-1 px-2 font-bold">{errors.ramo_atividade}</span>}
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center mt-6">
            <button 
              type="submit" 
              className="bg-[#167174] text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-[#125a5d] transition-all transform hover:scale-105 shadow-lg"
            >
              Increve-se
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
