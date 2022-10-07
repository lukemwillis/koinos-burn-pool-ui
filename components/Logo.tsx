import { useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";

interface LogoProps {
    size: string;
}

export default function Logo({ size }: LogoProps) {
  return (
      <Image
        src={useColorModeValue("/logo.svg", "/logo-dark.svg")}
        alt="Burn Koin Logo"
        width={size}
        height={size}
      />
  );
}
