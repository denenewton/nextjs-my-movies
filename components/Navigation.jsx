"use client";
import {
  signInWithGooglePopup,
  signOutUser,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";
import Link from "next/link";
import {
  Box,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Image,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import SwitchColorMode from "./SwitchColorMode";

import SearchInput from "./SearchInput";
import { usePathname } from "next/navigation";

import useAuth from "../hook/useAuth";

const Navigation = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const authUser = currentUser?.uid === process.env.NEXT_PUBLIC_UID_GOOGLE;

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      alert("Sign in was successfully done!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      bgGradient={useColorModeValue(
        "linear(to-l, #fff , #fff)",
        "linear(to-l, gray.900, gray.800)"
      )}
      boxShadow="0px .2px .5px 0px #ccc"
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
        height="4.5rem"
        spacing={3}
      >
        <Link href="/">
          <Box boxSize="60px" marginStart={7} mt={3}>
            <Image src={"/assets/crown.svg"} width="70%" />
            <Text fontSize={"12px"} pl={"2px"}>
              movies
            </Text>
          </Box>
        </Link>

        {pathname == "/" && <SearchInput />}

        <HStack>
          {pathname == "/" && authUser && (
            <Link href="/register">
              <Text>Register</Text>
            </Link>
          )}
          <SwitchColorMode />
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              pr={7}
            >
              <Avatar
                size={"sm"}
                src={currentUser ? currentUser.photoURL : ""}
              />
            </MenuButton>
            <MenuList>
              {currentUser && (
                <>
                  <MenuItem>{currentUser.displayName}</MenuItem>
                  <MenuDivider />
                </>
              )}
              {!currentUser ? (
                <MenuItem onClick={signInWithGoogle}>Google Sign In</MenuItem>
              ) : (
                <MenuItem onClick={signOutUser}>Sign Out</MenuItem>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navigation;
