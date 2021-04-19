<div use:links>
  <Router>
    <Header />
    <Main />
  </Router>
</div>

<script>
	import Main from 'components/Main.svelte'
	import Header from 'components/Header.svelte'
  import { Router, links } from 'svelte-routing'
</script>

<style>
  :global(*) {
    /*so padding doesn't affect width/height*/
    box-sizing: border-box;
  }

  :global(:root) {
    --primary: rgb(11, 88, 43);
    --primary-text: #eee;
    --secondary-text: rgb(4 138 60);
    --top-nav-height: 4.5rem;
    --left-menu-width: 25rem;
    --min-desktop-width: 1245px;
  }

  @media only screen and (max-width: 450px) {
    :global(:root) {
      --top-nav-height: 8.5rem;
    }
  }

  :global(html) {
    font-size: 10px; /*so that 1rem === 10px*/
  }

  :global(body) {
    font-family: Helvetica, sans-serif;
    font-size: 1.6rem;
    background-color: #2d2b2b;
    color: #ddd;
    margin: 0;
    padding: 0;
  }

  :global(h1, h2) {
    font-weight: 100;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  :global(h1) {
    margin-bottom: 3rem;
  }

  :global(kbd) {
    padding: 2px 5px;
    background-color: #222;
    border-radius: 3px;
  }
  
  :global(h2) {
    font-size: 2rem;
  }

  :global(p) {
    line-height: 2.5rem;
    padding:0;
    margin:0;
    margin-bottom:2rem;
  }

  :global(ul) {
    line-height: 2.5rem;
  }

  :global(a) {
    color: var(--secondary-text);
  }

  /*scrollbar styling*/
  /* width */
  :global(::-webkit-scrollbar) {
    width: .4rem;
    height: .4rem;
  }

  /* Track */
  :global(::-webkit-scrollbar-track) {
    background: #222;
  }

  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    background: #555;
  }

  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #333;
  }
</style>