import { IconButton } from '@chakra-ui/react';
import { MdOutlineCropSquare as MdMaximize } from 'react-icons/md';

const MaximizeButton = () => {
  return (
    <IconButton
      bg="none"
      id="max-btn"
      aria-label="Maximize"
      icon={<MdMaximize />}
      rounded="none"
      _focus={{
        ring: 'none',
      }}
      onClick={() => {
        window.electron.ipcRenderer.call('maximize');
      }}
    />
  );
};

export default MaximizeButton;
