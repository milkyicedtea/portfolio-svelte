interface Tech {
  name: string
  icon: string
  category: Array<'backend' | 'frontend' | 'native' | 'databases' | 'linux'>
  link?: `https://${string}`
}

export interface GithubRepo {
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  topics: Array<string>
  language: string | null
}

interface Social {
  name: string
  icon: string
  url: `https://${string}` | `mailto:${string}`
  label: string
}

export const techs: Array<Tech> = [
  {
    name: "Android",
    icon: "/android.svg",
    category: ["native"],
    link: "https://android.com"
  },
  {
    name: "Arch",
    icon: "/arch.svg",
    category: ["linux"],
    link: "https://archlinux.org"
  },
  {
    name: "Bash",
    icon: "/bash.svg",
    category: ["linux"],
    link: "https://www.gnu.org/savannah-checkouts/gnu/bash/bash.html"
  },
  {
    name: "Bun",
    icon: "/bun.svg",
    category: ["backend"],
    link: "https://bun.sh"
  },
  {
    name: "Caddy",
    icon: "/caddy.svg",
    category: ["linux", "backend"],
    link: "https://caddyserver.com"
  },
  {
    name: "CapacitorJS",
    icon: "/capacitorjs.svg",
    category: ["native", "frontend"],
    link: "https://capacitorjs.com"
  },
  {
    name: "Debian",
    icon: "/debian.svg",
    category: ["linux"],
    link: "https://debian.org"
  },
  {
    name: "Docker",
    icon: "/docker.svg",
    category: ["linux", "backend"],
    link: "https://docker.com"
  },
  {
    name: "DragonflyDB",
    icon: "/dragonflydb.svg",
    category: ["databases"],
    link: "https://dragonflydb.io"
  },
  {
    name: "Flutter",
    icon: "/flutter.svg",
    category: ["native"],
    link: "https://flutter.dev"
  },
  {
    name: "Git",
    icon: "/git.svg",
    category: ["linux"],
    link: "https://git-scm.com"
  },
  {
    name: "Go",
    icon: "/go.svg",
    category: ["backend"],
    link: "https://go.dev"
  },
  {
    name: "Kotlin",
    icon: "/kotlin.svg",
    category: ["native"],
    link: "https://kotlinlang.org"
  },
  {
    name: "NodeJS",
    icon: "/nodejs.svg",
    category: ["backend", "frontend"],
    link: "https://nodejs.org"
  },
  {
    name: "PostgreSQL",
    icon: "/postgresql.svg",
    category: ["databases"],
    link: "https://postgresql.org"
  },
  {
    name: "Python",
    icon: "/python.svg",
    category: ["backend"],
    link: "https://python.org"
  },
  {
    name: "React",
    icon: "/react.svg",
    category: ["frontend"],
    link: "https://react.dev"
  },
  {
    name: "Redis",
    icon: "/redis.svg",
    category: ["databases"],
    link: "https://redis.io"
  },
  {
    name: "Rust",
    icon: "/rust.svg",
    category: ["backend", "native"],
    link: "https://rust-lang.org"
  },
  {
    name: "SQlite",
    icon: "/sqlite.svg",
    category: ["databases"],
    link: "https://sqlite.org"
  },
  {
    name: "Svelte",
    icon: "/svelte.svg",
    category: ["frontend"],
    link: "https://svelte.dev"
  },
  {
    name: "TailwindCSS",
    icon: "/tailwindcss.svg",
    category: ["frontend"],
    link: "https://tailwindcss.com"
  },
  {
    name: "Typescript",
    icon: "/typescript.svg",
    category: ["backend", "frontend"],
    link: "https://typescriptlang.org"
  },
  {
    name: "Valkey",
    icon: "/valkey.svg",
    category: ["databases"],
    link: "https://valkey.io"
  }
]

export const repos: Array<`${string}/${string}`> = [
  "milkyicedtea/SecretKeeper",
  "milkyicedtea/proxy-rs",
  "milkyicedtea/BlackFiles",
  "milkyicedtea/mldy",
]

export const interests: Array<string> = [
  "programming", "self hosting", "open source", "gaming", "japanese culture", "birds"
]

export const socials: Array<Social> = [
  { name: "github", icon: "fa7-brands:github", url: "https://github.com/milkyicedtea", label: "github.com/milkyicedtea" },
  { name: "discord", icon: "fa7-brands:discord", url: "https://discord.com/users/495606196628226058", label: "cheek.biter" },
  { name: "telegram", icon: "fa7-brands:telegram", url: "https://t.me/cheekbiter", label: "@cheekbiter" },
  // { name: "email", icon: "◉", url: "mailto:you@example.com", label: "you@example.com" },
]
