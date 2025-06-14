'use client'
import { Button, Text, YStack } from '@/uikit'
import FileUpload from './FileUpload'
import { useState } from 'react'
import { LoanApplicationStep } from '@/constants'
import KYCForm from './Form'

const dedupFileByName = (files: File[]) => {
  return files.filter(
    (file, index, self) => index === self.findIndex((t) => t.name === file.name)
  )
}

interface NextStepProps {
  onClick: () => void
  disabled: boolean
}

const NextStep = ({ onClick, disabled }: NextStepProps) => {
  return <Button onClick={onClick} disabled={disabled} />
}

const LoanApplicationForm = () => {
  const formSuccess = true
  const [step, setStep] = useState<LoanApplicationStep>(
    LoanApplicationStep.DOCUMENTS
  )
  const [files, setFiles] = useState<File[]>([])

  const onUploadFiles = (uploadedFiles: File[]) => {
    setFiles((files) => dedupFileByName([...files, ...uploadedFiles]))
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
        {step === LoanApplicationStep.DOCUMENTS && (
          <Text size={14} weight={400} color="#5C738A">
            Upload your business bank statements to get started.
          </Text>
        )}
      </YStack>
      {step === LoanApplicationStep.DOCUMENTS && (
        <FileUpload files={files} onUploadFiles={onUploadFiles} />
      )}
      {step === LoanApplicationStep.KYC && <KYCForm onFinish={onNextStep} />}
      <YStack className="pt-[8px] items-start pl-[16px]">
        <NextStep onClick={onNextStep} disabled={isNextStepDisabled()} />
      </YStack>
    </YStack>
  )
}

export default LoanApplicationForm
