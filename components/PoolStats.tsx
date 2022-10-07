import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";

import { usePoolBalances } from "../context/PoolBalancesProvider";
import Balance from "../components/Balance";
import { InfoIcon } from "@chakra-ui/icons";

const PoolStats = () => {
  const { koin, vhp } = usePoolBalances();

  return (
    <Box>
      <Flex>
        <Balance
          label="Total KOIN Deposits"
          tooltip="All KOIN held by pool. Awaiting reburn."
          value={koin?.data}
        />
        <Balance
          label="Total VHP Deposits"
          tooltip="All VHP held by pool. Currently producing blocks."
          value={vhp?.data}
        />
      </Flex>
      <Flex marginTop="24px" justifyContent="space-between">
        <Box>
          <Text>
            Blocks Produced{" "}
            <Tooltip label="Since pool genesis" placement="right" hasArrow>
              <InfoIcon verticalAlign="text-top" />
            </Tooltip>
          </Text>
          <Text fontSize="6xl" as="span" lineHeight={1} fontWeight="bold">
            TODO
          </Text>
        </Box>
        <Box>
          <Text>
            Expected APY{" "}
            <Tooltip
              label="Assuming 50% of KOIN total supply is burned as VHP"
              placement="right"
              hasArrow
            >
              <InfoIcon verticalAlign="text-top" />
            </Tooltip>
          </Text>
          <Text fontSize="6xl" as="span" lineHeight={1} fontWeight="bold">
            4
          </Text>
          <Text fontSize="3xl" as="span" lineHeight={1}>
            %
          </Text>
        </Box>
        <Box>
          <Text>
            Operator Fee{" "}
            <Tooltip
              label="Percent fee taken by operator for running the pool. Your deposited principal is never touched."
              placement="right"
              hasArrow
            >
              <InfoIcon verticalAlign="text-top" />
            </Tooltip>
          </Text>
          <Text fontSize="6xl" as="span" lineHeight={1} fontWeight="bold">
            5
          </Text>
          <Text fontSize="3xl" as="span" lineHeight={1}>
            %
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PoolStats;
