import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";

import { usePoolBalances } from "../context/PoolBalancesProvider";
import Balance from "../components/Balance";
import { InfoIcon } from "@chakra-ui/icons";

const PoolStats = () => {
  const { koin, vhp } = usePoolBalances();

  return (
    <Box width="750px">
      <Flex justifyContent="space-between">
        <Balance
          label="Total Deposits (KOIN + VHP)"
          value={(parseInt(koin?.data) + parseInt(vhp?.data) || "").toString()}
        />
        <Box>
          <Text>
            Expected APY{" "}
            <Tooltip
              label="Koinos Proof of Burn is expected to return 4% under target conditions. Burn Koin takes a 5% operator fee from block rewards. Your deposits are never touched and there are no other fees. APY may vary based on several factors not controlled by Burn Koin, such as total KOIN burned and VHP actively participating in mining."
              placement="right"
              hasArrow
            >
              <InfoIcon verticalAlign="text-top" />
            </Tooltip>
          </Text>
          <Text fontSize="6xl" as="span" lineHeight={1} fontWeight="bold">
            3.8
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
