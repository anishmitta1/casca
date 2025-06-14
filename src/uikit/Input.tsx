import React from 'react'
import YStack from './YStack'
import Text from './Text'

interface InputProps {
  value: string | number
  onChange: (value: string) => void
  error?: string
}

const Input: React.FC<InputProps> = ({ value, onChange, error }) => {
  const borderColor = error ? 'border-red-500' : 'border-gray-300'

  return (
    <YStack>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-2 py-1 border ${borderColor} rounded-lg focus:outline-none focus:ring-1 focus:ring-black-500 focus:border-black-500 transition-all`}
      />
      {error && (
        <Text size={12} weight={400} color="red">
          {error}
        </Text>
      )}
    </YStack>
  )
}

export default Input
