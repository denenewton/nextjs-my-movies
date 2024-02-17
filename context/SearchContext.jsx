'use client'

import { createContext, useEffect, useState } from "react";


const SearchContext = createContext(null);

export function SearchProvider ({ children }){
  const [searchText, setSearchText] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
 
  const value = {
    searchText,setSearchText,
    searchGenre,setSearchGenre,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;

