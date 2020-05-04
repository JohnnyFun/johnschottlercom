<footer>
  <div>
    <a class="view-code" href="https://github.com/JohnnyFun/johnschottlercom" target="_blank"><Icon type="github" /> view code</a>
  </div>
  <div>
    <ThemePicker />
  </div>
</footer>

<script>
	import Icon from 'Icon'
	import ThemePicker from 'components/ThemePicker'
</script>

<style>
  footer {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 1rem;
    box-shadow: .5rem 1rem .8rem 1rem #888888;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-text);
    z-index: 1000;
  }

  a.view-code {
    text-decoration: none;
    color: var(--primary);
    border: .1rem solid transparent;
    padding: .4rem;
    border-radius: .3rem;
    transition: border .3s;
  }

  a.view-code:hover{
    border-color: var(--primary);
  } 
</style>