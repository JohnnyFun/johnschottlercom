<div class="code">
  {#if title}<div class="title">{title}</div>{/if}
  <pre bind:this={block} class="language-{lang}" class:with-title={title}>
    {value}
  </pre>
</div>

<script>
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  import json from 'highlight.js/lib/languages/json'

  export let title
  export let value
  export let lang = 'javascript'

  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('json', json)

  let block

  $: if (block) hljs.highlightBlock(block)
</script>

<style>
  .code {
    border-radius: 1rem;
    background-color: #333;
  }
  .title {
    padding: 1rem;
    border-radius: 1rem;
    background-color: #333;
  }
  pre {
    border-radius: 1rem;
    background-color: #222;
    padding: 0;
    margin:0;
    margin-bottom:2rem;
    padding-bottom: 2rem;
  }

  pre.with-title {
    border-radius: 0 0 1rem 1rem;
  }
</style>