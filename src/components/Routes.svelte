<script>
	import NotFound from 'components/NotFound'
	import Home from 'components/Home'
  import { Router, Route } from 'svelte-routing';
</script>

<main>
	<Route path="/" component={Home} />
	<Route component={NotFound} />
</main>

<style>
	main {
    overflow-y:auto;
    overflow-x:auto;
    padding: 2rem;
  }
</style>