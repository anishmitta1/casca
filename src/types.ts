import { LoanApplicationStep } from '@/constants'

// Everything is in USD
type KYCIndividualForm = {
  name: string
  estimatedIncome: number
  nationality: string
  dateOfBirth: string
  address: string
  phone: string
}

type KYCCompanyForm = {
  name: string
  dba: string
  address: string
  phone: string
  email: string
  website: string
  estimatedArr: number
}

type KYCForm = {
  type: 'individual' | 'company'
  files: File[]
} & (KYCIndividualForm | KYCCompanyForm)

type LoanApplication = {
  id: string
  step: LoanApplicationStep
  createdAt: string
  updatedAt: string
  kycForm: KYCForm
}

export type { KYCForm, LoanApplication }
