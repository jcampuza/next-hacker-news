import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

export const useRouteChange = () => {
  const { events } = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setTrue = () => setLoading(true);
    const setFalse = () => setLoading(false);

    events.on('routeChangeStart', setTrue);
    events.on('routeChangeComplete', setFalse);
    events.on('routeChangeError', setFalse);

    return () => {
      events.off('routeChangeStart', setTrue);
      events.off('routeChangeComplete', setFalse);
      events.off('routeChangeError', setFalse);
    };
  }, [events]);

  return loading;
};
