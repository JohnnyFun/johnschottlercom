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
    'Handled many deployments to demo, staging, and prod',
  ]} />
  <ResumeExperience title="Software Engineer III" company="AssureSign" when="Jul 2016 - Mar 2018 · 1 yr 9 mos" duties={[
    'During my last 2 weeks, I sped up a slow query that made it possible to finally load their dashboard in god mode and see everything from a high level. CTO was pretty happy and surprised about that, and he wasn\'t the type of guy to get excited easily. I liked that I finished strong and didn\'t just sit with my thumb up my ass for my last 2 weeks.',
    'Used Reactjs to build modern web app features',
    'Used NancyFx and .Net to implement changes to their public and private API endpoints',
    'Updated and improved a point-of-sale desktop app for doing in-person signatures',
    'Helped with dev support. They used the ELK stack for bug and performance insights and tracking, which was pretty nice to use.',
    'Updated and improved the app\'s notifications system for sending emails and webhooks to get more throughput--it had been getting clogged periodically before then.',
    'Helped implement some of their later API endpoints and their new app\'s front-end which used the new API.',
    'Introduced some automated testing into their app, which had very few automated tests when I started there.',
    'Deployed to demo and prod environments periodically',
  ]} />
  <ResumeExperience title=".Net and JavaScript Developer" company="Nerdery" when="Jul 2014 - Jul 2015 · 1 yr 1 mo" duties={[
    'Implemented some features on an app for Rockwell Automation that ultimately would allow people to build machines using parts that were compatible with each other. It used .Net MVC, Angular 1.x, MS SQL Server',
    'Led an effort to update a MEAN (Mongo, Expressjs, Angular, Node.js) stack app called Breadworld that had yeast recipes and products.',
    'Led an effort to update a cordova phonegap app--a framework for making native mobile apps using html, css, and js. ',
    'Did a 24hr volunteer coding event with some guys at the company to help non-profits build a website.',
  ]} />
  <ResumeExperience title="Web Developer" company="Genuine Genius Technologies" when="Apr 2011 - Mar 2012 · 1 yr" duties={[
    'Fixed bugs and implement small features on their various education-related applications for taking tests',
    'Used .NET MVC and telerik components',
  ]} />
  <ResumeExperience title="Web Developer" company="Adestinn" when="Sept 2010 - Mar 2011, Mar 2012 - Jul 2014, Jul 2015 - Jul 2016 · ~3 yrs total, off and on since they'd run low on funding periodically" duties={[
    'This was the first company I worked at as a web developer. It was a startup. I helped them out throughout my first few years as a dev. Appears it\'s still out there. I was one of the main devs on the project and built a lot of it\'s major functionality.',
    '.NET WebForms, a mixture of VB and C# in their codebase, MS SQL server database. mixture of jquery and ractive.js front-end.',
    'Built pages to search for hotels, see details, review pricing/payment, book',
    'Used various external APIs to interact with hotel related data and book hotels',
    'Implemented unit tests to prevent regression',
    'Worked with contract designer and UX people to implement features',
    'Deployed code, monitored/fixed bugs',
  ]} last />
  <!-- <h2>Personal hobbies/interests</h2>
  <ul>
    <li>
      Primary hobbies that I consistently put effort into currently
      <ul>
        <li>Blue belt jiu jitsu</li>
        <li>Learning Spanish. Currently B1, goal B2 slowly, but surely.</li>
      </ul>
    </li>
    <li>
      Casual interests that I do less frequently
      <ul>
        <li>Tour biking</li>
        <li>Rock climbing</li>
        <li>Hiking</li>
        <li>Guitar playing</li>
      </ul>
    </li>
    <li>Surfing</li>
    <li>Snowboarding/skiing</li>
  </ul> -->
</div>

<script>
  import ResumeExperience from "./ResumeExperience.svelte"

  const technicalSkills = {
    'Client-side': 'HTML, CSS, JavaScript',
    'Client-side frameworks/libraries': 'Svelte, React, JQuery, …',
    'Server-side': 'C#, Node.js',
    'Server-side frameworks/libraries': '.NET Core, Dapper, SignalR, …',
    'Database': 'MS SQL Server, Elasticsearch, Mongo, …',
    'Automated testing frameworks': 'Cypress, XUnit, …',
    'Build process': 'Nuget/NPM, Webpack/Rollup, YAML pipeline config files for Azure and Github, …',
    'Application hosting': 'Azure/AWS, IIS',
    'Trouble-shooting tools': 'browser dev tools, SQL profiler, query execution plan, regex101.com, git history, Postman, Fiddler',
    'Source control': 'Git',
    'Hobby/interested in learning more': 'Bablyonjs (web GL/GPU game engine), PyTorch/Tensorflow, horizontally-scalable SQL databases like CockRoachDB',
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