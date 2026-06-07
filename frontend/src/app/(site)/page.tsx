import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { InscriptionForm } from "./_components/inscriptionForm"
import { FAQ } from "./_components/faq"
import { AboutUs } from "./_components/aboutUs"
import { WaterMark } from "./_components/waterMark"

import { Banner } from "./_components/banner"
import WppButton from "@/components/whatsapp-button"
import { FeedbacksSection } from "./_components/feedbacks"

import Preco from "./_components/preco"
import { linkWppType } from '@/types/linkWpp';
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { useToast } from "@/components/use-toast"
import { paginationResponseType } from "@/types/pagination-response"

export default async function Home() {
  const { response } =
    await api<paginationResponseType<linkWppType[]>>(
      'GET',
      '/link-wpp',
    );

  const linkWpp = response?.data[0]?.link;

  return (
  <div className="min-h-screen w-full flex flex-col bg-white">
    <Navbar/>
    <Banner/>
    <AboutUs /> 

    <FeedbacksSection />
    <FAQ/>
    
    <Preco />
    <InscriptionForm />  
    <Footer/>
    <WaterMark/>
    <WppButton cellphone={linkWpp} size="sm" color="#25d366" className="bg-black rounded-full sm:p-4 p-3" /> 
  </div>
  )
  
}