import { Box, GridItem, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SectionProps {
  heading: string;
  children: ReactNode;
  colspan?: number;
  rowspan?: number;
}

export default function Section({ heading, children, colspan = 1, rowspan = 1 }: SectionProps) {
  return (
    <GridItem colSpan={colspan} rowSpan={rowspan}>
      <Text fontSize='2xl'>{heading}</Text>
      <Box
        borderWidth="thin"
        borderColor="gray.300"
        borderRadius="lg"
        padding="4"
      >
        {children}
      </Box>
    </GridItem>
  );
}
