<div class="resume-body">
  <h2>Summary</h2>
  <p>
    Full-stack software engineer since 2010.
    Worked in a variety of environments, from startups to established companies.
    I particularly enjoy making database queries run faster--everyone wins if the app runs faster, everyone gets annoyed if it's slow.
    I also particularly enjoy creating lots of fast-running and useful automated tests, so that deployments are less stressful.
  </p>
  <h2>Technical Skills</h2>
  <table>
    {#each Object.keys(technicalSkills) as category}
      <tr>
        <th>{category}</th>
        <td>{technicalSkills[category]}</td>
      </tr>
    {/each}
  </table>
  <h2>Experience</h2>
  <ResumeExperience title="Software Engineer" company="Clinician Nexus" when="Mar 2018 - Feb 2024 · 6yrs" 
    summary="Early employee, created lots of major infrastructure for a C#/.Net/Svelte/SQL app that manages clinical rotations for medical students. The company was eventually acquired." duties={[
    'Built out infrastructure for E2E and API testing, which kept the app very stable as we added lots of new features and fixed bugs. Found and POC\'d cypress.io and built custom code to generate insert scripts to seed the database for a test. Added ability to regenerating those insert scripts when schema and data migrations happened.',
    'Kept performance stable as we grew. Nightly index and stats management script. Re-designed indexes and queries periodically as schema and data changed. Implemented infinite scrolling or pagination in many places. Implemented API rate limiting.',
    'Modernized the app\'s client-side infrastructure. Refactored from Ractive.js to Svelte.js--used lots of regex and abstract syntax trees to reduce manual work and increase consistency. Automated tests helped guide this effort.',
    'Implemented our public API and documentation to facilitate custom integrations with our app. Added code splitting.',
    'Implemented asynchronous export jobs for exporting large reports without timing out using websockets to notify progress updates and finally sending a url to a blob to download',
    'Implemented many of our major auth and user profile features (login, forgot/reset pw, sign-up, SSO via SAML, upload/crop profile pic, user impersonation for our staff to see what the customer sees (minus sensitive info))',
    'Implemented our notification system with auto retries--emails, in-app websocket toasts, webhooks for custom integrations',
    'Configured much of our CI pipeline YAML file (build, lint, run tests, deploy, notify via Slack channel, etc)',
    'Built out our pricing, subscription, packages infrastructure that uses Stripe to process payments',
    'Implemented many other major features of the app--hour logging, custom reporting, etc',
    'Kept 3rd party dependencies up-to-date (for security, performance, and to have latest features)',
    'Reviewed and merged pull requests',
    'Implemented main error handling pipeline in the app that ultimately sent unhandled exceptions to Azure. Created script to report application bugs in Slack channel, filtering out known-non-issue bugs, linking to more details in azure.',
    'Helped to monitor and fix bugs reported by our internal support and external customers',
    'Kept eyes peeled for security threats like XSS, SQL injection, etc. Mentored younger devs in this area.',
    'Handled many deployments to demo, staging, and prod',
  ]} />
  <ResumeExperience title="Software Engineer III" company="AssureSign" when="Jul 2016 - Mar 2018 · 1 yr 9 mos" 
    summary="Added features and fixed bugs on a .Net/React/SQL esignature platform." duties={[
    'During my last 2 weeks, I sped up a slow query that made it possible to finally load their dashboard in god mode and see everything from a high level. CTO was pretty happy and surprised about that, and he wasn\'t the type of guy to get excited easily. I liked that I finished strong and didn\'t just sit with my thumb up my ass for my last 2 weeks.',
    'Used Reactjs to build modern web app features',
    'Used NancyFx and .Net to implement changes to their public and private API endpoints',
    'Updated and improved a point-of-sale desktop app for doing in-person signatures',
    'Helped with dev support. They used the ELK stack for bug and performance insights and tracking, which was pretty nice to use.',
    'Updated and improved the app\'s notifications system for sending emails and webhooks to get more throughput--it had been getting clogged periodically before then.',
    'Helped implement some of their later API endpoints and their new app\'s front-end which used the new API.',
    'Introduced some automated testing into their app, which had very few automated tests when I started there.',
    'Deployed to demo and prod environments periodically',
    'Helped keep the sensitive data in signed documents secure. Did periodic security trainings that included OWASP coding trainings where we\'d fix various egregious security holes in simple fake apps.'
  ]} />
  <ResumeExperience title=".Net and JavaScript Developer" company="Nerdery" when="Jul 2014 - Jul 2015 · 1 yr 1 mo"
    summary="Sub contractor on various projects, using .Net, Node.js, Angular, SQL, Mongo, Phonegap, and various other tech according to client needs/desires."
    duties={[
    'Implemented some features on an app for Rockwell Automation that ultimately would allow people to build machines using parts that were compatible with each other. It used .Net MVC, Angular 1.x, MS SQL Server',
    'Led an effort to update a MEAN (Mongo, Expressjs, Angular, Node.js) stack app called Breadworld that had yeast recipes and products.',
    'Led an effort to update a cordova phonegap app--a framework for making native mobile apps using html, css, and js. ',
    'Did a 24hr volunteer coding event with some guys at the company to help non-profits build a website.',
  ]} />
  <ResumeExperience title="Web Developer" company="Genuine Genius Technologies" when="Apr 2011 - Mar 2012 · 1 yr"
    summary="Worked on various education-related applications for obtaining certifications. .NET MVC, Entity framework, SQL, telerik components." />
  <ResumeExperience title="Web Developer" company="Adestinn" when="Sept 2010 - Mar 2011, Mar 2012 - Jul 2014, Jul 2015 - Jul 2016 · ~3 yrs total" 
    summary="This was the first company I worked at as a web developer. It was a startup. I helped them out throughout my first few years as a dev. It's still out there. I was one of the main devs on the project and built a lot of its major functionality."	
    duties={[
    '.NET WebForms, a mixture of VB and C# in their codebase, MS SQL server database. mixture of jquery and ractive.js front-end.',
    'Built pages to search for hotels, see details, review pricing/payment, book',
    'Used various external APIs to interact with hotel related data and book hotels',
    'Implemented unit tests to prevent regression',
    'Worked with contract designer and UX people to implement features',
    'Deployed code, monitored/fixed bugs',
  ]} last />
</div>

<script>
  import ResumeExperience from "./ResumeExperience.svelte"

  const technicalSkills = {
    'Client-side': 'HTML, CSS, JavaScript/TypeScript, Svelte, React, Angular, JQuery, …',
    'Server-side': 'C#, Node.js, .NET Core, Dapper, SignalR, …',
    'Database': 'SQL, Elasticsearch, Mongo',
    'Automated testing frameworks': 'Cypress, XUnit',
    'Build process': 'Nuget/NPM, Webpack/Rollup, YAML CI/CD pipeline config, …',
    'Application hosting': 'Azure/AWS, IIS',
    'Tools': 'Git, VScode, browser dev tools, SQL profiler, query execution plan, regex101.com, git history, Postman, Fiddler, …',
    'Hobby/Learning': 'horizontally-scalable SQL databases like CockRoachDB, PyTorch/Tensorflow, Bablyonjs (web GL/GPU game engine)',
  }
</script>

<style>
  .resume-body {
    margin: 0px auto;
    max-width: 1000px;
  }

  h2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  table, th, td {
    border: 1px solid;
    border-collapse: collapse;
    padding: 8px;
  }

  th, td {
    text-align: left;
  }
</style>