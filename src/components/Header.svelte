<nav on:click={scrollMainTopIfChangingPage}>
  <a class="home" href="/">John&nbsp;Schottler</a>
  <MenuItems>
    <a href="/hobby-projects">Projects</a>
    <a href="/articles">Articles</a>
    <a href="/resume">Résumé</a>
    <a href="https://github.com/JohnnyFun" title="github" target="_blank">
      <Icon type="github" />
    </a>
    <a href="http://stackoverflow.com/users/3144603/johnnyfun" title="stackoverflow" target="_blank">
      <Icon type="stack-overflow" />
    </a>
    <a href="https://www.linkedin.com/in/john-schottler-8b353235" title="linkedin" target="_blank">
      <Icon type="linkedin-square" />
    </a>
    <a href="https://www.facebook.com/johncschottler" title="facebook" target="_blank">
      <Icon type="facebook-square" />
    </a>
  </MenuItems>
</nav>

<script>
  import Icon from 'components/Icon.svelte'
  import MenuItems from 'components/MenuItems.svelte'

  function scrollMainTopIfChangingPage(e) {
    const isMenuAnchor = e.target.tagName.toLowerCase() === 'a'
    if (isMenuAnchor) document.getElementsByTagName('main')[0].scrollTo(0,0)
  }
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

  a {
    color: var(--primary-text);
    text-decoration: none;
    display: inline-block;
    padding: 1rem;
    transition: border-bottom 0.3s;
    border: 2px solid transparent;
    text-decoration: none;
    font-size: 1.5rem;
  }

  a:hover {
    border-bottom: 2px solid var(--primary-text);
  }

  a.home {
    padding: 1rem;
    margin-left: 1.4rem;
    font-size: 1.8rem;
    transition: transform 0.3s;
    font-weight: 100;
  }

  @media only screen and (max-width: 580px) {
    nav {
      display: block;
      text-align: center;
    }

    a {
      font-size: 1.3rem;
    }
  }
</style>