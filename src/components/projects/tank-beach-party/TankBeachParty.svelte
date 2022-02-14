<svelte:window on:resize={onWindowResize}></svelte:window>
<canvas bind:this={canvas} touch-action="none"></canvas>

{#if loading}
  <div class="status-msg">Loading...</div>
{/if}
{#if won}
  <div class="status-msg">
    You done good.
    <Btn on:click={reset}>Play again</Btn>
  </div>
{/if}
{#if lost}
  <div class="status-msg">
    You broke the tank!
    <Btn on:click={reset}>Play again</Btn>
  </div>
{/if}
<div class="controls">
  {#if showControls}
    <table>
      {#each controls as c}
        <tr>
          <td>{c[1]}</td>
          <td>
            {c[0]}
            {#if c[2]}<div><small>{c[2]}</small></div>{/if}
          </td>
        </tr>
      {/each}
    </table>
  {/if}
  
  <div class="links">
    <a href={null} on:click={() => showControls = !showControls}>
      {showControls ? 'Hide' : 'Show'} controls
    </a> |
    <a href="https://github.com/JohnnyFun/johnschottlercom/tree/master/src/components/projects/tank-beach-party">Github</a> |
    <a href="/">Home</a>
  </div>
</div>
    
<script>
  import '@babylonjs/core/Debug/debugLayer'
  import '@babylonjs/inspector'
  import { Engine } from '@babylonjs/core'
  import { onDestroy } from 'svelte'
  import { enableDebugTools } from 'services/babylonjs-utils'
  import { ActionManager, AmmoJSPlugin, Animation, Axis, Color3, ExecuteCodeAction, FollowCamera, HemisphericLight, MeshBuilder, PhysicsImpostor, Scene, Sprite, SpriteManager, StandardMaterial, Texture, Tools, TransformNode, Vector3 } from '@babylonjs/core'
  import Ammo from 'ammo.js'
  import Btn from 'components/Btn.svelte'

  const arenaSize = 250
  const barrelTipDiameter = .6
  let canvas
  let engine
  let scene
  let loading = true
  let won = false
  let lost = false
  let showControls = false
  let inputMap = {}
  let tanks = {}
  let bullets
  let tankMaterial
  let deadTankMaterial
  
  const controls = [
    ['W, A, S, D', 'Drive tank'],
    ['Left and right arrow keys', 'Rotate turret', 'Hold shift to rotate turret faster'],
    ['Space bar', 'Fire'],
    ['Reset game', 'R'],
  ]

  onDestroy(() => {
    scene?.dispose()
    engine?.dispose()
  })
  
  $: if (canvas) init()

  function onWindowResize() {
    engine?.resize()
  }

  // You can have multiple scenes (cut scenes, loading scenes, game scenes, etc.)
  // Related: can pre-load scenes while showing a simple scene
  async function init() {
    engine = new Engine(canvas)
    engine.stopRenderLoop()
    scene = await createGameScene()
    enableDebugTools(scene, false)
    engine.runRenderLoop(() => scene.render())
    canvas?.focus() // so controls work without user having to click the page...though this does not seem to work at all
    loading = false
  }

  async function reset() {
    won = false
    lost = false
    engine.stopRenderLoop()
    scene = await createGameScene()
    engine.runRenderLoop(() => scene.render())
  }

  async function createGameScene() {
    scene = new Scene(engine)
    addTankMaterials()
    new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    bullets = new TransformNode('bullets', scene)
    await addPhysics()
    addInputTracking()
    addGround()
    addTrees()
    addCourse()
    const myTank = addMyTank()
    addAiTanks()
    addGameWinLoseFlow(myTank);
    return scene
  }

  function addGameWinLoseFlow(myTank) {
    let resettingGame=false;
    scene.onBeforeRenderObservable.add(async () => {
      if (myTank.isDead) {
        lost = true;
      } else {
        const allAiTanksAreDead=Object.values(tanks).filter(t => t!==myTank).every(tank => tank.isDead);
        if(allAiTanksAreDead)
        won = true;
      }

      if(inputMap['r']&&!resettingGame) {
        resettingGame=true;
        await reset();
      }
    });
  }

  function addTankMaterials() {
    tankMaterial = new StandardMaterial('tankMaterial', scene)
    const tankBumpTexture = new Texture('/textures/logwall.jpg', scene)
    tankMaterial.bumpTexture = tankBumpTexture
    tankMaterial.diffuseColor = Color3.FromHexString('#264514')

    deadTankMaterial = new StandardMaterial('deadTankMaterial', scene)
    const deadTankBumpTexture = new Texture('/textures/cheeto-fur.jpg', scene)
    deadTankMaterial.bumpTexture = deadTankBumpTexture
    deadTankMaterial.diffuseColor = Color3.FromHexString('#990000')
  }

  function addMyTank() {
    const myTank = addTank('myTank')
    const camera = new FollowCamera('camera', new Vector3(1, -2, 0), scene)
    
    // const camera = new ArcRotateCamera('camera', 0, 0, 10, new Vector3(0, 0, 0), scene)
    camera.lockedTarget = myTank.turret
    camera.cameraAcceleration = .03 // how quickly to accelerate to the "goal" position
    camera.maxCameraSpeed = 10 // speed at which acceleration is halted
    camera.position = new Vector3(0,0,-10)
    camera.heightOffset = 5
    camera.radius = 30
    camera.rotationOffset = 180 // not sure why in degress, but ok
    // camera.rotationQuaternion = turret.rotationQuaternion

    const observable = scene.onBeforeRenderObservable.add(() => {
      // if (won) observable.dispose()
      if (inputMap['w']) myTank.moveForward()
      if (inputMap['s']) myTank.moveBackward()
      
      // we change camera's rotationOffset, so it is always directly behind turret, even if the tank body turns
      // but this logic is definitely flawed...if you drive over crap and physics engine rotates tank, it's off...camera probably has way to account for this and use the _world_ roation to follow the turret or something like that
      if (inputMap['a']) camera.rotationOffset += Tools.ToDegrees(myTank.turnLeft())
      if (inputMap['d']) camera.rotationOffset += Tools.ToDegrees(myTank.turnRight())
      // if (inputMap['a']) {
      //   myTank.turnLeft()
      //   // camera.rotation = myTank.turret.rotation.clone()
      //   console.log(myTank.body.rotationQuaternion.y)
      //   camera.rotationQuaternion = myTank.body.rotationQuaternion.clone()
      // }
      // if (inputMap['d']) {
      //   myTank.turnRight()
      //   // camera.rotation = myTank.turret.rotation.clone()
      //   camera.rotationQuaternion = myTank.body.rotationQuaternion.clone()
      // }
      // if (inputMap['a']) myTank.turnLeft()
      // if (inputMap['d']) myTank.turnRight()

      if (inputMap['arrowleft']) myTank.rotateTurretLeft(inputMap['shift'])
      if (inputMap['arrowright']) myTank.rotateTurretRight(inputMap['shift'])

      if (inputMap['arrowup']) myTank.raiseBarrel()
      if (inputMap['arrowdown']) myTank.lowerBarrel()

      if (inputMap[' ']) myTank.shoot()
    })

    return myTank
  }

  async function addPhysics() {
    const ammo = await Ammo()
    scene.enablePhysics(new Vector3(0,-9.81,0), new AmmoJSPlugin(true, ammo))
  }

  function addTank(name) {
    const body = MeshBuilder.CreateBox(name, {
      height: 2,
      width: 6,
      depth: 10,
    }, scene)
    body.material = tankMaterial
    body.physicsImpostor = new PhysicsImpostor(body, PhysicsImpostor.BoxImpostor, { mass: 100, friction: .9, restitution: 1 }, scene)
    const turret = MeshBuilder.CreateBox(`${name}Turret`, {
      height: 1.3,
      width: 5,
      depth: 6,
    }, scene)
    // turret.physicsImpostor = new PhysicsImpostor(turret, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
    turret.position.y = 2
    turret.material = tankMaterial
    // turret.rotation.y = Math.PI / 4
    turret.parent = body

    const barrel = MeshBuilder.CreateCylinder(`${name}Barrel`, {
      diameterBottom: .9,
      diameterTop: barrelTipDiameter,
      height: 7,
    })
    // barrel.physicsImpostor = new PhysicsImpostor(barrel, PhysicsImpostor.CylinderImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
    barrel.setPivotPoint(new Vector3(0, -3.5, 0)) // rotate from base of barrel
    barrel.position.y = 3.5
    barrel.position.z = 2.8
    barrel.rotation.x = Math.PI / 2.3
    barrel.material = tankMaterial
    barrel.parent = turret

    const tankSpeed = .2
    const tankRotationSpeed = .03
    const turretRotationSpeed = .003
    const turretRotationSpeedFast = turretRotationSpeed * 8
    const bulletsPerSecond = 2
    const barrelRotationSpeed = .005
    const maxBarrelDownward = Tools.ToRadians(89.1)
    const maxBarrelUpward = Tools.ToRadians(58)
    const tank = {
      isDead: false,
      body, 
      turret,
      barrel,
      moveForward: () => body.moveWithCollisions(body.forward.scaleInPlace(tankSpeed)),
      moveBackward: () => body.moveWithCollisions(body.forward.scaleInPlace(-tankSpeed/2)),
      turnLeft: () => {
        body.rotate(Axis.Y, -tankRotationSpeed)
        return -tankRotationSpeed
      },
      turnRight: () => {
        body.rotate(Axis.Y, tankRotationSpeed)
        return tankRotationSpeed
      },
      rotateTurretLeft: fast => turret.rotate(Axis.Y, fast ? -turretRotationSpeedFast : -turretRotationSpeed),
      rotateTurretRight: fast => turret.rotate(Axis.Y, fast ? turretRotationSpeedFast : turretRotationSpeed),
      raiseBarrel: function() {this._moveBarrel(barrelRotationSpeed)},
      lowerBarrel: function() {this._moveBarrel(-barrelRotationSpeed)},
      _moveBarrel: (amount) => {
        barrel.addRotation(-amount, 0, 0)
        if (barrel.rotation.x < maxBarrelUpward) barrel.rotation.x = maxBarrelUpward
        if (barrel.rotation.x > maxBarrelDownward) barrel.rotation.x = maxBarrelDownward
      },
      shoot: function() {
        if (this._shooting) return
        this._shooting = true
        shootBullet(barrel)
        setTimeout(() => this._shooting = false, 1000 / bulletsPerSecond)
      },
      _shooting: false
    }
    tanks[name] = tank
    scene.onBeforeRenderObservable.add(() => {
      if (tank.body.position.y < -10/*fell off world*/) {
        tank.isDead = true
      }
    })
    return tank
  }

  function addInputTracking() {
    scene.actionManager = new ActionManager(scene)
    // toLowerCase so that 'a' and 'A' are the same and so that if you release shift, you don't have the capital version of th letter still marked as pressed...
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, e => inputMap[e.sourceEvent.key.toLowerCase()] = true))
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, e => inputMap[e.sourceEvent.key.toLowerCase()] = false))
  }

  function shootBullet(barrel) {
    const bulletDiameterFinal = 5
    const bullet = MeshBuilder.CreateSphere('bullet', {diameter: bulletDiameterFinal/*barrelTipDiameter*/}, scene)
    bullet.parent = barrel
    // bullet.visibility = .5
    bullet.position.y += 3.5 + bulletDiameterFinal/*barrelTipDiameter*//2 // position bullet at tip of barrel
    
    // const frameRate = 30
    // const growAnimation = new Animation('grow', 'scaling', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT)
    // growAnimation.setKeys([
    //   {
    //     frame: 0,
    //     value: new Vector3(0, 0, 0),
    //   },
    //   {
    //     frame: frameRate,
    //     value: new Vector3(bulletDiameterFinal, bulletDiameterFinal, bulletDiameterFinal),
    //   },
    // ])
    // bullet.animations = [growAnimation]
    // scene.beginAnimation(bullet, 0, frameRate, true)

    const beachBallMaterial = new StandardMaterial('beachBallMaterial', scene)
    const beachBallTexture = new Texture('/textures/beachball.png', scene)
    beachBallMaterial.diffuseTexture = beachBallTexture
    bullet.material = beachBallMaterial
    bullet.setParent(null) // now that it's positioned, unset it as child and send it off...
    bullet.physicsImpostor = new PhysicsImpostor(bullet, PhysicsImpostor.SphereImpostor, { mass: 10, restitution: .9 }, scene)
    bullet.physicsImpostor.setLinearVelocity(bullet.up.scale(30)) // bullet.up is directly up the barrel in local space, regardless of it's world rotation!!
    bullet.parent = bullets

    // when bullet collides with a tank, it should explode
    bullet.physicsImpostor.registerOnPhysicsCollide(Object.keys(tanks).map(name => tanks[name].body.physicsImpostor), (collider, collidedWith) => {
      setTimeout(() => collider.object.dispose(), 500) // wait a bit before removing bullet, so it can bounce off tank
      // could use the bullet's angular velocity to influence the direction the tank explodes toward, but this is good enough for now
      blowUpTank(tanks[collidedWith.object.name])
    })

    // setTimeout(() => bullet.dispose(), 30000) // instead wait til it's been stopped for a while or is below some y coord _and_ it's not already disposed/null
  }

  function blowUpTank(tank) {
    tank.isDead = true

    tank.body.material = deadTankMaterial
    tank.turret.material = deadTankMaterial
    tank.barrel.material = deadTankMaterial

    // tank.barrel.position = tank.barrel.getAbsolutePosition()
    // tank.turret.position = tank.turret.getAbsolutePosition()
    
    // tank.barrel.parent = null
    // tank.turret.parent = null

    tank.body.physicsImpostor.setLinearVelocity(new Vector3(0, 12, 9))
    tank.body.physicsImpostor.setAngularVelocity(new Vector3(2, 9, 8))

    // tank.turret.physicsImpostor = new PhysicsImpostor(tank.turret, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
    // tank.barrel.physicsImpostor = new PhysicsImpostor(tank.barrel, PhysicsImpostor.CylinderImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
  }

  function addCourse() {
    const course = new TransformNode('course', scene)

    const wallMaterial = new StandardMaterial('wallMaterial', scene)
    const wallTexture = new Texture('/textures/danger-ramp.png', scene)
    wallMaterial.diffuseTexture = wallTexture

    const blockade = MeshBuilder.CreateBox('blockade', { width: 10, height: .5, depth: 10 }, scene)
    blockade.position.z = -20
    blockade.position.x = 30
    blockade.rotation.y = Math.PI / 3
    blockade.rotation.x = -Math.PI / 2.3
    blockade.physicsImpostor = new PhysicsImpostor(blockade, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
    blockade.parent = course
    blockade.material = wallMaterial

    
    const ramp = MeshBuilder.CreateBox('ramp', { width: 10, height: .5, depth: 10 }, scene)
    ramp.position.z = 30
    ramp.position.x = 0
    ramp.position.y = .5
    ramp.rotation.y = Math.PI/2
    ramp.rotation.z = -Math.PI / 6
    ramp.physicsImpostor = new PhysicsImpostor(ramp, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
    ramp.parent = course
    ramp.material = wallMaterial

    const ramp2 = MeshBuilder.CreateBox('ramp2', { width: 10, height: .5, depth: 10 }, scene)
    ramp2.position.z = 40
    ramp2.position.x = 0
    ramp2.position.y = .5
    ramp2.rotation.y = -Math.PI/2
    ramp2.rotation.z = -Math.PI / 6
    ramp2.physicsImpostor = new PhysicsImpostor(ramp2, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .9, restitution: 0 }, scene)
    ramp2.parent = course
    ramp2.material = wallMaterial

  }

  function addGround() {
    // const ground = MeshBuilder.CreateGroundFromHeightMap('ground', '/textures/ground-height-map.png', {
    //   width: arenaSize,
    //   height: arenaSize,
    //   subdivisions: 10, // splits it into 20x20 grid. so 400 sections for good nuff resolution
    //   minHeight: 0,
    //   maxHeight: 10,
    // })
    // const groundMaterial = new StandardMaterial('groundMaterial', scene)
    // // const grassTexture = new GrassProceduralTexture('grassTexture', arenaSize*arenaSize, scene)
    // const groundTexture = new Texture('/textures/snow-medium.jpg', scene)
    // groundMaterial.diffuseTexture = groundTexture
    // // groundMaterial.ambientTexture = groundTexture // ambient handles shadows
    // ground.material = groundMaterial
    // ground.position.y = -.1

    const ground = MeshBuilder.CreateBox('ground', {
      width: arenaSize,
      depth: arenaSize,
      height: 1,
      subdivisions: 10,
    }, scene)
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0 }, scene)
    ground.position.y = -2
    // const grassTexture = new GrassProceduralTexture('grassTexture', arenaSize*arenaSize, scene) // seems super slow?
    const grassTexture = new Texture('/textures/sand.jpg', scene)
    // repeats the texture...but not sure on details
    grassTexture.uScale = 30
    grassTexture.vScale = 30
    const grassMaterial = new StandardMaterial('grassMaterial', scene)
    grassMaterial.ambientTexture = grassTexture
    ground.material = grassMaterial
  }


  function addTrees() {
    const totalTrees = 100
    const treeSpriteManager = new SpriteManager('treeSpriteManager', '/textures/palmTree.png', totalTrees, {width:600, height:1000}, scene)
    // place trees in the arena spread out (github copilot did this...very cool)
    for (let i = 0; i < totalTrees; i++) {
      const tree = new Sprite('tree' + i, treeSpriteManager)
      tree.position = new Vector3(
        Math.random() * arenaSize - arenaSize / 2,
        5,
        Math.random() * arenaSize - arenaSize / 2
      )
      tree.size = .5
      tree.height = 15
      tree.width = 9
      tree.isPickable = false
    }
  }

  function addAiTanks() {
    const totalTanks = 4
    const aiTanks = new TransformNode('aiTanks', scene)
    for (let i = 0; i < totalTanks; i++) {
      const tank = addTank('tank' + i, scene)
      tank.body.position = new Vector3(
        Math.random() * arenaSize - arenaSize / 2,
        5,
        Math.random() * arenaSize - arenaSize / 2
      )
      tank.body.rotate(Axis.Y, 59 + i*30)
      tank.body.parent = aiTanks
      // setTimeout(() => blowUpTank(tank), 3000) // to test explosion animation...
      scene.onBeforeRenderObservable.add(() => {
        // ai should move towards the player--use existing pathfinding algorithm. probably the one that tim used for his game builder
        // ai should shoot at the player
        tank.rotateTurretLeft(false)
      })
    }
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

  .status-msg {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 30%;
      color: #eee;
      font-size: 52px;
      text-align: center;
      background-color: #000;
      opacity: .9;
      padding: 20px;
      border-radius: 10px;
  }

  :global(.status-msg > a) {
    margin-top: 20px;
  }

  .controls {
      position: absolute;
      left:0;
      bottom:0;
      color: #eee;
      background-color: #000;
      padding: 12px;
      border-radius: 0 12px 0 0;
      font-size: 13px;
  }

  
  .controls > table {
    width: 500px;
    margin-bottom: 10px;
  }

  .controls > table > tr > td:last-child {
    text-align: right;
  }
  .controls > .links > a:hover {
    border: 1px solid rgb(245, 6, 83);
  }

  .controls > .links a {
    cursor: pointer;
    color: rgb(245, 6, 83);
    text-decoration: none;
    padding: 3px;
    border-radius: 3px;
    border: 1px solid transparent;
    transition: border .5s;
  }
</style>