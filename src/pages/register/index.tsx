import { Container } from "@chakra-ui/react";
import RegisterMovies from "../../components/RegisterMovies";
import Layout from "../../components/layout";

interface Props {
  imageURL: string;
  setImageURL: (arg: string) => void;
}
const Register = ({ imageURL, setImageURL }: Props) => {
  
  return (
    <Layout>
      <Container mt={5} alignItems="center">
        <RegisterMovies imageURL={imageURL} setImageURL={setImageURL} />
      </Container>
    </Layout>
  );
};

export default Register;
