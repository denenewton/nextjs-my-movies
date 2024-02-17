import { Switch, HStack, useColorMode, Text } from "@chakra-ui/react";

const SwitchColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        ml={2}
        mr={2}     
      />
      {/* <Text mr={7} whiteSpace="nowrap">Dark</Text> */}
    </HStack>
  );
};

export default SwitchColorMode;
