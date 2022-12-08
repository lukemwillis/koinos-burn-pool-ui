import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  useToast,
  NumberInput,
  NumberInputField,
  Link,
  Text,
  Spinner,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { utils } from "koilib";
import { useDisclosure } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
import { useContracts } from "../context/ContractsProvider";
import { usePoolBalances } from "../context/PoolBalancesProvider";
import { useAccountBalances } from "../context/AccountBalancesProvider";
import { asFloat } from "../context/BalanceUtils";
import Balance from "./Balance";
import useSWR from "swr";
import { InfoIcon } from "@chakra-ui/icons";

export enum Actions {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
}

export enum Tokens {
  KOIN = "KOIN",
  VHP = "VHP",
}

interface PoolActionButtonProps {
  action: Actions.Deposit | Actions.Withdraw;
  token: Tokens.KOIN | Tokens.VHP;
}

export default function PoolActionButton({
  action,
  token,
}: PoolActionButtonProps) {
  const { account } = useAccount();
  const { pool: poolContract, pvhp: pvhpContract } = useContracts();
  const accountBalances = useAccountBalances();
  const poolBalances = usePoolBalances();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0");

  let noun: string, buttonText: string, max: number;

  const pvhpTotalSupply = useSWR("pvhp_supply", async () => {
    const { result } = await pvhpContract!.functions.totalSupply<{
      value: string;
    }>({});

    return result?.value!;
  });

  if (action === Actions.Deposit) {
    noun = "deposit";
    buttonText = `${action} ${token} →`;
    max =
      token === Tokens.KOIN
        ? // TODO make deposit minimum dynamic, alert?
          Math.max(asFloat(accountBalances.mana?.data!) - 1, 0)
        : asFloat(accountBalances.vhp?.data!);
  } else {
    noun = "withdrawal";
    buttonText = `← ${action} ${token}`;

    const accountPool = asFloat(accountBalances.pool?.data!);
    const poolTokens =
      token === Tokens.KOIN
        ? // TODO read metadata for koin buffer
          Math.max(asFloat(poolBalances.mana?.data!) - 10, 0)
        : asFloat(poolBalances.vhp?.data!);
    max = Math.min(accountPool, poolTokens);
  }

  const onPoolAction = async () => {
    if (!poolContract) return;

    setLoading(true);

    try {
      const result = await poolContract!.functions[
        `${action.toLowerCase()}_${token.toLowerCase()}`
      ]({
        account,
        value:
          action === Actions.Deposit
            ? utils.parseUnits(amount, 8)
            : (
                (parseInt(utils.parseUnits(amount, 8)) *
                  parseInt(pvhpTotalSupply.data || "0")) /
                (parseInt(poolBalances.koin?.data) +
                  parseInt(poolBalances.vhp?.data))
              ).toString(),
      });

      toast({
        title: `${token} ${noun} submitted`,
        description: `The transaction containing your ${token} ${noun} is being processed, this may take some time.`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });

      await result.transaction?.wait();

      toast({
        title: `${token} ${noun} succeeded`,
        description: `The transaction containing your ${token} ${noun} succeeded! Have a great day!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setAmount("0");

      if (token === Tokens.KOIN) {
        accountBalances.koin?.mutate();
        poolBalances.vhp?.mutate();
        poolBalances.koin?.mutate();
        poolBalances.mana?.mutate();
      } else {
        accountBalances.vhp?.mutate();
        poolBalances.vhp?.mutate();
      }
      accountBalances.pvhp?.mutate();
      accountBalances.pool?.mutate();
      accountBalances.mana?.mutate();

      onClose();
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      toast({
        title: `${token} ${noun} failed`,
        description: `The transaction containing your ${token} ${noun} failed with error message: ${e}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button disabled={max === 0} onClick={onOpen} marginTop="6px">
        {buttonText}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {action} {token}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>{token} amount</Text>
            <NumberInput
              value={amount}
              onChange={setAmount}
              precision={8}
              min={0}
              max={max}
              size="lg"
            >
              <NumberInputField disabled={loading} autoFocus />
            </NumberInput>
            <Text>
              <Link onClick={() => !loading && setAmount(max.toFixed(8))}>
                max: {max.toFixed(8)}
              </Link>{" "}
              {token}
            </Text>

            {token === Tokens.KOIN && (
              <Flex
                borderWidth="thin"
                borderColor="inherit"
                borderRadius="md"
                padding="4"
                marginTop="3"
                alignItems="center"
              >
                <InfoIcon marginRight="1em" />
                <Text>
                  {action === Actions.Deposit &&
                    "Liquidity is minimized to maximize returns. Don't deposit KOIN you're not willing to commit to long term block production. "}
                  The maximum KOIN you can {action.toLowerCase()} is equal to{" "}
                  {action === Actions.Deposit ? "your" : "the pool's"} available
                  mana, minus a {action === Actions.Deposit ? "1" : "10"} KOIN
                  buffer to ensure{" "}
                  {action === Actions.Deposit ? "you have" : "the pool has"}{" "}
                  enough mana to pay for{" "}
                  {action === Actions.Deposit
                    ? "the deposit"
                    : "producing blocks"}
                  .
                </Text>
              </Flex>
            )}

            <Stack
              borderWidth="thin"
              borderColor="inherit"
              borderRadius="md"
              padding="4"
              marginTop="6"
              gap="3"
            >
              <Balance
                label={`Your estimated ${token} after ${noun}`}
                value={(
                  parseInt(
                    token === Tokens.KOIN
                      ? accountBalances.koin?.data
                      : accountBalances.vhp?.data
                  ) +
                  (action === Actions.Deposit
                    ? -parseInt(utils.parseUnits(amount, 8))
                    : parseInt(utils.parseUnits(amount, 8)))
                ).toString()}
              />
              <Balance
                label={`Your estimated pooled value after ${noun}`}
                value={(
                  parseInt(accountBalances.pool?.data) +
                  (action === Actions.Withdraw
                    ? -parseInt(utils.parseUnits(amount, 8))
                    : parseInt(utils.parseUnits(amount, 8)))
                ).toString()}
              />
            </Stack>
            <Text>*actual numbers may vary</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onPoolAction}
              disabled={parseFloat(amount) === 0 || loading}
            >
              {loading ? <Spinner /> : `${action} ${token}`}
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
