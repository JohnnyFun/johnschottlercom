<nav>
  <div>
    <a class="home" href="/">John&nbsp;Schottler</a>
  </div>
  <div class="menu-items">
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
  </div>
</nav>

<script>
  import Icon from 'Icon'
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
  }

  a.home {
    padding: 1rem;
    font-size: 2rem;
    transition: transform 0.5s;
  }

  a.home:hover {
    transform: scale(1.1, 1.1);
  }

  .menu-items {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }

  .menu-items > a {
    padding: 1rem;
    transition: border-bottom 0.3s;
    border: 2px solid transparent;
  }

  .menu-items > a:hover {
    border-bottom: 2px solid var(--primary-text);
  }

  @media only screen and (max-width: 350px) {
    nav {
      display: block;
      text-align: center;
    }
  }
</style>