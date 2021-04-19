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

  export let splat

  let mounted = false
  onMount(() => mounted = true)

  $: el = mounted && splat !== '' ? document.getElementById(splat) : null
  $: if (el) el.scrollIntoView({ behavior: 'smooth' })
  else document.getElementsByTagName('main')[0].scrollTo(0, 0)
</script>