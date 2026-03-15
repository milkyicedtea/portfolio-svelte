<script lang="ts">
  import Icon from "@iconify/svelte"
  import '$css/portfolio/segmented_control.css'

  interface Props {
    segments: string[]
    selected: string
    compact?: boolean
    onchange?: (value: string) => void
  }

  let { segments, selected = $bindable(), compact = false, onchange }: Props = $props()

  let open = $state(false)
  let wrapper: HTMLDivElement | null = $state(null)

  function select(seg: string) {
    selected = seg
    open = false
    onchange?.(seg)
  }

  function toggle() {
    open = !open
  }

  function onwindowclick(e: MouseEvent) {
    if (open && !wrapper?.contains(e.target as Node)) open = false
  }
</script>

<svelte:window onclick={onwindowclick} />

{#if compact}
  <div class="seg-dropdown" bind:this={wrapper}>
    <button class="seg-dropdown-trigger" onclick={toggle} type="button">
      <span class="seg-trigger-sizer" aria-hidden="true">
        {#each segments as seg (seg)}
          <span>{seg}</span>
        {/each}
      </span>
      <span class="seg-trigger-label">{selected}</span>
      <Icon icon="fa7-solid:angle-down" class="seg-chevron {open ? 'open' : ''}"/>
    </button>
    {#if open}
      <ul class="seg-dropdown-list" role="listbox">
        {#each segments as seg (seg)}
          <li role="option" aria-selected={selected === seg}>
            <button
              type="button"
              class="seg-dropdown-item"
              class:active={selected === seg}
              onclick={() => select(seg)}
            >
              {seg}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{:else}
  <div class="segmented-control" role="tablist">
    {#each segments as seg (seg)}
      <button
        role="tab"
        aria-selected={selected === seg}
        class="seg-btn"
        class:active={selected === seg}
        onclick={() => select(seg)}
      >
        {seg}
      </button>
    {/each}
  </div>
{/if}
