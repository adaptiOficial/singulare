import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { ContactForm } from "./_components/contactForm"
import { FAQ } from "./_components/faq"
import { AboutUs } from "./_components/aboutUs"
import { WaterMark } from "./_components/waterMark"

import { Banner } from "./_components/banner"
import WppButton from "@/components/whatsapp-button"
export default async function Home() {
  return (
  <div className="min-h-screen w-full flex flex-col bg-cloudDancer">
    <Navbar/>
    <Banner/>
    <AboutUs />

    <FAQ/>
    
    <ContactForm />
    <Footer/>
    <WaterMark/>
    {/* <WppButton cellphone="27999999999" color="#4DADB0" /> */}
  </div>
  )
  
}