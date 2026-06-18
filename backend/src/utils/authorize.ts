import { Action, AuthContext } from "@/types/auth.js";
import { Roles } from "@/utils/role.js";

type AuthorizeParams<TResource = unknown> = {
  user: {
    id: string;
    roles: string[];
  };
  resourceName: string;
  action: Action;
  resource?: TResource;
};

const evaluateRule = async <TResource>(
  rule: boolean | ((ctx: AuthContext<TResource>) => boolean | Promise<boolean>),
  ctx: AuthContext<TResource>,
) => {
  if (typeof rule === "boolean") return rule;
  return await rule(ctx);
};

export const authorize = async <TResource = unknown>({
  user,
  resourceName,
  action,
  resource,
}: AuthorizeParams<TResource>) => {
  for (const roleName of user.roles) {
    const roleRules = Roles[roleName];
    if (!roleRules) continue;

    const resourceRules = roleRules[resourceName];
    if (!resourceRules) continue;

    const rule = resourceRules[action];
    if (rule === undefined) continue;

    const allowed = await evaluateRule(rule, {
      user,
      resource,
    });

    if (allowed) return true;
  }

  return false;
};
