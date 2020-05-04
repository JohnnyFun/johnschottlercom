<style>
  :global(*) {
    /*so padding doesn't affect width/height*/
    box-sizing: border-box; 
  }

  :global(:root) {
    --primary: #008000;
    --primary-text: #eee;
  }

  :global(html) {
    font-size: 10px; /*so that 1rem === 10px*/
  }

  :global(body) {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    background-color: #eee;
    color: #555;
    margin: 0;
    padding: 0;
  }

  /*scrollbar styling*/
  /* width */
  :global(::-webkit-scrollbar) {
    width: .8rem;
    height: .8rem;
  }

  /* Track */
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }

  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    background: #aaa;
  }

  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: darken(#c9c9c9, 10%);
  }
</style>

<script>
	import Footer from 'Footer'
	import Main from 'components/Main'
	import Navigation from 'components/Navigation'
  import { Router, links } from 'svelte-routing'
</script>

<div use:links>
  <Router>
    <Navigation />
    <Main />
    <Footer />
  </Router>
</div>
