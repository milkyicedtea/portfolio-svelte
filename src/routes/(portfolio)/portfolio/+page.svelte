<script lang="ts">
  import { onMount } from "svelte"
  import AboutSection from "$lib/components/portfolio/AboutSection.svelte"
  import ContactSection from "$lib/components/portfolio/ContactSection.svelte"
  import Footer from "$lib/components/portfolio/Footer.svelte"
  import Header from "$lib/components/portfolio/Header.svelte"
  import HeroSection from "$lib/components/portfolio/HeroSection.svelte"
  import ProjectsSection from "$lib/components/portfolio/ProjectsSection.svelte"
  import { breakpointQueries } from "$lib/breakpointUtils"
  import type { PageData } from './$types'
  import '$css/portfolio/main_page.css'

  let { data }: { data: PageData } = $props()

  let currentBp = $state<string>('')

  onMount(() => {
    // THIS IS SO WRONG!!! Keep the check in Header, but not here :)
    // if (!import.meta.env.DEV) return

    function updateBreakpoint() {
      currentBp = breakpointQueries(window).find(q => q.mq.matches)?.name ?? "xs"
    }

    breakpointQueries(window).forEach(q => q.mq.addEventListener("change", updateBreakpoint))
    updateBreakpoint()
    return () => breakpointQueries(window).forEach(q => q.mq.removeEventListener("change", updateBreakpoint))
  })
</script>

<div class="site">
  <!-- bg decoration -->
  <div class="bg-orbs" aria-hidden="true">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <!-- header -->
  <Header {currentBp} />

  <!-- main content -->
  <main>

    <!-- hero -->
    <HeroSection />

    <!-- about -->
    <AboutSection {currentBp} latestCommit={data.latestCommit} />

    <!-- projects -->
    <ProjectsSection projects={data.projects}/>

    <!-- contact -->
    <ContactSection />

  </main>

  <!-- footer -->
  <Footer/>
</div>