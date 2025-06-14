import { Input, Text, XStack, YStack } from '@/uikit'
import { useForm, Controller } from 'react-hook-form'

interface FormState {
  businessName: string
  dba: string
  arr: number
  industry: string
}

interface FormProps {
  onFinish: () => void
}

const Form = ({ onFinish }: FormProps) => {
  const { handleSubmit, control } = useForm<FormState>({
    defaultValues: {
      businessName: '',
      dba: '',
      arr: 0,
      industry: '',
    },
  })

  return (
    <YStack gap={24} className="p-[16px]">
      <YStack gap={8}>
        <Text size={18} weight={600}>
          Financial Overview
        </Text>

        <XStack gap={16}>
          <YStack
            gap={4}
            className="p-4 border border-gray-200 rounded-lg"
            style={{ flex: 1 }}
          >
            <Text>Average Monthly Cashflow</Text>
            <Text size={18} weight={600}>
              $10,000
            </Text>
          </YStack>

          <YStack
            gap={4}
            className="p-4 border border-gray-200 rounded-lg"
            style={{ flex: 1 }}
          >
            <Text>Transaction Volume</Text>
            <Text size={18} weight={600}>
              480 Transactions
            </Text>
          </YStack>

          <YStack
            gap={4}
            className="p-4 border border-gray-200 rounded-lg"
            style={{ flex: 1 }}
          >
            <Text>Estimated Credit Score</Text>
            <Text size={18} weight={600}>
              750
            </Text>
          </YStack>
        </XStack>
      </YStack>

      <YStack gap={8}>
        <Text size={18} weight={600}>
          Business Information
        </Text>

        <YStack gap={16}>
          <XStack gap={16}>
            <YStack gap={4} className="items-start">
              <Text size={16} weight={500}>
                Business Name
              </Text>
              <Controller
                name="businessName"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <Input {...field} error={errors.businessName?.message} />
                )}
                rules={{ required: 'Business Name is required' }}
              />
            </YStack>

            <YStack gap={4} className="items-start">
              <Text size={16} weight={500}>
                DBA
              </Text>
              <Controller
                name="dba"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <Input {...field} error={errors.dba?.message} />
                )}
              />
            </YStack>
          </XStack>

          <XStack gap={16}>
            <YStack gap={4} className="items-start">
              <Text size={16} weight={500}>
                ARR (Estimated)
              </Text>
              <Controller
                name="arr"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <Input {...field} error={errors.arr?.message} />
                )}
              />
            </YStack>

            <YStack gap={4} className="items-start">
              <Text size={16} weight={500}>
                Industry
              </Text>
              <Controller
                name="industry"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <Input {...field} error={errors.industry?.message} />
                )}
              />
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default Form
