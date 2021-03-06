<div class="photos">
  {#each photos as photo}
    <div class="photo">
      <p>{photo}</p>
      <img src="/images/wound/IMG_{photo}.jpg" alt={photo} />
    </div>
  {/each}
</div>

<script>
  const photos = [
    '20200520_222349',
    '20200524_104005',
    '20200524_104009',
    '20200525_000604',
    '20200525_000709',
    '20200525_075722',
    '20200525_081611',
    '20200525_233726',
    '20200526_071039',
  ]
</script>

<style>
  .photos {

  }

  .photo {
    /* width: 50%; */
    position: relative;
  }

  .photo > p {
    position: absolute;
    background-color: white;
    color: #444;
    
  }
</style>