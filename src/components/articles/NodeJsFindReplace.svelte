<script>
  import Code from "components/Code.svelte";
</script>

<p>
  VSCode's find replace is very nice for common scenarios, but when I needed to migrate an app with ~300-400 components 
  from ractive.js to <a target="_blank" href="https://svelte.dev/">svelte</a>, 
  I needed more control.
</p>
<!-- <p>
  I wanted to get as much of the conversion work automated as I could without being
  too ridiculous about it. We had all our major workflows covered pretty nicely with <a target="_blank" href="https://www.cypress.io/">cypress</a> end-to-end tests,
  so I knew I'd be able to rely on them to tell me if I broke anything major.
</p> -->
<p>
  One of the more interesting conversions was migrating a some global dependencies to be explicitly imported. Ractive allows 
  you to have globally-available components, so you didn't have to explicitly <kbd>require</kbd> them. Svelte 
  needed us to explicitly import them, so I needed to:
</p>

<ul>
  <li>find usages of globally registered ractive components</li>
  <li>add an <kbd>import</kbd> in the <kbd>script</kbd> tag of the resulting <kbd>.svelte</kbd> file.</li>
</ul>

<p>That task would not be possible with VSCode's find/replace, since I'm not replacing what I'm finding.</p>

<p>
  I've found myself in similar situations since then, so I keep this script around as a good starting point for advanced find/replace tasks.
  <!--
    e.g. snowpack converting global dependencies usages to explicit imports
         replacing instances of {@html} with <SafeHtml and also importing <SafeHtml
  -->
</p>

<Code title="nodejs-find-replace.js" value={`
  const { resolve } = require('path')
  const { readdir, readFile, writeFile } = require('fs').promises
  const filesToInclude = 'src'
  main()

  function find(content) {
    return content.includes('<what you are searching for>')
  }

  function replace(fileName, content) {
    /* go wild. add new files, make multiple replacements, 
       parse as AST if regex won't cut it (xml/html for instance), etc.*/
    return content.replace(/original_thing/g, 'new_thing')
  }

  function fileNameFilter(file) {
    return file.endsWith('.svelte') || file.endsWith('.js')
  }

  async function main() {
    const filesToIncludeDir = resolve(__dirname, '..', filesToInclude)
    const files = await getFiles(filesToIncludeDir)
    const filesToSearch = files.filter(fileNameFilter)
    console.log(\`Searching \${filesToSearch.length} file(s)...\`)
    let modifiedCount = 0
    await Promise.all(filesToSearch.map(async file => {
      let content = (await readFile(file)).toString()
      if (find(content)) {
        console.log(file)
        content = replace(file, content)
        await writeFile(file, content)
        modifiedCount++
      }
    }))
    console.log(\`\${modifiedCount} files were modified.\`)
  }
  
  async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    }))
    return Array.prototype.concat(...files)
  }
`} />

<p>You can setup VSCode to run a nodejs file in debug mode by adding this configuration to your <kbd>launch.json</kbd> file:</p>

<Code lang="json" value={`
  ...
  {
    "type": "node",
    "request": "launch",
    "name": "NodeJs Current File",
    "program": "\${file}",
    "skipFiles": [
      "<node_internals>/**"
    ]
  }
  ...
`} />

<p>
  Then if you select that configuration in the "Run and Debug" dropdown, you can hit 
  <kbd>F5</kbd> on any js file to run it with nodejs and debug it with VSCode.
</p>

<p><img src="/images/nodejs-run-and-debug.jpg" alt="nodejs run and debug" /></p>

<p>
  If you're curious, the code that I used to do much of the conversion work is here: 
  <a target="_blank" href="https://github.com/JohnnyFun/ractive-to-svelte">ractive-to-svelte</a>. 
  Regex worked well enough for all the file modifications I needed to make, so I didn't end up needing to 
  dig into ractive's internals to get some kind of abstract syntax tree.
</p>

<p>Enjoy!</p>