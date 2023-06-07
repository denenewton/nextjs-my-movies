import Link from "next/link";
import { HStack, Text, Image, Box } from "@chakra-ui/react";
import SwitchColorMode from "../components/SwitchColorMode";
import logo from "../assets/logo.webp";
import SearchInput from "../components/SearchInput";
import { useRouter } from "next/router";

const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <div>
      <HStack
        justifyContent="space-between"
        height={20}
        spacing={4}
      >
        <Link href="/" >
          <Box boxSize="60px" marginStart={-2}>
            <Image src={logo.src} width='100%' />
          </Box>
        </Link>
        {pathname == "/" && <SearchInput />}
        <HStack>
          {pathname == "/" && (
            <Link href="/register">
              <Text>Register</Text>
            </Link>
          )}
          <SwitchColorMode />
        </HStack>
      </HStack>
    </div>
  );
};

export default Navigation;
