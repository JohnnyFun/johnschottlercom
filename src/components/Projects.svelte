{#if projects}
  <div class="projects">
    {#each projects as project}
      <Project {project} />
    {/each}
  </div>
{/if}

<script>
  import Project from "./Project.svelte"

  export let projects
</script>

<style>
  .projects {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>