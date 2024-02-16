import { kv } from '@/utils/db/index.ts';

export type AuthProviders = 'GitHub' | 'Google' | 'Auth0';

export interface iUser {
  id: string;
  login: string;
  sessionId: string;
  isSubscribed: boolean;
  stripeCustomerId?: string;
}

/**
 * Creates a new user in the database. Throws if the user or user session
 * already exists.
 *
 * @example
 * ```ts
 * import { createUser } from "@/utils/db.ts";
 *
 * await createUser({
 *   login: "john",
 *   sessionId: crypto.randomUUID(),
 *   isSubscribed: false,
 * });
 * ```
 */
export async function createUser(user: iUser) {
  const usersKey = ['users', user.id];
  const usersBySessionKey = ['users_by_session', user.sessionId];

  console.log('created user');

  const atomicOp = kv.atomic()
    .check({ key: usersKey, versionstamp: null })
    .check({ key: usersBySessionKey, versionstamp: null })
    .set(usersKey, user)
    .set(usersBySessionKey, user);

  if (user.stripeCustomerId !== undefined) {
    const usersByStripeCustomerKey = [
      'users_by_stripe_customer',
      user.stripeCustomerId,
    ];
    atomicOp
      .check({ key: usersByStripeCustomerKey, versionstamp: null })
      .set(usersByStripeCustomerKey, user);
  }

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error('Failed to create user');
}

/**
 * Creates a user in the database, overwriting any previous data.
 *
 * @example
 * ```ts
 * import { updateUser } from "@/utils/db.ts";
 *
 * await updateUser({
 *   login: "john",
 *   sessionId: crypto.randomUUID(),
 *   isSubscribed: false,
 * });
 * ```
 */
export async function updateUser(user: iUser) {
  const usersKey = ['users', user.id];
  const usersBySessionKey = ['users_by_session', user.sessionId];

  const atomicOp = kv.atomic()
    .set(usersKey, user)
    .set(usersBySessionKey, user);

  if (user.stripeCustomerId !== undefined) {
    const usersByStripeCustomerKey = [
      'users_by_stripe_customer',
      user.stripeCustomerId,
    ];
    atomicOp
      .set(usersByStripeCustomerKey, user);
  }

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error('Failed to update user');
}

/**
 * Updates the session ID of a given user in the database.
 *
 * @example
 * ```ts
 * import { updateUserSession } from "@/utils/db.ts";
 *
 * await updateUserSession({
 *   login: "john",
 *   sessionId: "xxx",
 *   isSubscribed: false,
 * }, "yyy");
 * ```
 */
export async function updateUserSession(user: iUser, sessionId: string) {
  const userKey = ['users', user.id];
  const oldUserBySessionKey = ['users_by_session', user.sessionId];
  const newUserBySessionKey = ['users_by_session', sessionId];
  const newUser: iUser = { ...user, sessionId };

  const atomicOp = kv.atomic()
    .set(userKey, newUser)
    .delete(oldUserBySessionKey)
    .check({ key: newUserBySessionKey, versionstamp: null })
    .set(newUserBySessionKey, newUser);

  // if (user.stripeCustomerId !== undefined) {
  //   const usersByStripeCustomerKey = [
  //     'users_by_stripe_customer',
  //     user.stripeCustomerId,
  //   ];
  //   atomicOp
  //     .set(usersByStripeCustomerKey, user);
  // }

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error('Failed to update user session');
}

/**
 * Gets the user with the given login from the database.
 *
 * @example
 * ```ts
 * import { getUserByLogin } from "@/utils/db.ts";
 *
 * const user = await getUserByLogin("jack");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.isSubscribed; // Returns false
 * ```
 */
export async function getUserByLogin(login: string) {
  const users = kv.list<iUser>({ prefix: ['users'] });
  for await (const user of users) {
    if (user.value.login === login) return user.value;
  }
  return null;
}

/**
 * Gets the user with the given session ID from the database. The first attempt
 * is done with eventual consistency. If that returns `null`, the second
 * attempt is done with strong consistency. This is done for performance
 * reasons, as this function is called in every route request for checking
 * whether the session user is signed in.
 *
 * @example
 * ```ts
 * import { getUserBySession } from "@/utils/db.ts";
 *
 * const user = await getUserBySession("xxx");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.isSubscribed; // Returns false
 * ```
 */
export async function getUserBySession(sessionId: string) {
  const key = ['users_by_session', sessionId];
  const eventualRes = await kv.get<iUser>(key, {
    consistency: 'eventual',
  });
  if (eventualRes.value !== null) return eventualRes.value;
  const res = await kv.get<iUser>(key);
  return res.value;
}
