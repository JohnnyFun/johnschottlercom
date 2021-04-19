<div class="panel">
  <slot />
</div>

<style>
  .panel {
    position: fixed;
    width: var(--left-menu-width);
    right:0;
    z-index: 100;
    background-color: #222;
    bottom:0;
    top:var(--top-nav-height);
  }
</style>