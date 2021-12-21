import { DataLoaderKey } from '@entria/graphql-mongo-helpers';
import DataLoader from 'dataloader';

type Loader<T> = () => DataLoader<DataLoaderKey, T>;

const loaders: {
  [key: string]: Loader<unknown>;
} = {};

const registerLoader = <T>(key: string, getLoader: Loader<T>): void => {
  loaders[key] = getLoader;
};

const getDataloaders = (): Record<string, DataLoader<DataLoaderKey, unknown>> => {
  return Object.keys(loaders).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {},
  );
};

export { registerLoader, getDataloaders };
