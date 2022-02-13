<Route {path} let:params>
  <Loadable loader={component} let:component={loadedComponent}>
    <div slot="loading" class="loading">
      Loading...
    </div>
    <svelte:component this={loadedComponent} {...params} />
  </Loadable>
</Route>

<script>
  import Loadable from 'svelte-loadable'
  import { Route } from 'svelte-routing'

  export let component
  export let path = ''
</script>

<style>
  .loading {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 10rem;
  }
</style>