import { BusinessIcon, PersonIcon } from '@/icons'
import { Input, Text, XStack, YStack } from '@/uikit'
import { useForm } from 'react-hook-form'

const Form = () => {
  const { register, handleSubmit } = useForm()

  return (
    <div className="p-[16px]">
      <YStack gap={16}>
        <YStack gap={4} className="items-start">
          <Text size={16} weight={500}>
            Business Name
          </Text>
          <Input value={''} onChange={() => {}} />
        </YStack>

        <YStack gap={4} className="items-start">
          <Text size={16} weight={500}>
            DBA
          </Text>
          <Input value={''} onChange={() => {}} />
        </YStack>

        <YStack gap={4} className="items-start">
          <Text size={16} weight={500}>
            Industry
          </Text>
          <Input value={''} onChange={() => {}} />
        </YStack>

        <YStack gap={4} className="items-start">
          <Text size={16} weight={500}>
            ARR (Estimated)
          </Text>
          <Input value={''} onChange={() => {}} />
        </YStack>
      </YStack>
    </div>
  )
}

export default Form
