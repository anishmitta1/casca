import { Text, XStack, YStack } from '@/uikit'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  files: File[]
  onUploadFiles: (files: File[]) => void
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
      <YStack
        gap={24}
        className="border-2 border-dashed border-gray-200 rounded-xl items-center py-[56px]"
      >
        <YStack gap={8} className="items-center">
          {files.length ? (
            <YStack>
              {files.map((file, i) => (
                <XStack key={`${file.name}_${i}`}>
                  <Text>{file.name}</Text>

                  <Text>{file.size}</Text>
                </XStack>
              ))}
            </YStack>
          ) : (
            <YStack gap={8} className="items-center">
              <Text size={18} weight={600}>
                Upload Business Bank Statements
              </Text>
              <Text>
                Drag and drop your business bank statements here, or browse
                files.
              </Text>
            </YStack>
          )}
        </YStack>

        <div
          className="bg-gray-100 rounded-full py-2 px-4 hover:cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Text weight={600}>Browse Files</Text>
        </div>
      </YStack>
    </div>
  )
}

export default FileUpload
