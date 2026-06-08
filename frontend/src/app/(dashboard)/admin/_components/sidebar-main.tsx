'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarNav,
  SidebarNavLink,
  SidebarNavLinkLabel,
  SidebarFooter,
  SidebarHeaderLogo,
  UserDropdown,
} from '@/components/dashboard/sidebar'
import { LuFileImage, LuBookOpen, LuHome, LuLayers, LuLogOut, LuMessageCircle, LuMail, LuUsers, LuContact, LuPresentation } from 'react-icons/lu'
import { AiOutlineContainer } from "react-icons/ai";
import { DropdownMenuItem } from '@/components/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import logo from '@/assets/img/logo.jpeg'
import { FaWhatsapp } from 'react-icons/fa'
import { LuDollarSign } from "react-icons/lu";

export function SidebarMain() {
  const session = useSession()
  const user = session?.data?.user

  return (
    <Sidebar>
      <SidebarHeader href="/admin">
        <SidebarHeaderLogo src={logo} alt="Logo Dashboard" />
        <SidebarHeaderTitle>Adapti</SidebarHeaderTitle>
      </SidebarHeader>
      <SidebarNav>
        <SidebarNavLink href="/admin">
          <LuHome />
          <SidebarNavLinkLabel>Home</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/usuarios">
          <LuUsers />
          <SidebarNavLinkLabel>Usuários</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/banners">
          <LuFileImage />
          <SidebarNavLinkLabel>Banner</SidebarNavLinkLabel>
        </SidebarNavLink>

        <SidebarNavLink href="/admin/price">
          <LuDollarSign />
          <SidebarNavLinkLabel>Preço</SidebarNavLinkLabel>
        </SidebarNavLink>

        <SidebarNavLink href="/admin/inscricoes">
          <LuMail />
          <SidebarNavLinkLabel>Inscrições</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/faq">
          <LuMessageCircle />
          <SidebarNavLinkLabel>FAQs</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/feedbacks">
           <LuMessageCircle />
           <SidebarNavLinkLabel>Feedbacks</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/facilitadores">
          <LuPresentation />
          <SidebarNavLinkLabel>Facilitadores</SidebarNavLinkLabel>
        </SidebarNavLink>
         <SidebarNavLink href="/admin/informacoesdaempresa">
          <LuContact  />
          <SidebarNavLinkLabel>Informações da Empresa</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/link-wpp">
          <FaWhatsapp />
          <SidebarNavLinkLabel>Link WhatsApp</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/about-us">
          <LuBookOpen />
          <SidebarNavLinkLabel>Sobre nós</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/content">
          <LuLayers />
          <SidebarNavLinkLabel>Conteúdo</SidebarNavLinkLabel>
        </SidebarNavLink>
        <SidebarNavLink href="/admin/maisinformacoes">
          <LuInfo />
          <SidebarNavLinkLabel>Mais Informações</SidebarNavLinkLabel>
        </SidebarNavLink>
      </SidebarNav>
      <SidebarFooter>
        <UserDropdown name={user?.name} email={user?.email} src={user?.image}>
          <DropdownMenuItem onClick={async () => await signOut()}>
            <LuLogOut className="w-3 h-3 mr-3" />
            Log out
          </DropdownMenuItem>
        </UserDropdown>
      </SidebarFooter>
    </Sidebar>
  )
}
