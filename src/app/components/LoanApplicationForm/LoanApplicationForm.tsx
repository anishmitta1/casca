'use client'
import { Text, YStack } from '@/uikit'
import FileUpload from './FileUpload'
import { useState } from 'react'
import { LoanApplicationStep } from '@/constants'

const dedupByKey = (arr: any[], key: string) => {
  return arr.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  )
}

interface NextStepProps {
  onClick: () => void
  disabled: boolean
}

const NextStep = ({ onClick, disabled }: NextStepProps) => {
  return (
    <div
      className="bg-black py-[8px] px-[16px] rounded-lg hover:cursor-pointer"
      onClick={!disabled ? onClick : undefined}
    >
      <Text size={16} color="#fff">
        Next Step
      </Text>
    </div>
  )
}

const LoanApplicationForm = () => {
  const formSuccess = true
  const [step, setStep] = useState<LoanApplicationStep>(
    LoanApplicationStep.DOCUMENTS
  )
  const [files, setFiles] = useState<File[]>([])

  const onUploadFiles = (uploadedFiles: File[]) => {
    setFiles((files) => dedupByKey([...files, ...uploadedFiles], 'name'))
    console.log(files)
    // Do something with the files later
  }

  const onNextStep = () => {
    if (step === LoanApplicationStep.DOCUMENTS && files.length > 0) {
      setStep(LoanApplicationStep.KYC)
    } else if (step === LoanApplicationStep.KYC && formSuccess) {
      setStep(LoanApplicationStep.PREVIEW)
    }
  }

  const isNextStepDisabled = () => {
    if (step === LoanApplicationStep.DOCUMENTS) {
      return files.length === 0
    }

    return false
  }

  return (
    <YStack>
      <YStack gap={12} className="p-[16px]">
        <Text size={32} weight={700}>
          Business Loan Application
        </Text>
        <Text size={14} weight={400} color="#5C738A">
          Upload your business bank statements to get started.
        </Text>
      </YStack>
      {step === LoanApplicationStep.DOCUMENTS && (
        <FileUpload files={files} onUploadFiles={onUploadFiles} />
      )}
      <YStack className="pt-[8px] items-start pl-[16px]">
        <NextStep onClick={onNextStep} disabled={isNextStepDisabled()} />
      </YStack>
    </YStack>
  )
}

export default LoanApplicationForm
