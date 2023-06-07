import { Switch, HStack, useColorMode, Text } from "@chakra-ui/react";

const SwitchColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        ml={4}
      />
      <Text whiteSpace="nowrap">Dark Mode</Text>
    </HStack>
  );
};

export default SwitchColorMode;
