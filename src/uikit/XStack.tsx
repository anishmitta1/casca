import Stack, { StackProps } from "./Stack"

const XStack = (props: Omit<StackProps, 'orientation'>) => {
    return <Stack  {...props} orientation="x" />
}

export default XStack