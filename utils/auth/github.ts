// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { BadRequestError } from '@/utils/http.ts';

interface GitHubUser {
  login: string;
  email: string;
}

/**
 * Returns the GitHub profile information of the user with the given access token.
 *
 * @example
 * ```ts
 * import { getGitHubUser } from "@/utils/github.ts";
 *
 * const user = await getGitHubUser("<access token>");
 * user.login; // Returns "octocat"
 * user.email; // Returns "octocat@github.com"
 * ```
 */
export async function getGitHubUser(accessToken: string) {
  const resp = await fetch('https://api.github.com/user', {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw new BadRequestError(message);
  }
  return await resp.json() as Promise<GitHubUser>;
}
