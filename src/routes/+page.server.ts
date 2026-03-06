import type { PageServerLoad } from './$types'
import { repos, type GithubRepo } from '$lib/config'
import { env } from '$env/dynamic/private'

export const load: PageServerLoad = async ({ fetch }) => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${env.GITHUB_TOKEN}` } : {}),
  }

  const results = await Promise.allSettled(
    repos.map(repo =>
      fetch(`https://api.github.com/repos/${repo}`, { headers })
        .then(r => r.ok ? r.json() as Promise<GithubRepo> : Promise.reject(r.status))
    )
  )

  const projects = results
    .filter((r): r is PromiseFulfilledResult<GithubRepo> => r.status === 'fulfilled')
    .map(r => r.value)

  return { projects }
}


