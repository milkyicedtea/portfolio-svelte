import type { PageServerLoad } from './$types'
import {fetchProjects} from "$lib/server/github"


export const load: PageServerLoad = async (
  { fetch }
) => fetchProjects(fetch)


