import React, { useCallback, useMemo, useRef } from 'react';

import Text from './Text';

interface RenderItemProps {
  edge: any;
  index: number;
  ref: ((node: Element) => void) | null;
}

interface InfiniteScrollProps {
  data: any[];
  renderItem(props: RenderItemProps): JSX.Element;
  loadNext(first: number): void;
  hasNext: boolean;
  isLoading: boolean;
}

const InfiniteScroll = ({ data, renderItem, loadNext, hasNext, isLoading }: InfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback(
    (node: Element) => {
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
    (edge: any, index: number) => {
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
};

export default InfiniteScroll;
