import { SVGProps } from 'react'

const PersonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
    {...props}
  >
    <path d="M18 20a6 6 0 0 0-12 0" />
    <circle cx={12} cy={10} r={4} />
    <circle cx={12} cy={12} r={10} />
  </svg>
)
export default PersonIcon
