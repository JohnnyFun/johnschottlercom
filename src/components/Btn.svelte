<a on:click={onClickHandler} {href}><slot /></a>

<script>
  import {createEventDispatcher} from 'svelte'
  export let href = null
  export let onClick = null

  const dispatch = createEventDispatcher()

  function onClickHandler(e) {
    if (href === null) e.preventDefault()
    if (onClick) onClick(e)
    dispatch('click', e)
  }
</script>

<style>
  a {
    text-decoration: none;
    color: var(--primary-text);
    background-color: var(--primary);
    padding: 1rem;
    border-radius: .3rem;
  }
</style>