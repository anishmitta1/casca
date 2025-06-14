import Text from './Text'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="py-[8px] px-[16px] rounded-lg"
      onClick={!disabled ? onClick : undefined}
      style={{
        backgroundColor: disabled ? '#808080' : '#000',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <Text size={16} color="#fff">
        Next Step
      </Text>
    </button>
  )
}

export default Button
