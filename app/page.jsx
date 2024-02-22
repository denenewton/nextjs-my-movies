"use client";

import useSearchContext from "../hook/useSearchContext";
import { getNumPages, getPaginatedData } from "../utils/firebase.utils";
import { Heading, SimpleGrid, Box, Spacer, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardMovies from "../components/CardMovies";
import GridLayout from "../components/GridLayout";
import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();
  const { searchText, setSearchText, searchGenre, setSearchGenre } =
    useSearchContext();
  const numPerPage = 20;
  const [data, setData] = useState([]);
  const [firstDoc, setFirstDoc] = useState(undefined);
  const [lastDoc, setLastDoc] = useState(undefined);
  const [pages, setPages] = useState(0); //numere do paginas
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(undefined); // <'prev' | 'next' | undefined>
  const [resultMovies, setResultMovies] = useState([]);

  function filterData(data, title, genre, year) {
    // const _data = data;
    return data.filter(
      (m) =>
        new RegExp(title, "i").test(m.title) &&
        new RegExp(genre, "i").test(m.genre) &&
        new RegExp(year, "i").test(m.year)
    );
  }

  useEffect(() => {}, []);

  useEffect(() => {
    let _mov = [];
    if (searchGenre === "All Genres") {
      setSearchGenre("");
      setSearchText("");
      _mov = _mov.concat(data);
    }
    _mov =
      searchText || searchGenre
        ? filterData(data, searchText, searchGenre, "")
        : data;
    setResultMovies(_mov);
  }, [searchText, searchGenre]);

  // Fetch number of pages
  useEffect(() => {
    getNumPages("movies", numPerPage).then((pages) => setPages(pages));
    ///////////////////////////////////////////////////////////////////
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setDirection("next");
        setPage((prev) => prev + 1);
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinela"));
    return () => intersectionObserver.disconnect();
  }, []);

  // Fetch paginated data based on page
  useEffect(() => {
    const startAfterDoc = direction === "next" ? lastDoc : undefined;
    const endBeforeDoc = direction === "prev" ? firstDoc : undefined;

    getPaginatedData(
      "movies",
      "title",
      direction,
      startAfterDoc,
      endBeforeDoc,
      numPerPage
    ).then((data) => {
      const _data = resultMovies.concat(data.result);
      setData(_data);
      setResultMovies(_data);
      setFirstDoc(data.firstDoc);
      setLastDoc(data.lastDoc);
    });
  }, [direction, page]);

  return (
    <GridLayout pathname={pathname}>
      <Box
        h="100%"
        pt={1}
        overflowY="auto"
        scrollBehavior="smooth"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Flex>
          {
            <Heading as="h1" fontSize="4xl" mb={7}>
              {searchGenre !== "All Genres" ? searchGenre : ""} Movies
            </Heading>
          }
          <Spacer />
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          padding="0"
          spacing={4}
        >
          {resultMovies?.map((movi) => (
            <>
              <CardMovies key={movi.title} movie={movi} />
            </>
          ))}
        </SimpleGrid>
      </Box>
      <p
        id="sentinela"
        className={page > pages || searchGenre || searchText ? "invisible" : ""}
        style={{ color: "transparent" }}
      >
        text
      </p>
    </GridLayout>
  );
};

export default page;
