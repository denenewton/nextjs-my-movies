import Link from "next/link";
import { Card, CardBody, Heading, Image, Text, Button } from "@chakra-ui/react";

const CardMovies = ({ movie }) => {
  return (
    <Card overflow="hidden">
      {/* vai um Link aqui */}
      <Image
        src={movie?.urlImage}
        alt={movie?.title}
        objectFit="cover"
        backgroundPosition="center"
      />

      <CardBody>
        <Link href={`/movie/${movie.title.toString().toLowerCase()}`}>
          {/* href={'/movie/' + movi.title.toLowerCase()} */}
          <Text fontSize={"2xl"} fontWeight={600}>
            {movie?.title}
          </Text>
        </Link>
        <Text fontSize="14.5px" fontWeight={400}>
          {movie?.genre}
        </Text>
      </CardBody>
    </Card>
  );
};

export default CardMovies;
