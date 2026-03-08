import { repos, type GithubRepo } from '$lib/config'
import { env } from '$env/dynamic/private'

const githubHeaders: HeadersInit = {
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${env.GITHUB_TOKEN}` } : {}),
}

export async function fetchProjects(fetchFn: typeof fetch): Promise<Array<GithubRepo>> {
  const results = await Promise.allSettled(
    repos.map(repo =>
      fetchFn(`https://api.github.com/repos/${repo}`, { headers: githubHeaders })
        .then(r => r.ok ? r.json() as Promise<GithubRepo> : Promise.reject(r.status))
    )
  )

  return results
    .filter((r): r is PromiseFulfilledResult<GithubRepo> => r.status === 'fulfilled')
    .map(r => r.value)
}

export async function fetchLatestCommit(fetchFn: typeof fetch) {
  const res = await fetchFn(
    'https://api.github.com/users/milkyicedtea/events/public?per_page=30',
    { headers: githubHeaders }
  )

  if (!res.ok) return null

  const events = await res.json()
  const pushEvent = events.find((e: any) => e.type === 'PushEvent')
  if (!pushEvent) return null

  const sha = pushEvent.payload.head
  const repoFull = pushEvent.repo.name

  // optionally fetch the commit message
  const commitRes = await fetchFn(
    `https://api.github.com/repos/${repoFull}/commits/${sha}`,
    { headers: githubHeaders }
  )
  const commitData = commitRes.ok ? await commitRes.json() : null

  return {
    repo: repoFull.split('/')[1],
    repoFull,
    message: commitData?.commit?.message?.split('\n')[0] ?? '',
    sha: sha.slice(0, 7),
    url: `https://github.com/${repoFull}/commit/${sha}`,
    date: new Date(pushEvent.created_at).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }
}