<script lang="ts">
  import { interests, techs } from "$lib/config"
  import SegmentedControl from "$lib/components/SegmentedControl.svelte"
  import Icon from "@iconify/svelte"

  let { currentBp, latestCommit } = $props()

  const techCategories = ['backend', 'frontend', 'native', 'databases', 'linux'] as const
  let selectedCategory = $state<typeof techCategories[number]>('backend')
  const filteredTechs = $derived(techs.filter(t => t.category.includes(selectedCategory)))
</script>

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
        {#if latestCommit}
          <a href={latestCommit.url} target="_blank" rel="noopener external" class="latest-commit">
            <div class="commit-top">
              <Icon icon="fa7-solid:code-branch" width="12" class="commit-branch-icon"/>
              <span class="commit-branch">main</span>
              <code class="commit-sha">{latestCommit.sha}</code>
            </div>
            <code class="commit-message">{latestCommit.message}</code>
            <div class="commit-meta">
              <span class="commit-repo">{latestCommit.repoFull}</span>
              <span class="commit-date">{latestCommit.date}</span>
            </div>
          </a>
        {:else}
          <p>no recent activity found.</p>
        {/if}
    </div>
  </div>
</section>