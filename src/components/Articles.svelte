<Section title="Articles">
  <Projects {projects} />
</Section>

<script context="module">
  import {slugify} from 'services/string-utils'

  const projects = [
    {
      title: 'Protect your web app from XSS with custom lint rule and whitelist html component',
      openNewTab: true,
      tags: [
        'svelte',
        'xss',
        'cypress',
        'eslint',
        'eslint-plugin-svelte3',
      ]
    },
  ].map(p => ({...p, href: slugify(p.title) }))
</script>

<script>
  import Projects from "./Projects.svelte"
  import Section from "./Section.svelte"

  
</script>