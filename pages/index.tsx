import { HackerNewsPosts } from '@components/HackerNewsPosts';
import { Layout } from '@components/Layout';
import { getTopStories, IHackerNewsItem } from '@lib/hackernews';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

export const getStaticProps: GetStaticProps<{ items: IHackerNewsItem[] }> = async () => {
  const items = await getTopStories();

  return {
    props: {
      items,
    },
    revalidate: 10,
  };
};

const Home = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Home | Next-HN</title>
      </Head>

      <HackerNewsPosts items={items} />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
