<div class="me-pic">
  <img src="/images/me.png" alt="me with fruit loops bird" />
</div>
<div class="projects">
  {#each projects as p}
    <a class="project" href={p.href} target="_blank">
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
      title: 'VR target shooting game',
      href: 'projects/vrshooter/index.html',
      desc: 'Shoot targets with your...gun. Works with oculus browser on quest 2. Probably works on other stuff too.',
      tags: [
        'Babylonjs',
      ]
    },
    {
      title: 'Tic tac toe',
      href: 'projects/tic-tac-toe/index.html',
      desc: 'A course I went through used tic-tac-toe to show basic concepts of machine learning. The instructor built it at the command line in python, but I built a GUI in html,css,js instead. I also played with different reward/learning approaches.',
      tags: [
        'Machine Learning',
        'Reinforcement Learning'
      ]
    },
    {
      title: 'Random trees',
      href: 'projects/random-tree.html',
      desc: 'Generate random svg trees.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Waterworm',
      href: 'projects/water-worm.html',
      desc: '3d worm-thing swimming through the digital realms...or something',
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
        'Ractivejs'
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
</script>

<style>
  .me-pic {
    text-align: center;
  }

  .me-pic > img {
    width: 20rem;
    height: auto;
    border-radius: .5rem;
  }

  .projects {
    margin: 0px auto;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
  }

  .projects > .project {
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
    border-radius: .5rem;
    font-size: 1rem;
  }

  .me-pic {
    border-radius: 10px;
  }
</style>