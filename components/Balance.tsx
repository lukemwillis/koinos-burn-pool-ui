import { InfoIcon } from "@chakra-ui/icons";
import { Box, Skeleton, Text, Tooltip } from "@chakra-ui/react";

interface BalanceProps {
  value?: string;
  label: string;
  tooltip?: string;
}

export default function Balance({ value, label, tooltip }: BalanceProps) {
  const whole = value?.substring(0, value.length - 8) || "0";
  const decimal = value?.substring(value.length - 8).padStart(8, "0");

  return (
    <Box>
      <Text>
        {label}{" "}
        {tooltip && (
          <Tooltip label={tooltip} placement="right" hasArrow>
            <InfoIcon verticalAlign="text-top" />
          </Tooltip>
        )}
      </Text>
      <Skeleton isLoaded={!!value} marginBottom={3} minWidth="350px" borderRadius={3}>
        <Text fontSize="6xl" as="span" lineHeight={1} fontWeight="bold">
          {whole}
        </Text>
        <Text fontSize="3xl" as="span" lineHeight={1}>
          .{decimal}
        </Text>
      </Skeleton>
    </Box>
  );
}