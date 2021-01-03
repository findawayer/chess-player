import { createParamDecorator } from 'type-graphql';

import { GraphQLContext } from '../interfaces/Context';

export const Context = () =>
  createParamDecorator<GraphQLContext>(({ context }) => context);
