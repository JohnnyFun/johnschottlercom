<Section title="Hobby projects">
  <ProjectsList {projects} />
</Section>

<script>
  import ProjectsList from "./ProjectsList.svelte"
  import Section from "./Section.svelte"
</script>

<script context="module">
  export const projects = [
    {
     title: 'Tank beach party',
     href: 'projects/tank-beach-party',
     component: () => import('components/projects/tank-beach-party/TankBeachParty.svelte'),
     desc: 'Make party, not war.',
     tags: [
       'Babylonjs',
       'Ammojs',
       'svelte',
     ]
   },
    {
      title: 'Dirtball',
      href: 'projects/dirtball/index.html',
      openNewTab: true,
      desc: 'Game in which you are "Dirtball", a highly-trained ball of sludge and spit on his first mission.',
      tags: [
        'Babylonjs',
        'Cannonjs',
      ]
    },
    {
      title: 'Tic tac toe',
      href: 'projects/tic-tac-toe/index.html',
      openNewTab: true,
      desc: 'A course I went through used tic-tac-toe to show basic concepts of machine learning. The instructor built it at the command line in python, but I built a GUI in html,css,js instead. I also played with different reward/learning approaches.',
      tags: [
        'Machine Learning',
        'Reinforcement Learning'
      ]
    },
    {
      title: 'Random trees',
      href: 'projects/random-tree.html',
      openNewTab: true,
      desc: 'Generate random svg trees.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'VR target shooting game',
      href: 'projects/vrshooter/index.html',
      openNewTab: true,
      desc: 'Shoot targets with your...gun. Works with oculus browser on quest 2. Probably works on other stuff too.',
      tags: [
        'Babylonjs',
      ]
    },
    {
      title: 'Waterworm',
      href: 'projects/water-worm.html',
      openNewTab: true,
      desc: '3d worm-thing swimming through the digital realms...or something',
      tags: [
        'Threejs',
      ]
    },
    {
      title: 'Snowflake',
      href: 'projects/snowflake.html',
      openNewTab: true,
      desc: 'Infinite permiter in a finite space...until you run out of pixels.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Circle heaven',
      href: 'projects/circle-heaven.html',
      openNewTab: true,
      desc: 'Start with a big circle, then recursively draw more circles until you just can\'t draw any more circles.',
      tags: [
        'SVG',
      ]
    },
    {
      title: 'Triangle solver',
      href: 'projects/triangle-solver/index.html',
      openNewTab: true,
      desc: 'Given 3 pieces of info about a triangle, use trigonometric laws to determine the other info and also draw it.',
      tags: [
        'SVG',
        'Ractivejs'
      ]
    },
    {
      title: 'Grapher',
      href: 'projects/grapher/index.html',
      openNewTab: true,
      desc: 'Plot a formula from a textbox with SVG.',
      tags: [
        'SVG',
      ]
    },
  ]
</script>