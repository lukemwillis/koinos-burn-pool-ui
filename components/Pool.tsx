import { Box } from "@chakra-ui/react";
import Balance from "./Balance";

export default function Pool() {
  return (
    <Box
      borderWidth="thin"
      borderColor="gray.300"
      borderRadius="lg"
      padding="4"
      margin="4"
    >
      <Balance />
    </Box>
  );
}
