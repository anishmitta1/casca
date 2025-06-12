'use client'
import { Text, YStack } from '@/uikit'
import FileUpload from './FileUpload'
import { useState } from 'react'

const dedupByKey = (arr: any[], key: string) => {
  return arr.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  )
}

const LoanApplicationForm = () => {
  const [files, setFiles] = useState<File[]>([])

  const onUploadFiles = (uploadedFiles: File[]) => {
    setFiles((files) => dedupByKey([...files, ...uploadedFiles], 'name'))
    console.log(files)
    // Do something with the files later
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
      <FileUpload files={files} onUploadFiles={onUploadFiles} />
    </YStack>
  )
}

export default LoanApplicationForm
