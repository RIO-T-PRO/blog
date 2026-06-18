import { RolesConfig } from "@/types/auth.js";

export const Roles: RolesConfig = {
  admin: {
    comment: {
      create: true,
      read: true,
      update: ({ user, resource }) =>
        !!resource && "userId" in resource && resource.userId === user.id,
      delete: true,
    },
    article: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    roleApplication: {
      create: false,
      read: true,
      update: true,
      delete: true,
    },
  },

  writer: {
    comment: {
      create: true,
      read: true,
      update: ({ user, resource }) =>
        !!resource && "userId" in resource && resource.userId === user.id,
      delete: false,
    },
    article: {
      create: true,
      read: true,
      update: ({ user, resource }) =>
        !!resource && "authorId" in resource && resource.authorId === user.id,
      delete: ({ user, resource }) =>
        !!resource && "authorId" in resource && resource.authorId === user.id,
    },
    roleApplication: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },

  user: {
    comment: {
      create: true,
      read: true,
      update: ({ user, resource }) =>
        !!resource && "userId" in resource && resource.userId === user.id,
      delete: ({ user, resource }) =>
        !!resource && "userId" in resource && resource.userId === user.id,
    },
    article: {
      read: true,
    },
    roleApplication: {
      create: ({ user, resource }) => {
        const input = resource as { targetRoleName?: string } | undefined;

        return (
          input?.targetRoleName === "writer" && !user.roles.includes("writer")
        );
      },
      read: ({ user, resource }) =>
        !!resource && "userId" in resource && resource.userId === user.id,
      update: false,
      delete: ({ user, resource }) =>
        !!resource && "userId" in resource && resource.userId === user.id,
    },
  },
};
