<script>
	import Home from 'components/Home'
	import Resume from 'components/Resume'
  import { Router, Route } from 'svelte-routing';
</script>

<Route component={Home} />
<Route path="/resume" component={Resume} />