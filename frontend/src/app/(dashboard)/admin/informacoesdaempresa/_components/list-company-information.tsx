import { DashboardContainer } from '@/components/dashboard/dashboard-items'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'

import { companyInformationType } from '@/types/company-information'
import { Button } from '@/components/button'
import { LuInfo, LuPen} from 'react-icons/lu'
import { DialogUpdateCompanyInformation } from './dialog-update-company-information'
import { DialogInformationCompanyInformation } from './dialog-information-company-informationr'





export default async function ListCompanyInformation() {
  const { response } = await api<companyInformationType>(
    'GET',
    '/companyinformation',
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os usuários.
      </DashboardContainer>
    )
  }

  const companyinformation: companyInformationType = response;

  return (
    <>
      
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endereço</TableHead>
              <TableHead>Instagram</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              <TableRow key={companyinformation.id}>
                <TableCell>
                  {companyinformation.address}
                </TableCell>
                <TableCell>{companyinformation.instagram ? companyinformation.instagram : 'Não cadastrado'}</TableCell>
                <TableCell>{companyinformation.email ? companyinformation.email : 'Não cadastrado'}</TableCell>
                <TableCell>{companyinformation.phone}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCompanyInformation  id={companyinformation.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCompanyInformation >
                  <DialogUpdateCompanyInformation id={companyinformation.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCompanyInformation>
                  
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </DashboardContainer>
     
    </>
  )
}
