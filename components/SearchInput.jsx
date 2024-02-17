'use client'

import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";

const SearchInput = () => {
  const ref = useRef(null);
  const { setSearchText} = useContext(SearchContext);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (ref.current) setSearchText(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius={30}
          placeholder="Search movies"
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
