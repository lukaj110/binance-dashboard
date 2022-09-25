import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

const ThemeSwitchButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      bg="none"
      marginRight={2}
      sx={{ WebkitAppRegion: 'no-drag' }}
      aria-label="Toggle dark mode."
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      rounded="none"
      _focus={{
        ring: 'none',
      }}
    />
  );
};

export default ThemeSwitchButton;
