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
        ? Math.max(asFloat(accountBalances.mana?.data!) - 10, 0)
        : asFloat(accountBalances.vhp?.data!);
  } else {
    noun = "withdrawal";
    buttonText = `← ${action} ${token}`;

    const accountPool = asFloat(accountBalances.pool?.data!);
    const accountPvhp = asFloat(accountBalances.pvhp?.data!);
    const poolTokens =
      token === Tokens.KOIN
        ? Math.max(asFloat(poolBalances.mana?.data!) - 10, 0)
        : asFloat(poolBalances.vhp?.data!);
    max =
      accountPool < poolTokens
        ? accountPvhp
        : parseFloat(((poolTokens * accountPvhp) / accountPool).toFixed(8));
  }

  const onPoolAction = async () => {
    if (!poolContract) return;

    setLoading(true);

    try {
      const result = await poolContract!.functions[
        `${action.toLowerCase()}_${token.toLowerCase()}`
      ]({
        account,
        value: utils.parseUnits(amount, 8),
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

      if (token === Tokens.KOIN) {
        accountBalances.koin?.mutate();
        if (action === Actions.Deposit) {
          poolBalances.vhp?.mutate();
        } else {
          poolBalances.koin?.mutate();
        }
      } else {
        accountBalances.vhp?.mutate();
        poolBalances.vhp?.mutate();
      }
      accountBalances.pvhp?.mutate();
      accountBalances.pool?.mutate();

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
            <Text>
              {action === Actions.Withdraw
                ? `pVHP amount to redeem for ${token}`
                : `${token} amount`}
            </Text>
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
              {action === Actions.Withdraw ? "pVHP" : token}
            </Text>

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
                    token === Tokens.KOIN ? (
                      accountBalances.koin?.data
                    ) : (
                      accountBalances.vhp?.data
                    )
                  ) + (
                    action === Actions.Deposit ? (
                      -parseInt(utils.parseUnits(amount, 8))
                    ) : Math.floor(
                      parseInt(utils.parseUnits(amount, 8)) *
                      (parseInt(poolBalances.koin?.data) +
                        parseInt(poolBalances.vhp?.data)) /
                      parseInt(pvhpTotalSupply.data || "0") 
                    )
                  )
                ).toString()}
              />
              <Balance
                label={`Your estimated pVHP after ${noun}`}
                value={(
                  parseInt(accountBalances.pvhp?.data) + (
                    action === Actions.Withdraw ? (
                      -parseInt(utils.parseUnits(amount, 8))
                    ) : Math.floor(
                      parseInt(utils.parseUnits(amount, 8)) *
                      parseInt(pvhpTotalSupply.data || "0") /
                      (parseInt(poolBalances.koin?.data) +
                        parseInt(poolBalances.vhp?.data))
                    )
                  )
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
