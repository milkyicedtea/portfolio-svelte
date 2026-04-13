<script lang="ts">
  import { onMount } from "svelte"
  import Icon from "@iconify/svelte"
  import type { GithubRepo } from "$lib/config"
  import "$css/projects_section.css"

  let { projects }: { projects: Array<GithubRepo> } = $props()

  let track: HTMLElement
  let activePage = $state(0)
  let perPage = $state(2)

  const pageCount = $derived(Math.ceil(projects.length / perPage))

  // ── Card width + gap = one "step" in scrollLeft ───────────────────────────
  // We read this from the DOM so padding/gap never need to be hardcoded.
  function getStep(): number {
    const card = track?.querySelector<HTMLElement>(".project-card-wrap")
    if (!card) return 0
    const gap = parseFloat(getComputedStyle(track).gap) || 0
    return card.offsetWidth + gap
  }

  // ── Navigate ──────────────────────────────────────────────────────────────
  let programmatic = false
  let programTimer: ReturnType<typeof setTimeout>
  let scrollEndTimer: ReturnType<typeof setTimeout>

  function getActivePageFromScroll(): number {
    if (!track) return 0
    const step = getStep()
    if (!step) return 0
    const cardIdx = Math.round(track.scrollLeft / step)
    const page = Math.round(cardIdx / perPage)
    return Math.min(Math.max(page, 0), pageCount - 1)
  }

  function scrollToPage(page: number) {
    if (!track) return
    programmatic = true
    clearTimeout(programTimer)
    track.scrollTo({ left: page * perPage * getStep(), behavior: "smooth" })
    activePage = page
    // Set a long enough timeout for scroll to complete, but also use scrollend event
    programTimer = setTimeout(() => { programmatic = false }, 1200)
  }

  const prev = () => { if (activePage > 0) scrollToPage(activePage - 1) }
  const next = () => { if (activePage < pageCount - 1) scrollToPage(activePage + 1) }

  // ── Sync dot after user drag/swipe ────────────────────────────────────────
  let scrollTimer: ReturnType<typeof setTimeout>
  function onScroll() {
    if (programmatic) return
    clearTimeout(scrollTimer)
    clearTimeout(scrollEndTimer)
    scrollTimer = setTimeout(() => {
      activePage = getActivePageFromScroll()
    }, 80)
    // Also set a final update after scroll ends
    scrollEndTimer = setTimeout(() => {
      activePage = getActivePageFromScroll()
    }, 150)
  }

  // ── Responsive perPage ────────────────────────────────────────────────────
  onMount(() => {
    const mq = window.matchMedia("(max-width: 600px)")
    const update = () => { perPage = mq.matches ? 1 : 2 }
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  })

  // ── Mouse drag ────────────────────────────────────────────────────────────
  let dragging = false
  let dragStartX = 0
  let scrollStartX = 0

  const onMouseDown = (e: MouseEvent) => {
    dragging = true
    dragStartX = e.clientX
    scrollStartX = track.scrollLeft
    track.style.cursor = "grabbing"
    track.style.userSelect = "none"
  }
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return
    track.scrollLeft = scrollStartX - (e.clientX - dragStartX)
  }
  const onMouseUp = () => {
    dragging = false
    track.style.cursor = "grab"
    track.style.userSelect = ""
  }
</script>

<section class="projects" id="projects">
  <div class="section-header">
    <span class="section-label">projects</span>
    <div class="section-line"></div>
    <div class="swiper-arrows">
      <button class="swiper-btn" onclick={prev} disabled={activePage === 0} aria-label="Previous">
        <Icon icon="fa7-solid:chevron-left" width="11px" />
      </button>
      <button class="swiper-btn" onclick={next} disabled={activePage === pageCount - 1} aria-label="Next">
        <Icon icon="fa7-solid:chevron-right" width="11px" />
      </button>
    </div>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="swiper-track"
    bind:this={track}
    onscroll={onScroll}
    onmousedown={onMouseDown}
    onmousemove={onMouseMove}
    onmouseup={onMouseUp}
    onmouseleave={onMouseUp}
    role="region"
    aria-label="Projects"
    style="cursor: grab"
  >
    {#each projects as project (project.full_name)}
      <div class="project-card-wrap">
        <a href={project.html_url} class="project-card" rel="external" target="_blank">
          <div class="project-name">
            {project.name}
            <span class="project-stars">
              <Icon icon="fa7-regular:star" width="14px" /> {project.stargazers_count}
            </span>
          </div>
          <p class="project-desc">{project.description ?? ""}</p>
          <div class="project-tags">
            {#if project.language}
              <span class="ptag">{project.language}</span>
            {/if}
            {#each project.topics as tag (tag)}
              <span class="ptag">{tag}</span>
            {/each}
          </div>
        </a>
      </div>
    {/each}
  </div>

  <div class="swiper-dots" aria-hidden="true">
    {#each { length: pageCount } as _, i (i)}
      <button
        class="dot {i === activePage ? 'dot-active' : ''}"
        onclick={() => scrollToPage(i)}
        aria-label="Go to page {i + 1}"
      ></button>
    {/each}
  </div>
</section>