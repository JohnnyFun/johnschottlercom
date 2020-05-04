<h1 class="page-title">Some projects. Enjoy.</h1>
<div class="projects">
  {#each projects as p}
    <a href={p.href} target="_blank">
      <h1>{p.title}</h1>
      <p>
        {@html p.desc}
      </p>
      <div class="tags">
        {#each p.tags as t}
          <div>{t}</div>
        {/each}
      </div>
    </a>
  {/each}
</div>

<script>
  const projects = [
    {
      title: 'Dirtball',
      href: 'projects/dirtball/index.html',
      desc: 'Game in which you are "Dirtball", a highly-trained ball of sludge and spit on his first mission.',
      tags: [
        'Babylonjs',
        'Cannonjs',
      ]
    },
    {
      title: 'Tic tac toe',
      href: 'projects/tic-tac-toe/index.html',
      desc: 'Play tic tac to against a (kinda) trained computer. Made some of the logic from a course, but added a GUI and tweaked how the algorithm learns--the course only showed on CLI, which wasn\'t as fun.',
      tags: [
        'Machine Learning',
      ]
    },
    {
      title: 'Random trees',
      href: 'projects/random-tree.html',
      desc: 'Generate random trees svg trees.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Waterworm',
      href: 'projects/water-worm.html',
      desc: '3d worm-thing swimming through the digital realms, only loosely controllable',
      tags: [
        'Threejs',
      ]
    },
    {
      title: 'Snowflake',
      href: 'projects/snowflake.html',
      desc: 'Infinite permiter in a finite space...until you run out of pixels.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Circle heaven',
      href: 'projects/circle-heaven.html',
      desc: 'Start with a big circle, then recursively draw more circles until you just can\'t draw any more circles.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Triangle solver',
      href: 'projects/triangle-solver/index.html',
      desc: 'Given 3 pieces of info about a triangle, use trigonometric laws to determine the other info and also draw it.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Grapher',
      href: 'projects/grapher/index.html',
      desc: 'Plot a formula from a textbox with SVG.',
      tags: [
        'SVG',
      ]
    },
  ]

  // let search = null

  // $: projectsFiltered = search === null || search.trim() === '' ? 
  //     projects : 
  //     projects.filter(p => JSON.stringify(p).toLowerCase().indexOf(search.toLowerCase()) > -1)
</script>

<style>
  .projects {
    margin: 0px auto;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
  }

  .projects > a {
    text-decoration: none;
    color: var(--primary);
    display: block;
    margin: 1rem;
    padding: 1rem;
    width: 100%;
    min-width: 20rem;
    max-width: 30rem;
    height: 25rem;
    border: 1px solid var(--primary);
    border-radius: 4px;
    transition: transform .3s;
  }

  .projects > a:hover {
    transform: scale(1.04, 1.04);
    box-shadow: 0rem 1rem 1rem 0rem #ddd;
  }

  h1 {
    text-align: center;
  }

  .tags {
    display: flex;
    justify-content: left;
  }

  .projects > a > p {
    color: #444;
  }

  .tags > div {
    margin-right: .5rem;
    padding: .4rem;
    background-color: var(--primary);
    color: var(--primary-text);
    border-radius: 2rem;
    font-size: 1rem;
  }
</style>