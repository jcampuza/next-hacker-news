import { IHackerNewsItem } from '@lib/hackernews';
import Link from 'next/link';

export const HackerNewsItem = ({ item }: { item: IHackerNewsItem }) => {
  return (
    <li key={item.id} className="mb-4 last:mb-0 flex">
      <div className="leading-tight">
        <Link href={item.url ?? '/'}>
          <a className="hover:underline">{item.title}</a>
        </Link>

        <div className="text-gray-700">
          <span>{item.score} points</span>

          <span> by </span>

          <Link href={`https://news.ycombinator.com/user?id=${item.by}`}>
            <a className="hover:underline">{item.by}</a>
          </Link>

          {' | '}
          <span>{item.descendants} Comments</span>
        </div>
      </div>
    </li>
  );
};
