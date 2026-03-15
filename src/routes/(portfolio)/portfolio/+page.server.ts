import type { PageServerLoad } from './$types'
import {fetchLatestCommit, fetchProjects} from "$lib/server/github"


export const load: PageServerLoad = async (
  { fetch }
) => {
  const [projects, latestCommit] = await Promise.all([
    fetchProjects(fetch),
    fetchLatestCommit(fetch)
  ])

  return {
    projects,
    latestCommit
  }
}


