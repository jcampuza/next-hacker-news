import { Container } from '@components/Container';
import { Layout } from '@components/Layout';
import { LinkButton } from '@components/Link';
import { ReactElement } from 'react';

const _404 = () => {
  return (
    <Container className="py-10">
      <h1 className="text-4xl font-semibold mb-4">404</h1>

      <p className="mb-4">There&apos;s nothing to be found here</p>

      <div>
        <LinkButton href="/">Home</LinkButton>
      </div>
    </Container>
  );
};

_404.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default _404;
