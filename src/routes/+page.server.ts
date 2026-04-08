import type { PageServerLoad } from './$types'
import { fetchLatestCommit, fetchProjects } from "$lib/server/github"


export const load: PageServerLoad = async () => {
  const [projects, latestCommit] = await Promise.all([
    fetchProjects(),
    fetchLatestCommit()
  ])

  return {
    projects,
    latestCommit
  }
}


