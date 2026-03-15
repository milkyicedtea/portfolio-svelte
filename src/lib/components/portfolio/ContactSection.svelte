<script lang="ts">
  import { socials } from "$lib/config"
  import Icon from "@iconify/svelte"
</script>

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