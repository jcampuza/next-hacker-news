import { cn } from '@lib/cn';
import { clamp, getRandomInRange } from '@lib/math';
import { useRouteChange } from '@lib/useRouteChange';
import { useEffect, useState } from 'react';

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

const createLoadingTicker = (opts: TickerOptions) => {
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

export const LoadingBar = () => {
  const loading = useRouteChange();
  const [loadingTick, setLoadingTick] = useState(0);

  /**
   * Start ticker
   */
  useEffect(() => {
    if (!loading) {
      return;
    }

    const ticker = createLoadingTicker({
      delay: 200,
      interval: 400,
      onTick: () => {
        return setLoadingTick((curr) => {
          const increase = getTickIncrease(curr);
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

  const isLoading = loadingTick !== 0;

  return (
    <div
      className={cn('absolute top-0 h-0.5 bg-blue-400 w-full', {
        'transition-transform': isLoading,
        'origin-left': isLoading,
      })}
      style={{
        transform: `scaleX(${loadingTick})`,
      }}
    ></div>
  );
};
