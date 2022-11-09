import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  initialColorMode: 'system',
  fonts: {
    heading: `'Prompt', sans-serif`,
    body: `'Prompt', sans-serif`,
  },
})

export default theme