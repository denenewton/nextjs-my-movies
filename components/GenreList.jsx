"use client";
import { Button, HStack, List, ListItem, Heading } from "@chakra-ui/react";
import useSearchContext from "../hook/useSearchContext";

const GenreList = () => {
  const genres = [
    "Science_fiction",
    "Adventure",
    "Drama",
    "Romance",
    "Teen",
    "Action",
    "Thriller",
    "Comedy",
    "Fantasy",
    "All Genres",
  ];
  const { searchGenre, setSearchGenre } = useSearchContext();

  return (
    <>
      <Heading fontSize="2xl" marginTop={10} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {genres.map((genre, index) => (
          <ListItem key={genre + index} paddingY="5px">
            <HStack>
              <Button
                key={genre + index}
                fontWeight={genre === searchGenre ? "bold" : "normal"}
                onClick={() => setSearchGenre(genre)}
                fontSize="lg"
                variant="link"
              >
                {genre !== "Science_fiction" ? genre : "Science Fiction"}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
