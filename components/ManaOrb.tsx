import {
  Box,
  Tooltip,
  keyframes,
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";

type ManaOrbProps = {
  percent: number;
};

export default function ManaOrb({ percent }: ManaOrbProps) {
  const {
    colors: { gray, white, purple, whiteAlpha },
  } = useTheme();
  const formattedPercent = Math.floor(percent * 100) || 1;

  const spin = keyframes`
    0% {transform: rotate(0deg);}
    50% {transform: rotate(750deg);}
    75% {transform: rotate(690deg);}
    100% {transform: rotate(720deg);}
  `;

  const fill = keyframes`
    from {transform: translateY(-25%);}
    to {transform: translateY(-${(formattedPercent - 50) / 2 + 50}%);}
  `;

  return (
    <Tooltip label={`${percent >= 0.01 ? formattedPercent : "<1"}% Mana`} placement="bottom" hasArrow>
      <Box
        width="3.5em"
        height="3.5em"
        borderRadius="100%"
        borderWidth="thin"
        borderColor="inherit"
        background={useColorModeValue(purple[300], purple[600])}
        marginBottom="0.5em"
        marginLeft="1em"
        position="relative"
        overflow="hidden"
        backgroundClip="padding-box"
      >
        <Box
          position="absolute"
          bottom="-50%"
          left="-50%"
          height="200%"
          width="200%"
          animation={`${fill} 2s ease-in-out forwards`}
        >
          <Box
            background={useColorModeValue(white, gray[800])}
            height="100%"
            width="100%"
            borderRadius="40%"
            animation={`${spin} 4s ease-out forwards`}
          />
        </Box>
        <Box
          position="absolute"
          left="10%"
          bottom="10%"
          width="2.75em"
          height="2.75em"
          borderRadius="50%"
          boxShadow={`inset 3px 0px ${whiteAlpha[300]}`}
          transform="rotate(-45deg)"
        ></Box>
      </Box>
    </Tooltip>
  );
}
