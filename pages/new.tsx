import { HackerNewsPosts } from '@components/HackerNewsPosts';
import { Layout } from '@components/Layout';
import { getStories, IHackerNewsItem } from '@lib/hackernews';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

export const getStaticProps: GetStaticProps<{ items: IHackerNewsItem[] }> = async () => {
  const items = await getStories();

  return {
    props: {
      items,
    },
    revalidate: 10,
  };
};

const New = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>New | Next-HN</title>
      </Head>

      <HackerNewsPosts items={items} />
    </>
  );
};

New.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default New;
