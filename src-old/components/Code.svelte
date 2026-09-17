<div class="code">
  {#if title}
    <div class="title">
      <div>{title}</div>
      <div class="actions">
        <a href={null} on:click={() => copyToClipboard(value)} title="copy"><Icon type="copy" /></a>
        <a href={null} on:click={() => scrollable = !scrollable} title={scrollable ? "expand" : "collapse"}><Icon type={scrollable ? "expand" : "compress"} /></a>
      </div>
    </div>
  {/if}
  <pre bind:this={block} class="language-{lang}" class:with-title={title} class:scrollable>
    {value}
  </pre>
</div>

<script>
  import Icon from 'components/Icon.svelte'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  import json from 'highlight.js/lib/languages/json'

  export let title
  export let value
  export let lang = 'javascript'
  export let scrollable = true

  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('json', json)

  let block

  $: if (block) hljs.highlightBlock(block)

  function copyToClipboard(value) {
    navigator.clipboard.writeText(value)
    // toaster.toast({ message: `Copied "${value}" to your clipboard.`, type: 'success', icon: 'copy' })
  }
</script>

<style>
  .code {
    border-radius: 1rem;
    background-color: #333;
  }
  .title {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #333;
  }
  .actions > a {
    margin-right: 1rem;
    border: 1px solid transparent;
    padding: 3px;
    border-radius: 3px;
  }
  .actions > a:hover {
    border: 1px solid var(--secondary-text);
  }
  pre {
    border-radius: 1rem;
    background-color: #222;
    padding: 2rem;
    margin:0;
    margin-bottom:2rem;
    overflow: auto;
  }

  pre.with-title {
    border-radius: 0 0 1rem 1rem;
  }

  pre.scrollable {
    max-height: 30rem;
  }
</style>