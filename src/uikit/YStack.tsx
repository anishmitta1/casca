import Stack, { StackProps } from "./Stack"

const YStack = (props: Omit<StackProps, 'orientation'>) => {
    return <Stack  {...props} orientation="y" />
}

export default YStack