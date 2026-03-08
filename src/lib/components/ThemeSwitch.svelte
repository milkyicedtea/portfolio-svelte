<script lang="ts">
  import {useTheme} from "svelte-themes"
  import Icon from "@iconify/svelte"
  import '../../css/theme_switch.css'

  const theme = useTheme()

  function toggleTheme() {
    theme.theme = theme.resolvedTheme === 'dark'
      ? 'light'
      : 'dark'
  }
</script>

<button class="theme-btn" onclick={toggleTheme}>
  {#if theme.resolvedTheme === 'dark'}
    <Icon icon="pixel:sun-solid"/>
  {:else}
    <Icon icon="pixel:moon-solid"/>
  {/if}
</button>