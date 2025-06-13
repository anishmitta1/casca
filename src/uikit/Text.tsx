import { CSSProperties, ReactNode } from 'react'

interface TextProps {
  children: ReactNode
  size?: number
  weight?: CSSProperties['fontWeight']
  color?: CSSProperties['color']
  style?: CSSProperties
}

const Text = ({
  size = 14,
  weight,
  color = '#000',
  children,
  style = {},
}: TextProps) => {
  return (
    <div style={{ fontSize: size, fontWeight: weight, color, ...style }}>
      {children}
    </div>
  )
}

export default Text
