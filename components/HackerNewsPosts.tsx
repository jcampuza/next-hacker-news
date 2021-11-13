import { IHackerNewsItem } from '@lib/hackernews';
import { Container } from './Container';
import { HackerNewsItem } from './HackerNewsItem';

export const HackerNewsPosts: React.FC<{ items: IHackerNewsItem[] }> = (props) => {
  return (
    <main className="">
      <Container>
        <div className="bg-gray-100">
          <ul className="bg-gray-100 p-2">
            {props.items.map((item) => {
              return <HackerNewsItem item={item} key={item.id} />;
            })}
          </ul>
        </div>
      </Container>
    </main>
  );
};
