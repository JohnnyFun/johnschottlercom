<a href={project.href} target={project.openNewTab ? '_blank' : null}>
  <h2>{project.title}</h2>
  {#if project.desc}
    <p class="desc">{project.desc}</p>
  {/if}
  {#if project.tags}
    <div class="tags">
      {#each project.tags as t}
        <div class="tag">{t}</div>
      {/each}
    </div>
  {/if}
</a>

<script>
  export let project
</script>

<style>
  a {
    text-decoration: none;
    color: var(--primary-text);
    display: block;
    margin: 1rem;
    padding: 1rem;
    height: 25rem;
    border: 1px solid var(--primary);
    border-radius: 4px;
    transition: all .3s;
    width: 25rem;
  }

  .desc {
    max-height: 10rem;
    overflow-y: auto;
    margin-bottom: 2rem;
  }

  a:hover {
    transform: translateY(-.5rem);
    box-shadow: 0rem 0rem 3rem .5rem #222;
  }

  .tags {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .tag {
    margin-right: .5rem;
    padding: .4rem;
    background-color: var(--primary);
    color: var(--primary-text);
    border-radius: .5rem;
    font-size: 1.3rem;
    white-space: nowrap;
    margin-bottom: 1rem;
  }
</style>