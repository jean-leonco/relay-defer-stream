import { DataLoaderKey } from '@entria/graphql-mongo-helpers';
import DataLoader from 'dataloader';

type Loader<T> = () => DataLoader<DataLoaderKey, T>;

const loaders: {
  [key: string]: Loader<any>;
} = {};

const registerLoader = <T>(key: string, getLoader: Loader<T>) => {
  loaders[key] = getLoader as any;
};

const getDataloaders = () =>
  Object.keys(loaders).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {},
  ) as any;

export { registerLoader, getDataloaders };
