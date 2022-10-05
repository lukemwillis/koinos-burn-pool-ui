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
} from "@chakra-ui/react";
import { utils } from "koilib";
import { useDisclosure } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
import { useContracts } from "../context/ContractsProvider";
import { asFloat, useBalances } from "../context/BalancesProvider";

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
  const { pool: poolContract } = useContracts();
  const { account: accountBalances, pool: poolBalances } = useBalances();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("0");

  let noun: string, buttonText: string, max: number;

  if (action === Actions.Deposit) {
    noun = "deposit";
    buttonText = `${action} ${token} →`;
    max = asFloat(
      token === Tokens.KOIN
        ? accountBalances.koin?.value!
        : accountBalances.vhp?.value!
    );
  } else {
    noun = "withdrawal";
    buttonText = `← ${action} ${token}`;
    max = asFloat(accountBalances.pvhp?.value!);
  }

  const onPoolAction = async () => {
    if (!poolContract) return;

    const result = await poolContract!.functions[`${action.toLowerCase()}_${token.toLowerCase()}`]({
      account,
      value: utils.parseUnits(amount, 8),
    });

    console.log(result);

    toast({
      title: `${token} ${noun} submitted`,
      description: `The transaction containing your ${token} ${noun} is being processed, this may take some time.`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });

    onClose();

    try {
      await result.transaction?.wait();

      toast({
        title: `${token} ${noun} succeeded`,
        description: `The transaction containing your ${token} ${noun} succeeded! Have a great day!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      if (token === Tokens.KOIN) {
        accountBalances.koin?.refresh();
        poolBalances.koin?.refresh();
      } else {
        accountBalances.vhp?.refresh();
        poolBalances.vhp?.refresh();
      }
      accountBalances.pvhp?.refresh();
      accountBalances.pool?.refresh();
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      toast({
        title: `${token} ${noun} failed`,
        description: `The transaction containing your ${token} ${noun} failed. Please try again.`,
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {action} {token}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <NumberInput
              value={amount}
              onChange={setAmount}
              precision={8}
              min={0}
              max={max}
            >
              <NumberInputField />
            </NumberInput>
            <Link onClick={() => setAmount(max.toString())}>max: {max}</Link>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onPoolAction}>
              {action} {token}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
