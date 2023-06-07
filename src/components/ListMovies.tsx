import {
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';

import { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';
import Link from 'next/link';

const ListMovies = () => {
  const { movies, searchText } = useContext(SearchContext);

  const _movies = searchText
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(searchText.toLowerCase()),
      )
    : movies;

  return (
    <div>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="0"
        spacing={4}
      >
        {_movies.map((m: DocumentData) => (
          <Card key={m.title} overflow="hidden">
            <Link
              href={{
                pathname: '/details/[title]',
                query: { title: m.title.toLowerCase()},
              }}
            >
              <Image src={m.url} alt={m.title}/>
            </Link>
            <CardBody>
              <Heading fontSize={25}>{m.title}</Heading>
              <Text fontSize={20}>{m.genre}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ListMovies;
