<script lang="ts">
  import Icon from "@iconify/svelte"
  import type { GithubRepo } from "$lib/config"

  let { projects }: { projects: Array<GithubRepo> } = $props()
</script>

<section class="projects" id="projects">
  <div class="section-header">
    <span class="section-label">projects</span>
    <div class="section-line"></div>
  </div>
  <div class="projects-grid">
    {#each projects as project (project.full_name)}
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