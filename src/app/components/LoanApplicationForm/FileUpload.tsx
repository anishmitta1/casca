import { Text, XStack, YStack } from '@/uikit'
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from 'react-dropzone'

interface FileUploadProps {
  files: File[]
  onUploadFiles: (files: File[]) => void
}

interface FileUploadButtonProps {
  getRootProps: () => DropzoneRootProps
  getInputProps: () => DropzoneInputProps
  label: string
}

const FileUploadButton = ({
  getRootProps,
  getInputProps,
  label,
}: FileUploadButtonProps) => {
  return (
    <div
      className="bg-gray-100 rounded-full py-2 px-4 hover:cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Text weight={600}>{label}</Text>
    </div>
  )
}

const FileUpload = ({ files, onUploadFiles }: FileUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onUploadFiles,
    accept: {
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
  })

  return (
    <div className="p-[16px]">
      <YStack className="border-2 border-dashed border-gray-200 rounded-xl items-center">
        {files.length > 0 ? (
          <YStack gap={12} className="p-[16px] w-full">
            <Text size={24}>Uploaded Files</Text>
            <YStack gap={6}>
              {files.map((file, i) => (
                <XStack key={`${file.name}_${i}`}>
                  <Text>{file.name}</Text>
                </XStack>
              ))}
            </YStack>

            <XStack className="justify-center">
              <FileUploadButton
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                label="Add More Files"
              />
            </XStack>
          </YStack>
        ) : (
          <YStack gap={24} className="py-[56px]">
            <YStack
              gap={8}
              className="w-full p-[16px] h-full justify-start items-center"
            >
              <Text size={18} weight={600}>
                Upload Business Bank Statements
              </Text>
              <Text>
                Drag and drop your business bank statements here, or browse
                files.
              </Text>
            </YStack>

            <YStack className="items-center">
              <FileUploadButton
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                label="Browse Files"
              />
            </YStack>
          </YStack>
        )}
      </YStack>
    </div>
  )
}

export default FileUpload
