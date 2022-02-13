<canvas bind:this={canvas} touch-action="none"></canvas>
    
<script>
  import '@babylonjs/core/Debug/debugLayer'
  import '@babylonjs/inspector'
  import { ArcRotateCamera, Engine, Vector3 } from '@babylonjs/core'
  import game from './vrTank'
  import { onDestroy } from 'svelte'

  let canvas
  let engine
  let scene
  let debugCamera

  onDestroy(() => {
    scene?.dispose()
    engine?.dispose()
  })
  
  $: if (canvas) main()

  async function main() {
    buildEngineOnCanvas()
    await setScene(game)
    engine.runRenderLoop(() => scene.render())
  }

  function buildEngineOnCanvas() {
    // common foundation of any babylon app
    engine = new Engine(canvas)
    window.addEventListener('resize', () => engine.resize())
  }

  // You can have multiple scenes (cut scenes, loading scenes, game scenes, etc.)
  // Related: can pre-load scenes while showing a simple scene
  async function setScene(sceneBuilder) {
    const newScene = await sceneBuilder(engine, canvas)
    scene?.dispose()
    scene = newScene
    enableDebugTools(true)
  }

  function enableDebugTools(enabledByDefault) {
    // handy ui for inspecting/modifying meshes and other stuff that's loaded on the page
    if (enabledByDefault) scene.debugLayer.show()
    window.addEventListener('keydown', ev => {
      // Shift+Ctrl+Alt+I to turn on debug inspector controls
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide()
          debugCamera?.dispose()
        } else {
          scene.debugLayer.show()
          addDebugCamera()
        }
      }
    })
  }

  function addDebugCamera() {
    debugCamera = new ArcRotateCamera('camera', -1.925, 1.241, 29, new Vector3(), scene)
    debugCamera.attachControl(canvas, true)
    scene.activeCamera = debugCamera
  }
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 0;
    touch-action: none;
  }
</style>