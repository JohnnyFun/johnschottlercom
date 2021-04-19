<div id={slugify(title)}>
  <h2>{title}</h2>
  <slot />
</div>

<script>
  import {slugify} from 'services/string-utils'

  export let title
</script>

<style>
  div {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  h2{
    text-align:center;
  }
</style>