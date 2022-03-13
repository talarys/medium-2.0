// @ts-nocheck
import type { NextPage } from 'next';
import Head from 'next/head';
import { sanityClient } from '../sanity';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Footer from '../components/Footer';
import type { PostType } from '../typings';

interface Props{
  posts:[PostType]
}

const Home: NextPage = ({ posts }: Props) => (
  <div className="flex flex-col h-screen m-0">
    <Head>
      <title>Medium 2.0</title>
      <link rel="icon" href="/Medium.svg" />
    </Head>
    <Header />
    <Banner />
    <Posts posts={posts} />
    <Footer />
  </div>
);

export default Home;

export const getServerSideProps = async () => {
  const query = /* groq */ `*[_type=="post"]{
    _id,
    title,
    author->{
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return { props: { posts } };
};
