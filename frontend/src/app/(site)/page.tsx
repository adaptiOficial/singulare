import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { ContactForm } from "./_components/contactForm"
import { FAQ } from "./_components/faq"
import { AboutUs } from "./_components/aboutUs"
import { WaterMark } from "./_components/waterMark"
import { History } from "./_components/history"
import { Banner } from "./_components/banner"
import { FeedbacksSection } from "./_components/feedbacks"

export default async function Home() {
  return (
  <div className="min-h-screen w-full flex flex-col bg-cloudDancer">
    <Navbar/>
    <Banner/>
    <AboutUs />
    <History />
    <FeedbacksSection />
    <FAQ/>
    <ContactForm />
    <Footer/>
    <WaterMark/>
  </div>
  )
  
}