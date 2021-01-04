import { createParamDecorator } from 'type-graphql';

import { GraphQLContext } from '~/server/interfaces/Context';

export const Context = () =>
  createParamDecorator<GraphQLContext>(({ context }) => context);
