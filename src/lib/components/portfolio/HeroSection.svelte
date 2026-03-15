<script lang="ts">
  import { age } from "$lib/age"
  import { scrollTo } from "$lib/scrollUtils"
  import Icon from "@iconify/svelte"
</script>

<section class="hero">
  <h1>hi, i'm <em>Alessandro</em>.<br/>i build things for the web.</h1>
  <p class="hero-desc">
    I'm a {age}yo self-taught developer based in Italy 🇮🇹. I enjoy building simple but fast open-core tools and applications for the web.
  </p>
  <div class="hero-links">
    <a href="#projects" onclick={(e) => scrollTo(window, e, '#projects')} class="btn btn-primary">
      take a look at my work <Icon icon="fa7-solid:arrow-down"/>
    </a>
    <a href="#contact" onclick={(e) => scrollTo(window, e, '#contact')} class="btn btn-ghost">get in touch</a>
    <a href="https://github.com/milkyicedtea" target="_blank" rel="noopener" class="btn btn-ghost">github ↗</a>
  </div>
</section>