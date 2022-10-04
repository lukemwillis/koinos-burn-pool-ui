import { useContext, useState } from "react";
import { Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, Box, Stack, Button, ButtonGroup, Flex, Grid, Spinner, Text, useToast, Input } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { utils } from "koilib";
import { useDisclosure } from "@chakra-ui/react"

interface PoolActionButtonProps {
    action: string;
}

export default function PoolActionButton({ action }: PoolActionButtonProps) {
  const {
    state: { account, poolContract },
  } = useContext(AppContext);

  const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [amount, setAmount] = useState('0');
    const token = action.endsWith('koin') ? 'KOIN' : 'VHP';
    const isDeposit = action.startsWith('deposit')
    const verb = isDeposit ? `deposit` : `withdraw`;
    const noun = isDeposit ? `deposit` : `withdrawal`;
    const buttonText = isDeposit ? `${verb} ${token} →` : `← ${verb} ${token}`;

    const onPoolAction = async () => {
        if (!poolContract) return;
    
        const result = await poolContract!.functions[action]({
            account,
            value: utils.parseUnits(amount, 8)
        })

        console.log(result);

        toast({
            title: `${token} ${noun} submitted`,
            description: `The transaction containing your ${token} ${noun} is being processed, this may take some time.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
        })
    
        onClose();
    }
    return (
      <>
        <Button onClick={onOpen}>{buttonText}</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{verb} {token}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onPoolAction}>
                {verb} {token}
              </Button>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }