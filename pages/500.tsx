import { Container } from '@components/Container';
import { Layout } from '@components/Layout';
import { LinkButton } from '@components/Link';
import { ReactElement } from 'react';

const _500 = () => {
  return (
    <Container className="py-10">
      <h1 className="text-4xl font-semibold mb-4">500</h1>

      <p className="mb-4">Houston, we have a problem.</p>

      <div>
        <LinkButton href="/">Home</LinkButton>
      </div>
    </Container>
  );
};

_500.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default _500;
