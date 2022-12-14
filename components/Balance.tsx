import { InfoOutlineIcon } from "@chakra-ui/icons";
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
      <Text position="relative" zIndex="1">
        {label}{" "}
        {tooltip && (
          <Tooltip label={tooltip} placement="right" hasArrow>
            <InfoOutlineIcon inlineSize="14px" paddingBottom="0.2em" />
          </Tooltip>
        )}
      </Text>
      <Skeleton isLoaded={!!value} minWidth="250px" borderRadius={3} position="relative" zIndex="0">
        <Text fontSize={{ base: "4xl", md: "6xl" }} as="span" lineHeight={1} fontWeight="bold">
          {parseInt(whole).toLocaleString()}
        </Text>
        <Text fontSize={{ base: "2xl", md: "3xl" }} as="span" lineHeight={1}>
          .{decimal}
        </Text>
      </Skeleton>
    </Box>
  );
}
