import { useColorModeValue, Image, ResponsiveValue } from "@chakra-ui/react";

interface LogoProps {
    size: ResponsiveValue<string>;
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
