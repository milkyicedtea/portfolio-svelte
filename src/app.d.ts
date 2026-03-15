// See https://svelte.dev/docs/kit/types#app.d.ts
import type { Subdomain } from "$lib/subdomains"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			subdomain: Subdomain
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
