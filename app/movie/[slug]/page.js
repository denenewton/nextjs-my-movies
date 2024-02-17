
import GridLayout from "../../../components/GridLayout";
import { Container, Box, Image, Text, Link } from "@chakra-ui/react";
import { getOneDocument } from "../../../utils/firebase.utils";

export default async function page({ params }) {
  const slug = decodeURI(params.slug)
  const movie = await getOneDocument('movies', slug.toLowerCase())

  return (
    <GridLayout pathname={`/movie/${params.slug}`}>
      <Container mt={12} alignItems="center" mx='auto' px={0}>
        {
          <>
            {movie && (
              <Box maxW="100%">
                <Box p={0} m={0}>
                  <Image
                    src={movie.urlImage}
                    alt={movie.title}
                    width={650}
                    height={300}
                    borderRadius={"md"}
                    objectFit='cover'
                    backgroundPosition='center'
                  />
                </Box>
                <Box alignItems={"flex-start"}>
                  <Link
                    href={movie.urlMovie.replace("'", "")?.replace("'", "")}
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
        }
      </Container>
    </GridLayout>

  );
}
