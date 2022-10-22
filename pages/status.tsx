import type { NextPage } from "next";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Header from "../components/Header";
import { useContracts } from "../context/ContractsProvider";
import useSWR from "swr";
import { useState } from "react";

const Status: NextPage = () => {
  const { provider } = useContracts();
  const [blockProducers, setBlockProducers] = useState(new Map<string, string>());

  useSWR(
    'blocks',
    async () => {
      let numToFetch, head;

      console.log('here');

      const { head_topology } = await provider?.getHeadInfo()!;
      head = parseInt(head_topology.height);
      numToFetch = 10;

      console.log(head);

      const blocks = await provider?.getBlocks(head - numToFetch, numToFetch)!;

      console.log({blocks});

      let copy = new Map(blockProducers);
      setBlockProducers(blocks.reduce((acc, curr) => {
        console.log({ acc, curr })
        acc.set(curr.block_height, curr.block.header?.signer!);
        return acc;
      }, copy));
    },
    { refreshInterval: 30000 }
  );

  return (
    <Box minHeight="100vh">
      <Box padding={8} margin="auto" width="1024px">
        <Header />
        <Heading as="h1" size="4xl">
          Pool node status 🟢🟡🔴
        </Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>height</Th>
              <Th>producer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...blockProducers.keys()].map((height) => {
              const producer = blockProducers.get(height);
              return <Tr key={height}>
                <Td>{height}</Td>
                <Td color={producer === process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR ? "green" : ""}>{producer}</Td>
              </Tr>
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Status;
