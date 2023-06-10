import { ReactNode, createContext, useEffect, useState } from "react";
import { getMoviesList } from "../utils/firebaseUtils";
import { Movie } from "../components/RegisterMovies";

interface Props {
  children: ReactNode;
}


const SearchContext = createContext(null);

export const SearchProvider = ({ children }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [imageURL, setImageURL] = useState('')

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
    imageURL,
    setImageURL
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
