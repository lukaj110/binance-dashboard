import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  useClipboard,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { IoMdEyeOff, IoMdEye, IoIosCopy, IoMdKey } from 'react-icons/io';
import { ConnectionState } from 'renderer/constants';
import { API_KEY, BINANCE_SOCKET_STATE, SECRET_KEY } from 'renderer/state';

const AuthButton = () => {
  const [connectionState] = useAtom(BINANCE_SOCKET_STATE);
  const [apiKey, setApiKey] = useAtom(API_KEY);
  const [secretKey, setSecretKey] = useAtom(SECRET_KEY);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const { onCopy: onApiCopy } = useClipboard(apiKey);
  const { onCopy: onSecretCopy } = useClipboard(secretKey);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        bg="none"
        aria-label="API Key"
        icon={<IoMdKey />}
        rounded="none"
        _focus={{
          ring: 'none',
        }}
        onClick={onOpen}
        disabled={connectionState !== ConnectionState.CLOSED}
      />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Link
              href="https://www.binance.com/en/my/settings/api-management"
              isExternal
            >
              Authentication <ExternalLinkIcon />
            </Link>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} mb={4}>
              <HStack width="100%">
                <FormControl>
                  <FormLabel>API Key</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="Enter API Key"
                      onChange={(e) => {
                        setApiKey(e.target.value);
                      }}
                      value={apiKey}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showApiKey ? 'Hide Key' : 'Show Key'}
                        icon={showApiKey ? <IoMdEyeOff /> : <IoMdEye />}
                        size="sm"
                        onClick={() => setShowApiKey((s) => !s)}
                        _focus={{
                          ring: 'none',
                        }}
                        bg="none"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <IconButton
                  alignSelf="end"
                  aria-label="Copy Key"
                  icon={<IoIosCopy />}
                  onClick={onApiCopy}
                  _focus={{
                    ring: 'none',
                  }}
                  bg="none"
                />
              </HStack>
              <HStack width="100%">
                <FormControl>
                  <FormLabel>Secret Key</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={showSecretKey ? 'text' : 'password'}
                      placeholder="Enter Secret Key"
                      onChange={(e) => {
                        setSecretKey(e.target.value);
                      }}
                      value={secretKey}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showSecretKey ? 'Hide Key' : 'Show Key'}
                        icon={showSecretKey ? <IoMdEyeOff /> : <IoMdEye />}
                        size="sm"
                        onClick={() => setShowSecretKey((s) => !s)}
                        _focus={{
                          ring: 'none',
                        }}
                        bg="none"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <IconButton
                  alignSelf="end"
                  aria-label="Copy Secret Key"
                  icon={<IoIosCopy />}
                  onClick={onSecretCopy}
                  _focus={{
                    ring: 'none',
                  }}
                  bg="none"
                />
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthButton;
