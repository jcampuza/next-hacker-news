export interface Pagination {
  cursor?: number;
  limit: number;
}

export const PAGINATION_DEFAULT: Pagination = {
  limit: 20,
};
