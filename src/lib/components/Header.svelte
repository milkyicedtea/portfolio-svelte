<script lang="ts">
  import ThemeSwitch from "$lib/components/ThemeSwitch.svelte"
  import { scrollTo } from "$lib/scrollUtils"

  let { currentBp }: { currentBp: string} = $props()
</script>

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
    <a href="#about" onclick={(e) => scrollTo(window, e, '#about')}>about</a>
    <a href="#projects" onclick={(e) => scrollTo(window, e, '#projects')}>projects</a>
    <a href="#contact" onclick={(e) => scrollTo(window, e, '#contact')}>contact</a>
    <ThemeSwitch />
  </nav>
</header>