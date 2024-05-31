<div class="experience" class:last>
  <h4>{title}</h4>
  <h5>{company}</h5>
  <p class="when">{when}</p>
  <p>
    {summary}
  </p>
  {#if duties}
    <a class="detail-toggler" href={null} on:click={() => showDetails = !showDetails}>
      {showDetails ? 'hide details' : 'show details'}
    </a>
    {#if showDetails}
      <ul in:slide out:slide>
        {#each duties as duty}
          <li>{duty}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>

<script>
  import { slide } from "svelte/transition"

  export let title
  export let company
  export let when
  export let summary
  export let duties
  export let last = false

  let showDetails = false
</script>

<style>
  .experience {
    border-bottom: 1px solid #666;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .experience.last {
    border-bottom: none;
  }
  h4, h5, p {
    margin: 0;
    margin-bottom: 4px;
    font-weight: normal;
  }
  h4 {
    font-size: 1.7rem;
  }
  h5 {
    font-size: 1.5rem;
  }
  .when {
    font-size: 1.3rem;
  }

  ul {
    margin-top: 0;
  }
  li {
    font-size: 1.5rem;
  }
  a.detail-toggler {
    cursor: pointer;
    font-size: smaller;
  }
</style>