import type { Plugin } from '$fresh/server.ts';
import {
  createGitHubOAuthConfig,
  handleCallback,
  signIn,
  signOut,
} from 'kv_oauth/mod.ts';
import {
  createUser,
  getUserByLogin,
  type iUser,
  updateUserSession,
} from '@/utils/db/user.ts';
import { createTag } from '@/utils/db/tag.ts';
import { ulid } from 'ulid';
// import { isStripeEnabled, stripe } from "@/utils/stripe.ts";
import { getGitHubUser } from '@/utils/auth/github.ts';

export default {
  name: 'kv-oauth',
  routes: [
    {
      path: '/signin/github',
      handler: async (req) => await signIn(req, createGitHubOAuthConfig()),
    },
    {
      path: '/callback',
      handler: async (req) => {
        const { response, tokens, sessionId } = await handleCallback(
          req,
          createGitHubOAuthConfig(),
        );

        const githubUser = await getGitHubUser(tokens.accessToken);
        const user = await getUserByLogin(githubUser.login);

        if (user === null) {
          const user: iUser = {
            id: ulid(),
            login: githubUser.login,
            sessionId,
            isSubscribed: false,
            createdAtUTC: new Date().toUTCString(),
          };
          await createUser(user);
          await createTag({ id: ulid(), name: 'event' }, user.id);
          await createTag({ id: ulid(), name: 'task' }, user.id);
          await createTag({ id: ulid(), name: 'done' }, user.id);
          await createTag({ id: ulid(), name: 'important' }, user.id);
          await createTag({ id: ulid(), name: 'question' }, user.id);
          await createTag({ id: ulid(), name: 'link' }, user.id);
        } else {
          await updateUserSession(user, sessionId);
        }

        return response;
      },
    },
    {
      path: '/signout',
      handler: signOut,
    },
  ],
} as Plugin;
