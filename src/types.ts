import { LoanApplicationStep } from '@/constants'

// Everything is in USD
type KYCForm = {
  files: File[]
  name: string
  dba: string
  address: string
  phone: string
  email: string
  website: string
  estimatedArr: number
}

type LoanApplication = {
  id: string
  step: LoanApplicationStep
  createdAt: string
  updatedAt: string
  kycForm: KYCForm
}

export type { KYCForm, LoanApplication }
