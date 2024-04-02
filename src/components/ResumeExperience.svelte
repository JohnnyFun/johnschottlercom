<div class="experience">
  <h4>{title}</h4>
  <h5>{company}</h5>
  <p class="when">{when}</p>
  <ul>
    {#each duties as duty}
      <li>{duty}</li>
    {/each}
  </ul>
</div>

<script>
  export let title
  export let company
  export let when
  export let duties
</script>

<style>
  .experience {
    border-bottom: 1px solid #666;
    padding-bottom: 20px;
    margin-bottom: 20px;
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
</style>