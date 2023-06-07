import { useEffect, useState } from "react";
import { getMovieDetails } from "../utils/firebaseUtils";
import { DocumentData } from "firebase/firestore";

const useMovies = (title: string | undefined) => {
  const [movie, setMovie] = useState<DocumentData | null>();

  useEffect(() => {
    (async () => {
      const m = await getMovieDetails(title);
      setMovie(m);
    })();
  }, []);
  //console.log(movie);
  return { movie };
};

export default useMovies;
