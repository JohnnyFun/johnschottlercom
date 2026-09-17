<nav>
  <HeaderLink href="/" home>John&nbsp;Schottler</HeaderLink>
  {#if thin}
    <ExternalLinks />
  {/if}
  <MenuItems>
    <HeaderLink href="/projects">Projects</HeaderLink>
    <HeaderLink href="/articles">Articles</HeaderLink>
    <HeaderLink href="/resume">Résumé</HeaderLink>
    <HeaderLink href="/about-me">About me</HeaderLink>
    {#if !thin}
      <ExternalLinks />
    {/if}
  </MenuItems>
</nav>

<script>
  import MenuItems from 'components/MenuItems.svelte'
  import ExternalLinks from './ExternalLinks.svelte'
  import HeaderLink from './HeaderLink.svelte'
  import screenWidth from 'stores/screen-width'

  $: thin = $screenWidth <= 430
</script>

<style>
  nav {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding:0;
    margin:0;
    width: 100vw;
    background-color: var(--primary);
    box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0);
    z-index: 1000;
  }

  @media only screen and (max-width: 650px) {
    nav {
      display: block;
      text-align: center;
    }
  }
</style>