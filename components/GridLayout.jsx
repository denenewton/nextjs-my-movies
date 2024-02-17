
import { Grid, GridItem, Container } from "@chakra-ui/react";
import Aside from "./Aside";
import Navigation from "./Navigation";


const GridLayout = ({ children, pathname }) => {
  
  return (
    <Container maxW="100%" p={0} m={0}>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `${pathname === '/' ? `"nav nav" "aside main"` : `"nav nav" " main"`}`,
        }}
        templateColumns={{
          base: "1fr",
          lg: `${pathname === '/' ? '200px  1fr' : '1fr'}`,
        }}
        margin={0}
      >
        <GridItem
          area={"nav"}
          position={"fixed"}
          top={0}
          right={0}
          left={0}
          zIndex={10}

        >
          <Navigation />

        </GridItem>
        <Aside />
        <GridItem area="main"
          paddingTop={'5.5em'}
          width={{ lg: '100%' }}
          mx={{ lg: 'auto' }}
          px={'1.7rem'}
        >

          {children}

        </GridItem>
      </Grid>
    </Container>
  )
}

export default GridLayout