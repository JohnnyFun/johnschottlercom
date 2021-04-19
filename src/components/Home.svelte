{#if $responsive.isTablet}
  <Me />
{/if}
<CodeProjects />
<Articles />

<script>
  import { onMount } from 'svelte'
  import Me from './Me.svelte'
  import CodeProjects from './CodeProjects.svelte'
  import Articles from './Articles.svelte'
  import responsive from 'stores/responsive'
  import { scrollTop } from 'services/scroll'

  export let splat

  let mounted = false
  onMount(() => mounted = true)

  $: el = mounted && splat !== '' ? document.getElementById(splat) : null
  $: if (el) el.scrollIntoView({ behavior: 'smooth' })
  else scrollTop()
</script>