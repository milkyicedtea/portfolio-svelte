import type { Handle } from "@sveltejs/kit"
import { isSubdomain } from "$lib/subdomains"

export const handle: Handle = async ({ event, resolve }) => {
  const host = event.request.headers.get('host') ?? ''
  const raw = host.split('.')[0]
  event.locals.subdomain = isSubdomain(raw) ? raw : 'portfolio'

  return resolve(event)
}