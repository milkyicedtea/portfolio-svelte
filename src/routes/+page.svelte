<script lang="ts">
  import { fade } from "svelte/transition"
  import Icon from "@iconify/svelte"
  import ThemeSwitch from '$lib/components/ThemeSwitch.svelte'
  import SegmentedControl from '$lib/components/SegmentedControl.svelte'
  import Footer from "$lib/components/Footer.svelte"
  import { onMount } from "svelte"
  import { interests, socials, techs } from "$lib/config"
  import type { PageData } from './$types'
  import '$css/main_page.css'

  let { data }: { data: PageData } = $props()

  let currentBp = $state("xs")

  onMount(() => {
    if (!import.meta.env.DEV) return

    const queries = [
      { name: "xs",  mq: window.matchMedia("(max-width: 639.9px)") },
      { name: "sm",  mq: window.matchMedia("(min-width: 640px) and (max-width: 767.9px)") },
      { name: "md",  mq: window.matchMedia("(min-width: 768px) and (max-width: 1023.9px)") },
      { name: "lg",  mq: window.matchMedia("(min-width: 1024px) and (max-width: 1279.9px)") },
      { name: "xl",  mq: window.matchMedia("(min-width: 1280px) and (max-width: 1535.9px)") },
      { name: "2xl", mq: window.matchMedia("(min-width: 1536px)") },
    ]

    function update() {
      currentBp = queries.find(q => q.mq.matches)?.name ?? "xs"
    }

    queries.forEach(q => q.mq.addEventListener("change", update))
    update()
    return () => queries.forEach(q => q.mq.removeEventListener("change", update))
  })

  const techCategories = ['backend', 'frontend', 'native', 'databases', 'linux'] as const
  let selectedCategory = $state<typeof techCategories[number]>('backend')

  const filteredTechs = $derived(techs.filter(t => t.category.includes(selectedCategory)))

  function getAge(birthDate: Date): number {
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

    if (!hasHadBirthdayThisYear) {
      age--
    }

    return age
  }

  const age = getAge(new Date("2005-12-05"))

  function scrollTo(e: MouseEvent, id: string) {
    e.preventDefault()
    const element = document.querySelector(id)
    if (!element) return

    const top = element.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: "smooth" })
  }
</script>

<div class="site">
  <!-- bg decoration -->
  <div class="bg-orbs" aria-hidden="true">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <!-- header -->
  <header>
    <div class="header-left">
      <div class="hero-badge">
        <span></span>
        available for work
      </div>
      {#if import.meta.env.DEV}
        <span class="bp-badge">{currentBp}</span>
      {/if}
    </div>

    <nav>
      <a href="#about" onclick={(e) => scrollTo(e, '#about')}>about</a>
      <a href="#projects" onclick={(e) => scrollTo(e, '#projects')}>projects</a>
      <a href="#contact" onclick={(e) => scrollTo(e, '#contact')}>contact</a>
      <ThemeSwitch />
    </nav>
  </header>

  <!-- main content -->
  <main>

    <!-- hero -->
    <section class="hero">
      <h1>hi, i'm <em>Alessandro</em>.<br/>i build things for the web.</h1>
      <p class="hero-desc">
        I'm a {age}yo self-taught developer based in Italy 🇮🇹. I enjoy building simple but fast open-core tools and applications for the web.
      </p>
      <div class="hero-links">
        <a href="#projects" onclick={(e) => scrollTo(e, '#projects')} class="btn btn-primary">take a look at my work <Icon icon="fa7-solid:arrow-down"/></a>
        <a href="#contact" onclick={(e) => scrollTo(e, '#contact')} class="btn btn-ghost">get in touch</a>
        <a href="https://github.com/milkyicedtea" target="_blank" rel="noopener" class="btn btn-ghost">github ↗</a>
      </div>
    </section>

    <!-- about -->
    <section class="about" id="about" transition:fade>
      <div class="section-header">
        <span class="section-label">about</span>
        <div class="section-line"></div>
      </div>
      <div class="about-grid">
        <div class="about-card">
          <div class="about-card-top">
            <h3><Icon icon="fa7-solid:contact-card" width="20"/>about me</h3>
          </div>
          <p>
            a developer who cares deeply about performance, privacy, and software that puts users first. when i'm not coding i'm probably playing some obscure rhythm game or fighting with AI.
          </p>
        </div>
        <div class="about-card">
          <div class="about-card-top">
            <h3><Icon icon="fa7-solid:wrench" width="20"/>tech stack</h3>
            <SegmentedControl
              segments={[...techCategories]}
              bind:selected={selectedCategory}
              compact={['xs', 'sm', 'md'].includes(currentBp)}
            />
          </div>
          <ul>
            {#each filteredTechs as tech (tech.name)}
              {#if tech.link}
                <a href={tech.link} rel="external" target="_blank">
                  <span class="tag"><img src={tech.icon} alt="" width="16"/>{tech.name}</span>
                </a>
              {:else}
                <span class="tag"><img src={tech.icon} alt="" width="16"/>{tech.name}</span>
              {/if}
            {/each}
          </ul>
        </div>
        <div class="about-card">
          <div class="about-card-top">
            <h3><Icon icon="fa7-solid:lightbulb" width="20"/>interests</h3>
          </div>
          <p>{interests.join(' · ')}</p>
        </div>
        <div class="about-card">
          <div class="about-card-top">
            <h3><Icon icon="fa7-solid:code-commit" width="20"/>latest activity</h3>
          </div>
            {#if data.latestCommit}
              <a href={data.latestCommit.url} target="_blank" rel="noopener external" class="latest-commit">
                <div class="commit-top">
                  <Icon icon="fa7-solid:code-branch" width="12" class="commit-branch-icon"/>
                  <span class="commit-branch">main</span>
                  <code class="commit-sha">{data.latestCommit.sha}</code>
                </div>
                <code class="commit-message">{data.latestCommit.message}</code>
                <div class="commit-meta">
                  <span class="commit-repo">{data.latestCommit.repoFull}</span>
                  <span class="commit-date">{data.latestCommit.date}</span>
                </div>
              </a>
            {:else}
              <p>no recent activity found.</p>
            {/if}
        </div>
      </div>
    </section>

    <!-- projects -->
    <section class="projects" id="projects">
      <div class="section-header">
        <span class="section-label">projects</span>
        <div class="section-line"></div>
      </div>
      <div class="projects-grid">
        {#each data.projects as project (project.full_name)}
          <a href={project.html_url} class="project-card" rel="external" target="_blank">
            <div class="project-name">
              {project.name}
              <span class="project-stars"><Icon icon="fa7-regular:star" width="14px"/> {project.stargazers_count}</span>
            </div>
            <p class="project-desc">{project.description ?? ''}</p>
            <div class="project-tags">
              {#if project.language}
                <span class="ptag">{project.language}</span>
              {/if}
              {#each project.topics as tag (tag)}
                <span class="ptag">{tag}</span>
              {/each}
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- contact -->
    <section class="socials" id="contact">
      <div class="section-header">
        <span class="section-label">find me</span>
        <div class="section-line"></div>
      </div>
      <div class="socials-list">
        {#each socials as social (social)}
          <a href={social.url} class="social-item" target="_blank" rel="noopener external">
            <Icon icon={social.icon} width="24" class="social-icon"/>
            <span class="social-name">{social.name}</span>
            <span class="social-label">{social.label}</span>
            <Icon icon="fa7-solid:arrow-right" class="social-arrow"/>
          </a>
        {/each}
      </div>
    </section>

  </main>

  <!-- footer -->
  <Footer/>
</div>