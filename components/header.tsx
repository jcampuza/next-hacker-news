import { clamp, getRandomInRange } from '@lib/math';
import { useRouteChange } from '@lib/useRouteChange';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from './container';

interface TickerOptions {
  onTick: () => void;
  delay: number;
  interval: number;
}

const getTickIncrease = (curr: number) => {
  if (curr < 0.5) {
    return curr + getRandomInRange(0.2, 0.3);
  }

  if (curr < 0.9) {
    return curr + getRandomInRange(0.05, 0.15);
  }

  if (curr < 0.95) {
    return curr + getRandomInRange(0, 0.03);
  }

  return curr + 0.01;
};

const createTicker = (opts: TickerOptions) => {
  let timeoutId: NodeJS.Timeout;
  let intervalId: NodeJS.Timeout;

  const start = async () => {
    timeoutId = setTimeout(() => startInterval(), opts.delay);
  };

  const startInterval = () => {
    intervalId = setInterval(() => {
      opts.onTick();
    }, opts.interval);
  };

  const cleanup = () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };

  return {
    start,
    cleanup,
  };
};

const LoadingBar = () => {
  const loading = useRouteChange();
  const [loadingTick, setLoadingTick] = useState(0);

  /**
   * Start ticker
   */
  useEffect(() => {
    if (!loading) {
      return;
    }

    const ticker = createTicker({
      delay: 400,
      interval: 400,
      onTick: () => {
        return setLoadingTick((curr) => {
          const increase = getTickIncrease(curr);
          console.log(increase);
          return clamp(curr + increase, 0, 0.99);
        });
      },
    });

    ticker.start();

    return () => {
      ticker.cleanup();
    };
  }, [loading]);

  /**
   * When loading finishes, set ticker to complete, and then after a small delay set it back to 0
   */
  useEffect(() => {
    if (loading) {
      return;
    }

    if (loadingTick === 0) {
      return;
    }

    setLoadingTick(1);
    const id = setTimeout(() => {
      return setLoadingTick(0);
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, [loading, loadingTick]);

  const transition = loadingTick === 0 ? 'none' : '250ms transform ease-out';

  return (
    <div
      className="absolute top-0 h-0.5 bg-blue-400 w-full"
      style={{
        transition,
        transformOrigin: 'left',
        transform: `scaleX(${loadingTick})`,
      }}
    ></div>
  );
};

export const Header = () => {
  return (
    <header className="relative w-full bg-gradient-to-r from-red-700 to-red-900 shadow-sm">
      <LoadingBar />
      <Container>
        <div className="flex">
          <h1 className="text-md text-white font-semibold">
            <Link href="/">
              <a>Next HN</a>
            </Link>
          </h1>

          <span className="mx-2"> | </span>

          <nav className="flex text-white text-sm items-center">
            <Link href="/new">
              <a className="underline">New</a>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
