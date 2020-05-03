<nav>
  <a class="home" href="/">John&nbsp;Schottler</a>
  <div class="menu-items">
    <a href="/resume">Résumé</a>
    <div>
      <a href="https://github.com/JohnnyFun" target="_blank">
        <Icon type="github" />
      </a>
      <a href="http://stackoverflow.com/users/3144603/johnnyfun" target="_blank">
        <Icon type="stack-overflow" />
      </a>
      <a href="https://www.linkedin.com/in/john-schottler-8b353235" target="_blank">
        <Icon type="linkedin-square" />
      </a>
      <a href="https://www.facebook.com/johncschottler" target="_blank">
        <Icon type="facebook-square" />
      </a>
    </div>
  </div>
</nav>

<script>
  import Icon from 'Icon'
</script>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    padding: 1rem;
    padding-left: 2rem;
    background-color: #222;
    box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0)
  }

  .home {
    font-size: 2rem;
  }

  .menu-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    color: #9d9d9d;
    text-decoration: none;
    transition: color 0.3s;
    margin-right: 2rem;
  }

  nav a:hover {
    color: #eee;
  }

  @media only screen and (max-width: 450px) {
    nav {
      display: block;
    }
    
    .menu-items {
      margin-top: 1rem;
    }
  }
</style>