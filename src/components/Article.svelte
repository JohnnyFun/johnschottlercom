{#if article}
  {#if loading}
    loading...
  {:else}
    <h1>{article.title}</h1>
    <svelte:component this={component} />
    <p><Btn href="/articles" icon="arrow-left">Back to articles</Btn></p>
  {/if}
{:else}
  <NotFound />
{/if}

<script>
  import {articles} from 'components/Articles.svelte'
  import NotFound from './NotFound.svelte'
  import Btn from './Btn.svelte'
  import { scrollTop } from 'services/scroll'

  export let slug

  let loading = false
  let component

  scrollTop()

  $: article = articles.find(a => a.slug === slug)
  $: article, loadArticleComponent()

  async function loadArticleComponent() {
    if (article == null) return null
    loading = true
    component = (await article.component().finally(() => loading = false)).default
  }
</script>

<style>
  h1 {
    text-align: center;
  }
</style>