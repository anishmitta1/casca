import { CSSProperties, ReactNode } from 'react'

interface StackProps {
  orientation: 'x' | 'y'
  className?: string
  gap?: number
  children: ReactNode
  style?: CSSProperties
}

const Stack = ({
  orientation,
  gap = 0,
  children,
  style = {},
  className,
}: StackProps) => {
  const stackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'y' ? 'column' : 'row',
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    ...style,
  }

  return (
    <div className={className} style={stackStyle}>
      {children}
    </div>
  )
}

export type { StackProps }
export default Stack
