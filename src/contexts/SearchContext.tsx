import { ReactNode, createContext, useEffect, useState } from "react";
import { getMovieByGenre, getMoviesList } from "../utils/firebaseUtils";
import { Movie } from "../components/RegisterMovies";

interface Props {
  children: ReactNode;
}

const SearchContext = createContext(null);

export const SearchProvider = ({ children }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectGenreText, setselectGenreText] = useState("");
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movFilter, setMovFilter] = useState<Movie[]>([]);
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    (async () => {
      const m = await getMoviesList();
      setMovies(m)
    })();
  }, []);

  useEffect(() => {
    if(selectGenreText === 'All Genre' ) {
      setMoviesByGenre(movies)
      setMovFilter(movies)
      return;
    }
    (async () => {
      const _mov: Movie[] = await getMovieByGenre(selectGenreText);
     setMoviesByGenre(_mov)
     setMovFilter(_mov)
    })();
  }, [selectGenreText]);

  
  useEffect(() => {
    const _movies = searchText
      ? movFilter?.filter((m) =>
          m.title.toLowerCase().includes(searchText?.toLowerCase())
        )
      : movies;
    setMovFilter(_movies)
  }, [searchText]);



  const value = {
    movies,
    searchText,
    setSearchText,
    imageURL,
    setImageURL,
    selectGenreText,
    setselectGenreText,
    moviesByGenre,
    setMoviesByGenre,
    movFilter,
    setMovFilter
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
