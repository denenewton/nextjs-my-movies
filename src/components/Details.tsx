import useMovies from "../hooks/useMovies";
import { Box, Image, Text, Link } from "@chakra-ui/react";

const Details = ({ title }) => {
  const { movie } = useMovies(title);

  return (
    <>
      {movie && (
        <Box maxW="600px">
          <Box>
            <Image
              src={movie?.url}
              alt={movie.title}
              borderRadius={"md"}
            ></Image>
          </Box>
          <Box alignItems={"flex-start"}>
            <Link
              href={movie["url-movie"]?.replace("'", "")?.replace("'", "")}
              target="_blank"
              rel="noreferrer"
            >
              <Text fontSize="4xl" fontWeight={"bold"} mb={1} mt={1}>
                {" "}
                {movie.title}
              </Text>
            </Link>
            <Text fontSize="sm">
              <Text as={"b"}>Director: </Text>
              {movie.director}
            </Text>
            <Text fontSize="sm">
              <Text as={"b"}>Genre: </Text>
              {movie.genre}
            </Text>
            <Text fontSize="sm" mb={2}>
              <Text as={"b"}>Year: </Text>
              {movie.year}
            </Text>
          </Box>
          <Box fontSize={"2xl"} bgColor="">
            <Text fontWeight={"bold"} mb={1}>
              SINOPSE
            </Text>
            <Text fontSize={"sm"}> {movie.description}</Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Details;
