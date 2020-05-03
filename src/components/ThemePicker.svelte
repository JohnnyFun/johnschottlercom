<input type="color" bind:value={primaryValue} on:change={setPrimary} title="Choose primary color. css vars ftw." />
<script>
  const primaryProp = '--primary'
  let primaryValue = getComputedStyle(document.documentElement).getPropertyValue(primaryProp)
  function setPrimary() {
    document.documentElement.style.setProperty(primaryProp, primaryValue)
  }   
</script>