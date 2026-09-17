<a on:click={onClickHandler} {href} {target}>
  {#if icon}
    <Icon type={icon} />
  {/if}
  <slot />
</a>

<script>
  import {createEventDispatcher} from 'svelte'
  import Icon from 'components/Icon.svelte'

  export let href = null
  export let onClick = null
  export let icon = null
  export let target = null

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
    padding: .7rem 1.5rem;
    border-radius: .3rem;
    display: inline-block;
    transition: all .3s;
    margin-bottom: 1rem;
  }

  a:hover {
    filter:brightness(1.1);
    cursor: pointer;
  }
</style>