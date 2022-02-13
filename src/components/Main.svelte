<main class:isDesktop={$responsive.isDesktop}>
  {#if $responsive.isDesktop}
    <Panel>
      <Me />
    </Panel>
  {/if}
  <Router>
    <Route path="/article/:slug" component={Article} />
    <Route path="/*splat" component={Home} />
    <Route component={NotFound} />
  </Router>
</main>

<script>
  import Article from 'components/Article.svelte'
  import Home from 'components/Home.svelte'
  import NotFound from 'components/NotFound.svelte'
  import { Route, Router } from 'svelte-routing'
  import Me from './Me.svelte'
  import Panel from './Panel.svelte'
  import responsive from 'stores/responsive'
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