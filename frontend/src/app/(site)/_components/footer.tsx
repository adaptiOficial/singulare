
import { DashboardContainer } from "@/components/dashboard/dashboard-items";
import { api } from "@/services/api";
import { companyInformationType } from "@/types/company-information";
import Image from "next/image";

export async function Footer(){

   const { response: companyinformation } = await api<companyInformationType>(
    'GET',
    '/companyinformation',
  );

  if (!companyinformation) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os dados.
      </DashboardContainer>
    );
  }
 
  
      


    return(
      <div className="lg:grid lg:grid-cols-[32%_38%_30%] flex flex-col lg:items-center items-start bg-[#4BB5B8] text-white sm:py-14 sm:px-16 max-sm:px-10 max-sm:py-8">
        <div className="flex justify-start items-center flex-col self-center">
          <Image
            src="/group-34.png"
            alt="Logo Empresa"
            width={180}
            height={200}
            className="xl:w-[258px] xl:h-[204px] lg:w-[230px] lg:h-[160px]"
          />

          <Image
            src="/group-21.png"
            alt="Logo Empresa"
            width={200}
            height={200}
            className="xl:w-[296px] xl:h-[122px] lg:w-[260px] lg:h-[100px]"
          />
        </div>

        <div className="flex flex-col items-center  lg:text-center h-full justify-center lg:mx-[70px] max-lg:mt-6 self-start max-lg:mb-14 max-sm:mb-8">
          <h1 className="xl:text-[32px] lg:text-[26px] text-lg lg:mb-12 max-lg:self-start max-sm:mb-3">SOBRE A EMPRESA</h1>
          <p className="xl:text-[24px] lg:text-[20px] text-[16px] text-start">{companyinformation.about_us}</p>
        </div>

        <div className="flex flex-col items-center gap-2 h-full justify-center self-center ">
          <h1 className="xl:text-[32px] lg:text-[26px] lg:mb-12 mb-2">CONTATO</h1>

          <div className="items-start">
            {companyinformation.instagram && (
              <div className="flex gap-4 mb-4">
                <Image src="/instagram.svg" alt="instagram-icon" height={24} width={24}/>
                <span>@{
                  companyinformation.instagram
                    ?.replace(/\/$/, '')
                    .split('/')
                    .pop()}
                </span>
              </div>
            )}

            {companyinformation.email && (
              <div className="flex gap-4 mb-4">
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