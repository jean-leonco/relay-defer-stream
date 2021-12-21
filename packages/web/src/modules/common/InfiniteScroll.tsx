import { Fragment, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import Text from './Text';

export type RenderItemProps<TEdge> = {
  edge: TEdge;
};

export type RenderItemFn<TEdge> = (props: RenderItemProps<TEdge>) => ReactElement;

type InfiniteScrollProps<TEdge> = {
  data: TEdge[] | readonly TEdge[];
  renderItem: RenderItemFn<TEdge>;
  keyExtrator: (item: TEdge, index: number) => string;
  onEndReached?: () => void;
  isLoading: boolean;
};

function InfiniteScroll<TEdge>({ data, renderItem, keyExtrator, onEndReached, isLoading }: InfiniteScrollProps<TEdge>) {
  const [shouldCallOnEndReached, setShouldCallOnEndReached] = useState(false);

  const observerRef = useRef<HTMLSpanElement>(null);

  const renderCard = useCallback(
    (edge: TEdge, index: number) => {
      const item = renderItem({ edge });

      return <Fragment key={keyExtrator(edge, index)}>{item}</Fragment>;
    },
    [keyExtrator, renderItem],
  );

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShouldCallOnEndReached(true);
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  }, []);

  useEffect(() => {
    if (shouldCallOnEndReached && onEndReached) {
      onEndReached();
      setShouldCallOnEndReached(false);
    }
  }, [onEndReached, shouldCallOnEndReached]);

  return (
    <>
      {data.map(renderCard)}
      <Text ref={observerRef}>{isLoading ? 'Loading...' : ''}</Text>
    </>
  );
}

export default InfiniteScroll;
