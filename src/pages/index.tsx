import Head from "next/head";
import Layout from "../components/layout";
import ListMovies from "../components/ListMovies";




export default function Home() {


  return (
    <Layout>
      <Head>
        <title>Denenewton | Home</title>
      </Head>
      <main>
         <ListMovies />
      </main>
    </Layout>
  );
}
