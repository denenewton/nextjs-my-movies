import { ReactNode, createContext, useEffect, useState } from "react";
import { getMoviesList } from "../utils/firebaseUtils";
import { Movie } from "../components/RegisterMovies";

interface Props {
  children: ReactNode;
}


const SearchContext = createContext({
  movies: [
    { title: "", genre: "", director: "", description: "", year: "", url: "" },
  ],
  searchText: "",
  setSearchText: (_arg: string) => {},
});

export const SearchProvider = ({ children }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      const m = await getMoviesList();
      setMovies(m);
    })();
  }, []);

  const value = {
    movies,
    searchText,
    setSearchText,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
