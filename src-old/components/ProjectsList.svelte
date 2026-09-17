{#if projects}
  <div class="projects">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
{/if}

<script>
  import ProjectCard from './ProjectCard.svelte'

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