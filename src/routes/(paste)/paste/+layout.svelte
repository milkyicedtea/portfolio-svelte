<script lang="ts">
  import  { SvelteTheme } from 'svelte-themes'
  import '$css/portfolio/layout.css'

	let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href="/clipboard.svg" />
  <title>PasteIt</title>
</svelte:head>
<SvelteTheme attribute="class" enableSystem>
  {@render children()}
</SvelteTheme>