import { Container } from '@components/container';
import { HackerNewsItem } from '@components/HackerNewsItem';
import { Layout } from '@components/layout';
import { getTopStories } from '@lib/hackernews';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const items = await getTopStories();

  return {
    props: {
      items,
    },
  };
};

const Home = ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Next-HN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Next.js powered Hacker News App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Container>
          <div className="bg-gray-100">
            <ul className="bg-gray-100 p-2">
              {items.map((item) => {
                return <HackerNewsItem item={item} key={item.id} />;
              })}
            </ul>
          </div>
        </Container>
      </main>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
