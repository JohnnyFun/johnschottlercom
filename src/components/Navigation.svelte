<nav>
  <a class="home" href="/">John Schottler</a>
  <div class="nav-items">
    <a href="/resume">Résumé</a>
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
</nav>

<script>
	import Icon from 'Icon'
</script>

<style>
  nav {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 5rem;
    background-color: #222;
    box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0,0,0)
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

  .home {
    font-size: 2rem;
  }
</style>