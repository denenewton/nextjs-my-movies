import { useRouter } from "next/router";
import Details from "../../components/Details";
import Layout from "../../components/layout";
import { Container } from "@chakra-ui/react";
import Head from "next/head";

export default function Page() {
  const router = useRouter();
  console.log(router.query.title);

  return (
    <Layout>
      <Head>
        <title>{`Detail | ${router.query.title}`}</title>
      </Head>
      <Container mt={5} alignItems="center">
        <Details title={router.query.title} />
      </Container>
    </Layout>
  );
}
