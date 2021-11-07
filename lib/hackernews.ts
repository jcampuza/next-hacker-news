import { PAGINATION_DEFAULT } from './pagination';
import { range } from './math';
import { simpleMemoryCache } from './simplecache';
import { tap } from './promise';
import { isNotNullOrUndefined } from './util';
import { fetchJson } from './http';

const HN_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const createHNUrl = (...segments: (string | number)[]) =>
  `${HN_BASE_URL}/${segments.join('/')}.json`;

export interface IHackerNewsItem {
  by: string;
  descendants: number;
  deleted: boolean;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  url: string;
}

export const getMaxItemId = () => {
  return fetchJson<number>(createHNUrl('maxitem'));
};

const itemCache = simpleMemoryCache<IHackerNewsItem>();

export const getItem = async (id: string | number) => {
  const cached = itemCache.get(id);
  if (cached) {
    return cached;
  }

  const item = await fetchJson<IHackerNewsItem | null>(createHNUrl('item', id)).then(
    tap((value) => {
      if (value) {
        itemCache.set(value.id, value);
      }
    })
  );

  return item;
};

export const getTopStories = async (pagination = PAGINATION_DEFAULT) => {
  const topStoryIds = await fetchJson<number[]>(createHNUrl('topstories'));

  const topStories = (await Promise.all(topStoryIds.slice(0, 20).map((id) => getItem(id))))
    .filter(isNotNullOrUndefined)
    .filter((story) => !story.deleted);

  return topStories;
};

export const getItems = async (pagination = PAGINATION_DEFAULT) => {
  const cursor = pagination.cursor ?? (await getMaxItemId());
  const itemIds = range(cursor - pagination.limit, cursor);

  const items = (await Promise.all(itemIds.map((id) => getItem(id))))
    .filter(isNotNullOrUndefined)
    .filter((item) => !item.deleted);

  if (!items.length) {
    return {
      result: items,
      minItem: -1,
      maxItem: -1,
    };
  }

  return {
    result: items,
    minItem: items[0].id,
    maxItem: itemIds[items.length - 1],
  };
};

export const getStories = async (pagination = PAGINATION_DEFAULT) => {
  const stories: IHackerNewsItem[] = [];
  let cursor = pagination.cursor || (await getMaxItemId());

  while (stories.length < pagination.limit) {
    const res = await getItems({ cursor, limit: pagination.limit });
    if (!res.result.length) {
      break;
    }

    stories.push(
      ...res.result.filter((item) => item.type === 'story').filter((item) => !item.deleted)
    );

    cursor = res.minItem;
  }

  return stories.slice(0, 20);
};
