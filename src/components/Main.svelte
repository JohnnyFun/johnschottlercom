<script>
	import NotFound from 'components/NotFound'
	import Home from 'components/Home'
  import { Router, Route } from 'svelte-routing';
</script>

<main>
  <Route path="/" component={Home} />
  <Route path="/hey">Hey there</Route>
  <Route component={NotFound} />
</main>

<style>
	main {
    overflow-y:auto;
    overflow-x:auto;
    padding: 2rem;
    padding-bottom: 6rem;
    height: calc(100vh - 43px - 43px);
  }

  @media only screen and (max-width: 350px) {
    main {
      height: calc(100vh - 85px - 43px);
    }
  }
</style>