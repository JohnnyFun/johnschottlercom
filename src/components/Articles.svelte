<Section title="Articles">
  <Projects projects={articles} />

  <div class="not-many">Yeah...not many articles</div>
</Section>

<script context="module">
  import {slugify} from 'services/string-utils'

  export const articles = [
    {
      title: 'Protect your svelte app from XSS with custom lint rule and whitelisted html component',
      datePublished: '4/19/2021',
      tags: [
        'svelte',
        'xss',
        'cypress',
        'eslint',
        'eslint-plugin-svelte3',
      ],
      component: () => import('components/articles/XssCustomLint.svelte')
    },
    {
      title: "Nodejs find/replace--when VSCode find/replace won't quite do the trick.",
      datePublished: '4/18/2021',
      tags: [
        'nodejs',
      ],
      component: () => import('components/articles/NodeJsFindReplace.svelte')
    },
  ].map(p => ({...p, href: `/article/${slugify(p.title)}`, slug: slugify(p.title) }))
</script>

<script>
  import Projects from "./ProjectsList.svelte"
  import Section from "./Section.svelte"  
</script>

<style>
  .not-many {
    text-align: center;
    margin-top: 20px;
  }
</style>