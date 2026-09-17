export function enableDebugTools(scene, enabledByDefault) {
  // handy ui for inspecting/modifying meshes and other stuff that's loaded on the page
  if (enabledByDefault) scene.debugLayer.show()
  window.addEventListener('keydown', ev => {
    // Shift+Ctrl+Alt+I to turn on debug inspector controls
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
      if (scene.debugLayer.isVisible()) scene.debugLayer.hide()
      else scene.debugLayer.show()
    }
  })
}