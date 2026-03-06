<script lang="ts">
  import  { SvelteTheme } from 'svelte-themes'
  import './layout.css'

	let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <title>Alessandro's Portfolio</title>
</svelte:head>
<SvelteTheme attribute="class" enableSystem>
  {@render children()}
</SvelteTheme>
