import { IconButton } from '@chakra-ui/react';
import { MdMinimize } from 'react-icons/md';

const MinimizeButton = () => {
  return (
    <IconButton
      bg="none"
      id="min-btn"
      aria-label="Minimize"
      icon={<MdMinimize />}
      rounded="none"
      _focus={{
        ring: 'none',
      }}
      onClick={() => {
        window.electron.ipcRenderer.call('minimize');
      }}
    />
  );
};

export default MinimizeButton;
