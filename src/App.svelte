<style>
  :global(*) {
    box-sizing: border-box; /*so padding doesn't affect width/height*/
  }

  :global(html) {
    font-size: 10px; /*so that 1rem === 10px*/
  }

  :global(body) {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    background-color: #eee;
    color: #666;
    margin: 0;
    padding: 0;
  }

  /*scrollbar styling*/
  /* width */
  :global(::-webkit-scrollbar) {
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
  }

  /* Track */
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
    border-radius: 0.5rem;
  }

  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    background: #c9c9c9;
    border-radius: 0.5rem;
  }

  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: darken(#c9c9c9, 10%);
  }

  main {
    overflow-y:auto;
    overflow-x:auto;
  }
</style>

<script>
	import Routes from 'components/Routes'
	import Navigation from 'components/Navigation'
  import { Router, links } from 'svelte-routing'
</script>

<div use:links>
  <Router>
    <Navigation />
    <main>
      <Routes />
    </main>
  </Router>
</div>
