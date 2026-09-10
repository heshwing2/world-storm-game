# World Storm - Development Guide

This guide walks you through the architecture and how to extend World Storm with new features.

## 📁 File Overview

### `index.html`
The main entry point containing:
- Game canvas element
- Menu screens (Main Menu, Lobby, Victory)
- HUD overlays (health bar, compass, minimap, crosshair)
- Storm selection screen
- Button event listeners

**Key IDs to reference:**
- `#gameCanvas` - Main 3D rendering area
- `#mainMenu` - Solo/Duo selection
- `#gameHUD` - In-game interface
- `#victoryScreen` - End-of-match stats

### `styles.css`
Complete styling with:
- Menu animations (fadeIn, slideUp)
- HUD positioning and styling
- Responsive design for mobile
- Color scheme (cyan #00d4ff, green #51cf66, red #ff6b6b)
- Loading spinner and transitions

**Theme Colors:**
- Primary (Cyan): `#00d4ff`
- Success (Green): `#51cf66`
- Danger (Red): `#ff6b6b`
- Warning (Yellow): `#ffd93d`

### `game.js`
Core game logic with 6 main classes:

#### 1. **Player Class**
```javascript
new Player(id, x, y, z)
```
Manages individual player state:
- `position` - 3D coordinates
- `velocity` - Movement vector
- `health` / `armor` - Health system
- `ammo` - Current and reserve ammunition
- `weapons` - Weapon definitions
- Methods:
  - `update(deltaTime)` - Physics and movement
  - `takeDamage(amount)` - Health reduction
  - `heal(amount)` - Recovery

**Adding a new weapon:**
```javascript
this.weapons.smg = {
    name: 'SMG',
    damage: 20,
    fireRate: 900,
    accuracy: 0.6,
    recoil: 0.25,
    magSize: 45,
    reloadTime: 1.8
};
```

#### 2. **Storm Class**
```javascript
new Storm(mapSize)
```
Manages the dynamic shrinking storm:
- `radius` - Current safe zone size
- `damagePerSecond` - Storm damage rate
- `specialStormType` - Current special storm
- Methods:
  - `update(deltaTime)` - Shrink over time
  - `getDamageForPlayer()` - Distance-based damage
  - `activateSpecialStorm(type)` - Activate special effect

**Adding a new special storm:**
```javascript
case 'icestorm':
    player.velocity.x *= 0.7;  // Slow movement
    player.velocity.z *= 0.7;
    break;
```

#### 3. **GameState Class**
```javascript
new GameState()
```
Tracks overall match state:
- `players` - Map of all players
- `storm` - Storm instance
- `locations` - Map locations with coordinates
- `gameStarted` / `gameEnded` - Match status
- Methods:
  - `initializeGame(mode)` - Setup match
  - `update(deltaTime)` - Main game loop logic
  - `getPlayerStats()` - End-match statistics

**Adding a new location:**
```javascript
{ name: 'New Area', x: 500, z: 750, radius: 150 }
```

#### 4. **CameraController Class**
```javascript
new CameraController(player, canvas)
```
First-person camera control:
- `pitch` / `yaw` - Rotation angles
- `sensitivity` - Mouse sensitivity
- `fov` - Field of view
- Methods:
  - `onMouseMove()` - Update rotation
  - `getViewMatrix()` - Camera position/rotation

**Adjusting sensitivity:**
```javascript
this.sensitivity = 0.003;  // Decrease for less sensitive
```

#### 5. **InputHandler Class**
```javascript
new InputHandler(player, gameState)
```
Processes all user input:
- Keyboard events (WASD, Space, C, R, E)
- Mouse events (shooting, aiming)
- Methods:
  - `update(deltaTime)` - Apply movement
  - `shoot()` - Fire weapon
  - `reload()` - Reload ammo
  - `interact()` - Trigger interactions

**Adding a new keybind:**
```javascript
case 'q':
    this.toggleInventory();
    break;
```

#### 6. **GameEngine Class**
```javascript
new GameEngine()
```
Main orchestrator:
- Initializes other systems
- Runs game loop
- Manages screen transitions
- Updates HUD
- Methods:
  - `startGame(mode)` - Start match
  - `gameLoop()` - Main update cycle
  - `updateHUD()` - Refresh UI
  - `showGameOver()` - Victory screen

## 🔧 Common Development Tasks

### Adding a New Weapon

1. **Define weapon stats in `Player` class:**
```javascript
this.weapons.shotgun = {
    name: 'Shotgun',
    damage: 80,
    fireRate: 100,
    accuracy: 0.5,
    recoil: 0.5,
    magSize: 8,
    reloadTime: 3.0
};
```

2. **Update weapon selection UI in `index.html`:**
```html
<button class="weapon-select" data-weapon="shotgun">Shotgun</button>
```

3. **Implement weapon switching in `InputHandler`:**
```javascript
case '2':
    this.player.currentWeapon = 'shotgun';
    break;
```

### Modifying Storm Behavior

Edit the `Storm` class:

```javascript
// Change shrink speed
this.shrinkRate = 0.3;  // units per second

// Change damage
this.damagePerSecond = 3;

// Adjust damage ring width
this.damageRingWidth = 75;
```

### Adding Storm Damage Effects

In `GameEngine.updateHUD()`:

```javascript
if (stormDamage > 0) {
    document.getElementById('stormWarning').style.color = '#ff6b6b';
    // Add visual effect
}
```

### Creating New Locations

Add to `GameState` locations array:

```javascript
{ 
    name: 'Floating Islands', 
    x: 1300, 
    z: 1300, 
    radius: 200 
}
```

Update minimap rendering to show location markers.

### Implementing Player Respawn

In `GameState.update()`:

```javascript
if (this.mode === 'duo' && teammate.isAlive) {
    deadPlayer.respawn(teammate.position);
}
```

## 🎮 Game Loop Flow

1. **Frame Start**
   - Calculate delta time
   - Process input (`InputHandler.update()`)

2. **Physics**
   - Update player positions (`Player.update()`)
   - Apply gravity
   - Check collisions

3. **Game Logic**
   - Update storm (`Storm.update()`)
   - Apply storm damage
   - Check win conditions

4. **Rendering**
   - Update camera (`CameraController.getViewMatrix()`)
   - Render 3D scene (future)
   - Update minimap

5. **HUD**
   - Update health bar
   - Refresh ammo counter
   - Show storm warnings
   - Update player count

## 📊 Data Structures

### Player Object
```javascript
{
    id: "player_id",
    position: { x: 1000, y: 0, z: 1000 },
    velocity: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    health: 100,
    maxHealth: 100,
    armor: 50,
    maxArmor: 100,
    ammo: { current: 30, reserve: 120 },
    isAlive: true,
    isSprinting: false,
    isCrouching: false,
    isJumping: false,
    kills: 5,
    damage: 234,
    survivalTime: 450
}
```

### Location Object
```javascript
{
    name: "Big City",
    x: 300,
    z: 300,
    radius: 200
}
```

### Weapon Object
```javascript
{
    name: "Assault Rifle",
    damage: 35,
    fireRate: 600,
    accuracy: 0.8,
    recoil: 0.15,
    magSize: 30,
    reloadTime: 2.5
}
```

## 🎨 UI/UX Customization

### Change Primary Color
Edit all instances of `#00d4ff` in `styles.css`

### Modify HUD Layout
Adjust positioning in `.hud-top`, `.hud-bottom`, `.hud-center` classes

### Update Menu Styles
Modify `.menu-btn`, `.menu-screen`, `.game-title` styles

### Add Custom Animations
```css
@keyframes customEffect {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
}
```

## 🐛 Debugging Tips

### Console Logging
Add to `game.js`:
```javascript
console.log('Player position:', this.player.position);
console.log('Storm radius:', this.storm.radius);
console.log('Players alive:', this.gameState.playersAlive);
```

### Visual Debugging
Add debug markers to minimap:
```javascript
ctx.fillStyle = 'yellow';
ctx.fillRect(debugX - 2, debugY - 2, 4, 4);
```

### Performance Monitoring
```javascript
const startTime = performance.now();
// ... code to measure
console.log('Time:', performance.now() - startTime, 'ms');
```

## 🚀 Performance Optimization

### Reduce Draw Calls
- Batch minimap rendering
- Use canvas offscreen rendering

### Optimize Physics
- Use spatial partitioning
- Limit collision checks per frame

### Memory Management
- Clean up disconnected players
- Reuse object pools
- Avoid creating objects in game loop

## 📝 Next Phase Tips

### Phase 2: Island (3D Rendering)
- Implement Three.js scene
- Load/generate terrain mesh
- Add location models
- Create collision geometry

### Phase 3: Weapons
- Implement bullet raycast
- Add weapon recoil animation
- Create muzzle flash effects
- Implement hit detection

### Phase 4: Loot System
- Create item spawning
- Implement pickup mechanics
- Build inventory UI
- Add item rarity system

## 🎓 Learning Resources

- **Three.js Documentation**: https://threejs.org/docs/
- **JavaScript Game Development**: MDN Web Docs
- **Battle Royale Game Design**: GDC talks, game design documents
- **WebGL Basics**: Learn about 3D rendering

---

**Need Help?**
- Check the README.md for feature list
- Review existing code comments
- Test in browser console
- Use browser DevTools for debugging
