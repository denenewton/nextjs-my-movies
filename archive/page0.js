'use client'

import useSearchContext from "../hook/useSearchContext";

import {
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";


const page = () => {
  const { movies,genreMovies, searchText, searchGenre, setSearchGenre, } = useSearchContext()
  const [movFilter, setMovFilter] = useState([]);

  const filterMovies = (text) => {
    const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search

    if (text == 'All Genres') return movies.filter(movie => movie !== '')
    return movies.filter(movie => regex.test(movie.title) || 
                                  regex.test(movie.genre))
  }
console.log(genreMovies);

  useEffect(() => {
    let _movies = searchText ? filterMovies(searchText) : filterMovies(searchGenre)

    setMovFilter(_movies)

  }, [movies, searchText,searchGenre])


  return (
    <div>
      {<Heading as="h1" fontSize='3xl' mb={7}>
      {searchGenre !== 'All Genres'? searchGenre :''} Movies
      </Heading> }

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="0"
        spacing={4}
      >
        {movFilter?.map((movi) => (
          <Card key={movi.title} overflow="hidden">
            {/* vai um Link aqui */}
            <Image src={movi.urlImage} alt={movi.title} />

            <CardBody>
              <Heading fontSize={25}>{movi.title}</Heading>
              <Text fontSize={20}>{movi.genre}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default page

// const mov =
//   searchText || selectGenreText
//     ? movies.filter((m) => {
//       if (searchText) return m.title.toLowerCase().includes(searchText?.toLowerCase())
//       if (selectGenreText) {
//         if (selectGenreText === 'All Genres') return m.genre !== 'All Genres'

//         return m.genre.toLowerCase().includes(selectGenreText?.toLowerCase())
//       }

//     }) : movies
