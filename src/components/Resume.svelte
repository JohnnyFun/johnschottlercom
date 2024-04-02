<div class="resume-body">
  <h2>Professional Summary</h2>
  <ul>
    <li>Discussed project requirements with technical and non-technical people</li>
    <li>Built intuitive user interfaces for managing a variety of data</li>
    <li>Experienced working in multiple startup environments, where everyday poses new challenges and requires new skills to be learned</li>
    <li>Always kept the bigger picture in mind, developing not only the software, but also the purpose of the software</li>
  </ul>
  <h2>Primary Technical Skills</h2>
  <table>
    {#each Object.keys(technicalSkills) as category}
      <tr>
        <th>{category}</th>
        <td>{technicalSkills[category]}</td>
      </tr>
    {/each}
  </table>
  <h2>Professional Experience</h2>
  <ResumeExperience title="Software Engineer" company="Clinician Nexus" when="Mar 2018 - Feb 2024 · 6yrs" duties={[
    'Built out infrastructure for E2E and API testing, which kept the app very stable as we added lots of new features and fixed bugs. Found and POC\'d cypress.io and built custom code to make generating, applying, and regenerating (data migrations) seed data from an MS SQL database.',
    'Kept performance stable and good as we grew. Nightly index and stats management script. Re-design indexes and queries periodically as schema and data changed. Implemented infinite scrolling or pagination in many places. Implemented API rate limiting.',
    'Modernized the app\'s client-side infrastructure. Refactored from Ractive.js to Svelte.js, added code splitting. Lots of regex and also some abstract syntax tree to reduce manual work and increase consistency. Automated tests helped guide this effort.',
    'Implemented our public API and documentation to facilitate custom integrations with our app.',
    'Implemented asynchronous export jobs for exporting large reports without timing out using websockets to notify progress updates and finally send a blob download url to the UI',
    'Implemented all our major auth features and user profile pages/endpoints (login, forgot/reset pw, sign-up, SSO via SAML, upload/crop profile pic, user impersonation for our staff to see what the customer sees (minus sensitive info))',
    'Implemented our notification system with auto retries--emails, in-app websocket toasts, webhooks for custom integrations',
    'Configured much of our CI pipeline yaml file (build, lint, run tests, deploy, etc)',
    'Built out our pricing, subscription, packages infrastructure that used stripe to process payments',
    'Implemented many other major features of the app--hour logging, custom reporting, etc',
    'Kept 3rd party dependencies up-to-date (for security, performance, and to have latest features)',
    'Reviewed and merged pull requests',
    'Implemented main error handling pipeline in the app that ultimately sent unhandled exceptions to Azure. Created script to report application bugs in Slack channel, filtering out known-non-issue bugs, linking to more details in azure.',
    'Helped to monitor and fix bugs reported by our internal support and external customers',
    'Handled many deployments to demo, staging, and prod',
  ]} />
  <ResumeExperience title="Software Engineer III" company="AssureSign" when="Jul 2016 - Mar 2018 · 1 yr 9 mos" duties={[
    'During my last 2 weeks, I sped up a slow query that made it possible to finally load their dashboard in god mode and see everything from a high level. CTO was pretty happy about that, and he wasn\'t the type of guy to get excited easily. I liked that I finished strong and didn\'t just sit with my thumb up my ass for my last 2 weeks.',
    'Used Reactjs to build modern web app features',
    'Updated and improved a point-of-sale desktop app for signing in person',
    'Helped with dev support and added features to APIs. They used the ELK stack for bug and performance insights and tracking, which was pretty nice to use.',
    'Updated and improved the app\'s notifications system for sending emails and webhooks',
    'Helped implement some of their later API endpoints and their new app\'s front-end which used the new API.',
    'Introduced some automated testing into their app, which had very few automated tests when I started there.',
    'Deployed to demo and prod environments periodically',
  ]} />
  <ResumeExperience title=".Net and JavaScript Developer" company="Nerdery" when="Jul 2014 - Jul 2015 · 1 yr 1 mo" duties={[
    'Implemented some features on an app for Rockwell Automation that ultimately would allow people to build machines using parts that were compatible with each other. It used .Net MVC, Angular 1.x, MS SQL Server',
    'Led a MEAN stack app called Breadworld that had yeast recipes and products lol. Appears it\'s no longer out there though. Bummer.',
    'Led a cordova phonegap app--a framework for making native mobile apps using html, css, and js.',
    'Did a 24hr volunteer coding event with some guys at the company to help non-profits build a website. I was pretty tired toward the end. Not recommended if you value your health.',
  ]} />
  <ResumeExperience title="Web Developer" company="Genuine Genius Technologies" when="Apr 2011 - Mar 2012 · 1 yr" duties={[
    'Fixed bugs and implement small features on their various education-related applications for taking tests',
    'Used .NET MVC and telerik components.',
  ]} />
  <ResumeExperience title="Web Developer" company="Adestinn" when="Sept 2010 - Mar 2011, Mar 2012 - Jul 2014, Jul 2015 - Jul 2016 · ~3 yrs total, off and on since they'd run low on funding periodically" duties={[
    'This was the first company I worked as a web developer technically. It was a startup. I helped them out throughout my first few years as a dev. Appears it\'s still out there. I was one of the main devs on the project and built a lot of it\'s major functionality.',
    '.NET webforms, a mixture of VB and C# in their codebase, MS SQL server database. mixture of jquery and ractive.js front-end.',
    'Built pages to search for hotels in the program, see details, review pricing, book',
    'Deployed code, monitored/fixed bugs',
    'Used various external APIs to interact with hotel related data and book hotels',
    'Implemented uinit tests to prevent regression',
    'Worked with contract designer and UX people to implement features',
  ]} last />
</div>

<script>
  import ResumeExperience from "./ResumeExperience.svelte"

  const technicalSkills = {
    'Client-side': 'HTML, CSS, JavaScript',
    'Client-side frameworks/libraries': 'Svelte, React, JQuery, …',
    'Server-side': 'C#, Node.js',
    'Server-side frameworks/libraries': '.NET Core, SignalR, …',
    'Database': 'MS SQL Server, Elasticsearch, Mongo, …',
    'Automated testing frameworks': 'Cypress, XUnit, …',
    'Build process': 'Nuget/NPM, webpack/rollup, …',
    'Application hosting': 'Azure/AWS, IIS',
    'Trouble-shooting tools': 'browser dev tools, SQL profiler, query execution plan, regex101.com, git history, postman, fiddler',
    'Source control': 'Git',
    'Hobby/interested in learning more': 'Bablyonjs (web GL/GPU game engine), pytorch/tensorflow, horizontally-scalable SQL databases like CockRoachDB',
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