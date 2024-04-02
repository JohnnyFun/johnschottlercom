<main>
  <Router>
    <Route component={CodeProjects} />
    <Route path="/projects" component={CodeProjects} />
    <Route path="/about-me" component={AboutMe} />
    <Route path="/articles" component={Articles} />
    <Route path="/article/:slug" component={Article} />
    <Route path="/resume" component={Resume} />
  </Router>
</main>

<script>
  import Article from 'components/Article.svelte'
  import { Route, Router } from 'svelte-routing'
  import Resume from './Resume.svelte'
  import Articles from './Articles.svelte'
  import AboutMe from './AboutMe.svelte'
  import CodeProjects from './CodeProjects.svelte';
</script>

<style>
	main {
    overflow-y: auto;
    overflow-x: auto;
    padding: 2rem;
    padding-bottom: 6rem;
    height: calc(100vh - var(--top-nav-height));
  }
</style>