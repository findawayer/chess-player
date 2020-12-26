import { idArg, mutationType, objectType, queryType } from 'nexus';

/* Type: User */
export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.role();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

/* Query: User */
export const UserQuery = queryType({
  definition(t) {
    // t.crud.user();
    // users
    t.crud.users();
    // user
    t.field('user', {
      type: User,
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.user.findUnique({
          where: { id: parseInt(args.id, 10) },
        });
      },
    });
    // me
    t.field('me', {
      type: User,
      nullable: true,
      resolve: (_root, _args, ctx) => {
        if (ctx.currentUser) {
          return null;
        }
        return ctx.prisma.user.findUnique({
          where: { id: parseInt(ctx.currentUser, 10) },
        });
      },
    });
  },
});

/** Mutation: User */
export const UserMutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteOneUser();
  },
});
