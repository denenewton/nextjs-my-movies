import Head from "next/head";
import { ReactNode, useContext } from "react";
import { Button, Container, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import SearchContext from "../contexts/SearchContext";

interface Props {
  children: ReactNode;
}

export const siteTitle = "Denenewton Movies";
const genres = ['Science fiction','Adventure','Drama' ,'Romance' , 'Action', 'Thriller','Comedy', 'Fantasy', 'All Genre']

export default function Layout({ children }: Props) {
  const { setselectGenreText,selectGenreText } = useContext(SearchContext);
  const { pathname } = useRouter();
  return (
    <Container maxW="100%" px={1}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg:  `${pathname === '/' ? `"nav nav" "aside main"`: `"nav nav" " main"` }`,
        }}
        templateColumns={{
          base: "1fr",
          lg: `${pathname === '/' ? '200px 1fr': '1fr' }`,
        }}
        marginEnd={4}
        marginStart={4}
      >
        <GridItem area="nav">
          <Navigation />
        </GridItem>
       {pathname === '/' && ( <Show above="lg">
          <GridItem area="aside"  py='1.5rem'>
            <aside>{genres.map(genre => (
              <HStack key={genre} marginBottom={4}>
              <Button
              whiteSpace="normal"
              textAlign="left"
              fontWeight={genre === selectGenreText ? "bold" : "normal"}
              onClick={() => setselectGenreText(genre)}
              fontSize="md"
              variant="link"              
            >
              {genre}
            </Button>
            </HStack>
            ))}</aside>
          </GridItem>
        </Show>) }
        <GridItem area="main" paddingY={5}>
          <main>{children}</main>
        </GridItem>
      </Grid>
      <footer>
        <p>@denenewton movies</p>
      </footer>
    </Container>
  );
}
