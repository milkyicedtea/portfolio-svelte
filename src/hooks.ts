import type { Reroute } from "@sveltejs/kit"
import { isSubdomain } from "$lib/subdomains"

export const reroute: Reroute = ({ url }) => {
  const raw = url.hostname.split('.')[0]
  const subdomain = isSubdomain(raw) ? raw : 'portfolio'

  return `/${subdomain}${url.pathname}`
}