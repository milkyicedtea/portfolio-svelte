import { Octokit } from '@octokit/rest'
import type { GithubRepo } from '$lib/config'
import { repos  } from '$lib/config'
import { env } from '$env/dynamic/private'

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN || undefined,
})

type PushEvent = {
  type: 'PushEvent'
  payload: {
    head: string
  }
  repo: {
    name: string
  }
  created_at: string
}

const isObjectRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null
)

const isPushEvent = (event: unknown): event is PushEvent => {
  if (!isObjectRecord(event) || event.type !== 'PushEvent') return false

  const payload = event.payload
  const repo = event.repo
  const createdAt = event.created_at

  if (!isObjectRecord(payload) || !isObjectRecord(repo)) return false

  return (
    typeof payload.head === 'string'
    && typeof repo.name === 'string'
    && typeof createdAt === 'string'
  )
}

export type LatestCommit = {
  repo: string
  repoFull: string
  message: string
  sha: string
  url: string
  date: string
}

export async function fetchProjects(): Promise<Array<GithubRepo>> {
  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      const [owner, repoName] = repo.split('/')

      const res = await octokit.repos.get({
        owner,
        repo: repoName
      })
      return res.data as GithubRepo
    })
  )

  return results
    .filter((r): r is PromiseFulfilledResult<GithubRepo> => r.status === 'fulfilled')
    .map(r => r.value)
}

export async function fetchLatestCommit(): Promise<LatestCommit | null> {
  let events: Array<unknown>

  try {
    const response = await octokit.activity.listPublicEventsForUser({
      username: 'milkyicedtea',
      per_page: 30
    })
    events = response.data
  } catch {
    return null
  }

  const pushEvent = events.find(isPushEvent)
  if (!pushEvent) return null

  const sha = pushEvent.payload.head
  const repoFull = pushEvent.repo.name

  const [owner, repo] = repoFull.split('/')
  if (!owner || !repo) return null

  const commitResponse = await octokit.repos.getCommit({
    owner,
    repo,
    ref: sha,
  })
  const message = commitResponse.data.commit.message.split('\n')[0] ?? ''


  return {
    repo,
    repoFull,
    message,
    sha: sha.slice(0, 7),
    url: `https://github.com/${repoFull}/commit/${sha}`,
    date: new Date(pushEvent.created_at).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }
}