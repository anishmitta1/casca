import React from 'react'

interface InputProps {
  value: string
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black-500 focus:border-black-500 transition-all"
    />
  )
}

export default Input
