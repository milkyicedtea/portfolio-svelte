<script lang="ts">
  import { onMount } from "svelte"
  import AboutSection from "$lib/components/AboutSection.svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Header from "$lib/components/Header.svelte"
  import HeroSection from "$lib/components/HeroSection.svelte"
  import ProjectsSection from "$lib/components/ProjectsSection.svelte"
  import { breakpointQueries } from "$lib/breakpointUtils"
  import type { PageData } from './$types'
  import '$css/main_page.css'
  import ContactSection from "$lib/components/ContactSection.svelte";

  let { data }: { data: PageData } = $props()

  let currentBp = $state<string>('')

  onMount(() => {
    if (!import.meta.env.DEV) return

    function update() {
      currentBp = breakpointQueries(window).find(q => q.mq.matches)?.name ?? "xs"
    }

    breakpointQueries(window).forEach(q => q.mq.addEventListener("change", update))
    update()
    return () => breakpointQueries(window).forEach(q => q.mq.removeEventListener("change", update))
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