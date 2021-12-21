import { GraphQLNamedOutputType } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

type Load = (ctx: any, id: string) => any;

interface TypeLoader {
  type: GraphQLNamedOutputType;
  load: Load;
}

const getTypeRegister = () => {
  const typesLoaders = new Map<string, TypeLoader>();

  const registerTypeLoader = (type: GraphQLNamedOutputType, load: Load) => {
    typesLoaders.set(type.name as string, {
      type,
      load,
    });

    return type;
  };

  const { nodeField, nodeInterface } = nodeDefinitions(
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
