<Section title="Articles">
  <Projects projects={articles} />
</Section>

<script context="module">
  import {slugify} from 'services/string-utils'

  export const articles = [
    // {
    //   title: 'Protect your web app from XSS with custom lint rule and whitelist html component',
    //   tags: [
    //     'svelte',
    //     'xss',
    //     'cypress',
    //     'eslint',
    //     'eslint-plugin-svelte3',
    //   ],
    //   component: () => import('components/articles/XssCustomLint.svelte')
    // },
    {
      title: "Nodejs find/replace--when VSCode find/replace won't quite do the trick.",
      tags: [
        'nodejs',
      ],
      component: () => import('components/articles/NodeJsFindReplace.svelte')
    },
  ].map(p => ({...p, href: `/article/${slugify(p.title)}`, slug: slugify(p.title) }))
</script>

<script>
  import Projects from "./Projects.svelte"
  import Section from "./Section.svelte"  
</script>