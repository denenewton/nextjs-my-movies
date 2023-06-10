import { Container } from "@chakra-ui/react";
import RegisterMovies from "../../components/RegisterMovies";
import Layout from "../../components/layout";

const Register = () => {
  
  return (
    <Layout>
      <Container mt={5} alignItems="center">
        <RegisterMovies />
      </Container>
    </Layout>
  );
};

export default Register;
