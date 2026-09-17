<div class="certification">
  <div class="title">{title}</div>
  <div class="issue-date">Issued {issueDate}</div>
  <div class="description">{description}</div>
  <div class="link">
    <a href="{link}">
      Show credential
      <Icon type="external-link" />
    </a>
  </div>
</div>

<script>
  import Icon from "./Icon.svelte"

  export let title;
  export let issueDate;
  export let description;
  export let link;
</script>

<style>
  div {
    margin-bottom: 5px;
  }

  .certification {
    margin-bottom: 20px;
  }

  .title {
    font-weight: bold;
  }

  .issue-date {
    font-style: italic;
    font-size: smaller;
  }

  .description {
    font-size: smaller;
  }

  .link {
    font-size: smaller;
  }
</style>