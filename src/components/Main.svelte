<main class:isDesktop={$responsive.isDesktop}>
  {#if $responsive.isDesktop}
    <Panel>
      <Me />
    </Panel>
  {:else}
    <Me />
  {/if}
  <Router>
    <Route component={Home} />
    <Route path="/hobby-projects" component={Home} />
    <Route path="/articles" component={Articles} />
    <Route path="/article/:slug" component={Article} />
    <Route path="/resume" component={Resume} />
  </Router>
</main>

<script>
  import Article from 'components/Article.svelte'
  import Home from 'components/Home.svelte'
  import { Route, Router } from 'svelte-routing'
  import Me from './Me.svelte'
  import Panel from './Panel.svelte'
  import responsive from 'stores/responsive'
  import Resume from './Resume.svelte'
  import Articles from './Articles.svelte'
</script>

<style>
	main {
    overflow-y: auto;
    overflow-x: auto;
    padding: 2rem;
    padding-bottom: 6rem;
    height: calc(100vh - var(--top-nav-height));
  }

  main.isDesktop {
    width: calc(100vw - var(--left-menu-width))
  }
</style>