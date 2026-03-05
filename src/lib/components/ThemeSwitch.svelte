<script lang="ts">
  import {useTheme} from "svelte-themes"
  import Icon from "@iconify/svelte"

  const theme = useTheme()
</script>

<button onclick={() => theme.theme = 'dark'}>
  {#if theme.theme === 'dark'}
    <Icon icon="pixel:sun-solid"/>
  {:else}
    <Icon icon="pixel:moon-solid"/>
  {/if}
</button>