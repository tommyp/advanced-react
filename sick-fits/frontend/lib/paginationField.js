/* eslint-disable no-plusplus */
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });

      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have any items, we must go to the network
        return false;
      }

      // if there are items, just return them from the cache and we don't need to go to the network

      // if there are items AND
      // there aren't enough items to satisfy how many were request
      // AND if we're on the last page

      if (items.length) {
        return items;
      }

      return false;
      // first thing it does it asks the read function for those items

      // we can either do one of two things

      // 1st: return the items from the cache

      // 2nd: return false from here, which causes a network request
    },
    merge(existing, incoming, { args }) {
      // this runs when the apollo client comes back from the network with our products
      const { skip, first } = args;

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
