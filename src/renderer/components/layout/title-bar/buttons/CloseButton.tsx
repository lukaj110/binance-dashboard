import { IconButton } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

const CloseButton = () => {
  return (
    <IconButton
      bg="none"
      id="close-btn"
      aria-label="Close"
      icon={<MdClose />}
      rounded="none"
      _focus={{
        ring: 'none',
      }}
      onClick={() => {
        window.electron.ipcRenderer.call('close');
      }}
    />
  );
};

export default CloseButton;
