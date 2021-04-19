<script>
  import Code from "components/Code.svelte"
  import NodeJsFindReplace from 'components/articles/code-examples/NodeJsFindReplace.txt'
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

<Code title="nodejs-find-replace.js" value={NodeJsFindReplace} />

<p>You can setup VSCode to run a nodejs file in debug mode by adding this configuration to your <kbd>launch.json</kbd> file:</p>

<Code lang="json" value={`...
{
  "type": "node",
  "request": "launch",
  "name": "NodeJs Current File",
  "program": "\${file}",
  "skipFiles": [
    "<node_internals>/**"
  ]
}
...`} />

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