import { Box } from "@chakra-ui/react";
import YourWallet from "./YourWallet";
import PoolContract from "./PoolContract";

export default function Pool() {
  return (
    <Box
      borderWidth="thin"
      borderColor="gray.300"
      borderRadius="lg"
      padding="4"
      margin="4"
    >
      <YourWallet />
      <PoolContract />
    </Box>
  );
}
