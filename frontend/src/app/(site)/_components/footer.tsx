
import { DashboardContainer } from "@/components/dashboard/dashboard-items";
import { api } from "@/services/api";
import { aboutUsType} from "@/types/aboutUs";
import { companyInformationType } from "@/types/company-information";
import { paginationResponseType } from "@/types/pagination-response";
import Image from "next/image";

export async function Footer(){

   const { response: companyinformation } = await api<companyInformationType>(
    'GET',
    '/companyinformation',
  );

  const { response: aboutUs } = await api<paginationResponseType<aboutUsType[]>>(
    'GET',
    '/about-us',
  );

  if (!companyinformation || !aboutUs) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os dados.
      </DashboardContainer>
    );
  }
 
  
      


    return(
       <div className="grid grid-cols-3 items-center bg-cinzaCarvao text-white py-8 px-16 border-[1px] border-x-0 border-cloudDancer">
          <div className="flex justify-start">
  <Image src='/logoAdapti.png' alt='Logo Empresa' width={150} height={150}/>
</div>

<div className="flex flex-col items-center gap-4 text-center">
  <h1>SOBRE A EMPRESA</h1>
  <p>{aboutUs.data[0].text}</p>
</div>

<div className="flex flex-col items-end gap-2 text-right">
  <h1>CONTATO</h1>

  <div className="flex flex-col gap-4 [&>div]:flex-row-reverse">
    <div className="flex gap-4">
      <Image src="/home.svg" alt="home-icon" height={24} width={24}/>
      <span>{companyinformation.address}</span>
    </div>

    {companyinformation.instagram && (
      <div className="flex gap-4">
        <Image src="/instagram.svg" alt="instagram-icon" height={24} width={24}/>
        <span>{companyinformation.instagram}</span>
      </div>
    )}

    {companyinformation.email && (
      <div className="flex gap-4">
        <Image src="/mail.svg" alt="mail-icon" width={24} height={24}/>
        <span>{companyinformation.email}</span>
      </div>
    )}

    <div className="flex gap-4">
      <Image src="/phone.svg" alt="phone-icon" width={24} height={24}/>
      <span>{companyinformation.phone}</span>
    </div>
  </div>
</div>
    </div>
    )
}