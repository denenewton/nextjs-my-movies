'use client'
import { getCollectionByGenre } from "../utils/firebase.utils";
import { Button, HStack, List, ListItem,  Heading, useColorModeValue} from "@chakra-ui/react";
import { useEffect } from "react";
import useSearchContext from "../hook/useSearchContext";
//import { useContext } from "react";
//import QueryContext from "@/contexts/QueryContext";


const GenreList = () =>  {
  const genres = ['Science fiction','Adventure','Drama' ,'Romance' , 'Teen','Action', 'Thriller','Comedy', 'Fantasy', 'All Genres']
  const {searchText, setGenreMovies  ,searchGenre,setSearchGenre,} = useSearchContext()
  //const { selectGenreText, dispatchGenre } = useContext(QueryContext);
  ///const color = useColorModeValue('gray.700','')


  
  return (
    <>
      <Heading fontSize="2xl" marginTop={10} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {genres.map((genre, index) => (
          <ListItem key={index} paddingY="5px">
            <HStack>

              <Button
                 fontWeight={genre === searchGenre ? "bold" : "normal"}
                 onClick={() => setSearchGenre(genre)}
                fontSize="lg"
                variant="link"
                //color={color}
              >
                {genre !== 'Science_Fiction'?  genre : 'Science fiction'}
              </Button>

            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};


export default GenreList

