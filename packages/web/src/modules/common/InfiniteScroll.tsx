import React, { ForwardedRef, ReactElement, useCallback, useMemo, useRef } from 'react';

import Text from './Text';

export type RenderItemProps<TEdge> = {
  edge: TEdge;
  index: number;
  ref: ForwardedRef<Element> | null;
};

export type RenderItemFn<TEdge> = (props: RenderItemProps<TEdge>) => ReactElement;

type InfiniteScrollProps<TEdge> = {
  data: TEdge[] | readonly TEdge[];
  renderItem: RenderItemFn<TEdge>;
  loadNext(first: number): void;
  hasNext: boolean;
  isLoading: boolean;
};

function InfiniteScroll<TEdge>({ data, renderItem, loadNext, hasNext, isLoading }: InfiniteScrollProps<TEdge>) {
  const observer = useRef<IntersectionObserver>();

  const lastItemRef: ForwardedRef<Element> = useCallback(
    (node: Element | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node) {
        const options: IntersectionObserverInit = {
          rootMargin: '0px',
          threshold: 0.6,
        };

        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNext && !isLoading) {
            loadNext(10);
          }
        }, options);

        observer.current.observe(node);
      }
    },
    [hasNext, isLoading, loadNext],
  );

  const renderCard = useCallback(
    (edge: TEdge, index: number) => {
      const node = renderItem({
        edge,
        index,
        ref: data.length === index + 1 ? lastItemRef : null,
      });

      return node;
    },
    [data.length, renderItem, lastItemRef],
  );

  const cards = useMemo(() => data.map(renderCard), [data, renderCard]);

  return (
    <>
      {cards}
      {isLoading && <Text>Loading...</Text>}
    </>
  );
}

export default InfiniteScroll;
