import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100 min-h-screen pb-2">
      <Head>
        <title>Amazon-Next-clone</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // from fake store api
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );

  return {
    props: {
      products: products,
    },
  };
}
