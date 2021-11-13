import { Container } from './Container';
import { Link } from './Link';
import { LoadingBar } from './LoadingBar';

export const Header = () => {
  return (
    <header className="relative w-full bg-gradient-to-r from-red-700 to-red-900 shadow-sm">
      <LoadingBar />
      <Container>
        <div className="flex">
          <h1 className="text-md text-white font-semibold">
            <Link href="/">Next HN</Link>
          </h1>

          <span className="mx-2"> | </span>

          <nav className="flex text-white text-sm items-center">
            <Link href="/new">New</Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
