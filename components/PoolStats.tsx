import { Box, Flex, Skeleton, Text, Tooltip } from "@chakra-ui/react";

import { usePoolBalances } from "../context/PoolBalancesProvider";
import Balance from "../components/Balance";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useContracts } from "../context/ContractsProvider";
import useSWR from "swr";

const PoolStats = () => {
  const { koin, vhp } = usePoolBalances();
  const { koin: koinContract, vhp: vhpContract } = useContracts();

  const koinTotalSupply = useSWR("koin_supply", async () => {
    const { result } = await koinContract!.functions.totalSupply<{
      value: string;
    }>({});

    return parseInt(result?.value!);
  });

  const vhpTotalSupply = useSWR("vhp_supply", async () => {
    const { result } = await vhpContract!.functions.totalSupply<{
      value: string;
    }>({});

    return parseInt(result?.value!);
  });

  const virtualSupply =
    (koinTotalSupply.data || 0) + (vhpTotalSupply.data || 0);
  const yearlyInflationAmount =
    virtualSupply * Math.pow(Math.E, 0.019802) - virtualSupply;
  const currentApy = 0.95 * (100 * yearlyInflationAmount) / (vhpTotalSupply.data || 1);

  return (
    <Box
      width={{ base: "100%", md: "750px" }}
      textAlign={{ base: "center", md: "left" }}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        gap="32px"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Balance
          label="Total Deposits (KOIN + VHP)"
          value={(parseInt(koin?.data) + parseInt(vhp?.data) || "").toString()}
        />
        <Box>
          <Text>
            Current APY*{" "}
            <Tooltip
              label="This number is approximate. Actual yields may be higher or lower. Koinos Proof of Burn is expected to return 4% under target conditions. Burn Koin takes a 5% operator fee from block rewards. Your deposits are never touched and there are no other fees. APY may vary based on several factors not controlled by Burn Koin, such as total KOIN burned and VHP actively participating in mining."
              placement="right"
              hasArrow
            >
              <InfoOutlineIcon inlineSize="14px" paddingBottom="0.2em" />
            </Tooltip>
          </Text>

          <Skeleton
            isLoaded={!!currentApy}
            borderRadius={3}
            position="relative"
            zIndex="0"
          >
            <Text
              fontSize={{ base: "4xl", md: "6xl" }}
              as="span"
              lineHeight={1}
              fontWeight="bold"
            >
              {currentApy.toFixed(2)}
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              as="span"
              lineHeight={1}
            >
              %
            </Text>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default PoolStats;
