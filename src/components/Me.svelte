<div class="intro">
  <div class="me-pic">
    <img src="/images/me-sm.png" alt="me with fruit loops bird" />
  </div>
  <div class="bio">
    <p>
      Hi, I code. Enjoy.
    </p>
    <Btn href="https://github.com/JohnnyFun/johnschottlercom" icon="github" target="_blank">Edit on github</Btn>
  </div>
</div>

<script>
  import Btn from './Btn.svelte'
</script>

<style>
 .intro {
    text-align: center;
    margin: 2rem;
    margin-bottom: 3rem;
  }

  .me-pic {
    border-radius: 1rem;
  }

  .me-pic > img {
    height: auto;
    border-radius: .5rem;
    width: 200px;
    margin-bottom: 1rem;
  }

  .bio {
    margin:0px auto;
    max-width:30rem;
    padding: 0 1rem;
  }
</style>