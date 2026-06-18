export type Action = "create" | "read" | "update" | "delete";

export type AuthUser = {
  id: string;
  roles: string[];
};

export type AuthContext<TResource = unknown> = {
  user: AuthUser;
  resource?: TResource;
};

export type Rule<TResource = unknown> =
  | boolean
  | ((ctx: AuthContext<TResource>) => boolean | Promise<boolean>);

export type ResourceRules<TResource = unknown> = Partial<
  Record<Action, Rule<TResource>>
>;

export type RolesConfig = Record<string, Record<string, ResourceRules<any>>>;
