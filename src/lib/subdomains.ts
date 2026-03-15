export const SUBDOMAINS = ['paste', 'portfolio'] as const
export type Subdomain = typeof SUBDOMAINS[number]

export function isSubdomain(s: string): s is Subdomain {
  return (SUBDOMAINS as ReadonlyArray<string>).includes(s)
}