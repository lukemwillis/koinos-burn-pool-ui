import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";

import { usePoolBalances } from "../context/PoolBalancesProvider";
import Balance from "../components/Balance";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const PoolStats = () => {
  const { koin, vhp } = usePoolBalances();

  return (
    <Box width={{ base: "100%", md: "750px" }} textAlign={{ base: "center", md: "left" }}>
      <Flex justifyContent="space-between" alignItems="center" gap="32px" flexDirection={{ base: "column", md: "row" }}>
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
            <InfoOutlineIcon inlineSize="14px" paddingBottom="0.2em" />
            </Tooltip>
          </Text>
          <Text fontSize={{ base: "4xl", md: "6xl" }} as="span" lineHeight={1} fontWeight="bold">
            3.8
          </Text>
          <Text fontSize={{ base: "2xl", md: "3xl" }} as="span" lineHeight={1}>
            %
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PoolStats;
