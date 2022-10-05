import { Box, Skeleton, Text } from "@chakra-ui/react";

interface BalanceProps {
  value?: string;
  label: string;
}

export default function Balance({
  value,
  label,
}: BalanceProps) {
  const whole = value?.substring(0, value.length - 8) || '0';
  const decimal = value?.substring(value.length - 8).padStart(8, '0');

  return (
    <Box>
      <Text>{label}</Text>
      <Skeleton isLoaded={!!value}>
        <Text fontSize='6xl' as='span'>{whole}</Text><Text fontSize='3xl' as='span'>.{decimal}</Text>
      </Skeleton>
    </Box>
  );
}
