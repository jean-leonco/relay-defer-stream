import { GraphQLNamedOutputType } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { GraphQLContext } from '../types';

type Load<T> = (ctx: GraphQLContext, id: string) => T;

type TypeLoader<T = unknown> = {
  type: GraphQLNamedOutputType;
  load: Load<T>;
};

const getTypeRegister = () => {
  const typesLoaders = new Map<string, TypeLoader>();

  const registerTypeLoader = <T>(type: GraphQLNamedOutputType, load: Load<T>) => {
    typesLoaders.set(type.name as string, {
      type,
      load,
    });

    return type;
  };

  const { nodeField, nodeInterface } = nodeDefinitions<GraphQLContext>(
    (globalId, ctx) => {
      const { type, id } = fromGlobalId(globalId);

      const typesLoader = typesLoaders.get(type);

      if (!typesLoader) {
        return null;
      }

      return typesLoader.load(ctx, id);
    },
    (obj) => {
      return obj.constructor.name;
    },
  );

  return {
    registerTypeLoader,
    nodeField,
    nodeInterface,
  };
};

const { registerTypeLoader, nodeInterface, nodeField } = getTypeRegister();

export { registerTypeLoader, nodeInterface, nodeField };
