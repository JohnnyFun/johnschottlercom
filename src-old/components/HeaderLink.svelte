<a class:home on:click={scrollMainTop} {href} {title} {target}>
  {#if icon}
    <Icon type={icon} />
  {/if}
  <slot />
</a>

<script>
  import Icon from "./Icon.svelte"

  export let href
  export let title = null
  export let target = null
  export let icon = null
  export let home = false

  function scrollMainTop(e) {
    document.getElementsByTagName('main')[0].scrollTo(0,0)
  }
</script>
<style>
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
    border: none;
  }
  a.home:hover {
    border: none;
  }

  @media only screen and (max-width: 650px) {
    a {
      font-size: 1.3rem;
    }
  }
</style>