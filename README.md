# 🌪️ WORLD STORM - Battle Royale Game

A fast-paced 3D Battle Royale game built with **HTML5, CSS3, and JavaScript**. Features solo and duo modes with dynamic storm mechanics, 30-player matches, and unique Storm Core gameplay.

## 🎮 Game Overview

**WORLD STORM** is an original battle royale experience with:
- **30 Players** competing on a diverse island
- **Solo & Duo Modes** for different playstyles
- **Dynamic Storm System** that shrinks over time
- **Unique Storm Core Mechanic** - Control the next storm!
- **15 Unique Locations** across the map
- **Multiple Weapons** with different stats and mechanics
- **Full PC & Mobile Support**

## 📋 Current Features (Phase 1-3)

✅ Main Menu with Solo/Duo selection  
✅ Lobby system with player count  
✅ Player movement (Walk, Run, Sprint, Crouch)  
✅ Free 360° camera controls  
✅ Health & Armor system  
✅ Ammo management  
✅ Basic weapon system (Assault Rifle)  
✅ Storm mechanics with damage  
✅ Minimap with player positions  
✅ HUD with compass, health bar, ammo counter  
✅ Victory screen with stats  
✅ Responsive mobile UI  

## 🕹️ Controls

### PC Controls
```
W A S D     = Move
Mouse       = Look around
Shift       = Sprint
C           = Crouch
Space       = Jump
Left Click  = Shoot
Right Click = Aim
R           = Reload
E           = Interact
```

### Mobile Controls
```
Left Joystick   = Movement
Right Side      = Camera control
Buttons         = Jump, Crouch, Sprint, Shoot, Aim, Reload, Interact
```

## 🗺️ Island Locations

1. **Big City** - Urban environment with buildings
2. **Small Village** - Rural settlement
3. **Port** - Coastal trading hub
4. **Beach** - Sandy shoreline
5. **Industrial Area** - Factories and warehouses
6. **Mountains** - High terrain with peaks
7. **Mountain Village** - Elevated settlement
8. **Forest** - Dense trees
9. **Jungle** - Tropical vegetation
10. **Waterfalls** - Water features and cliffs
11. **Jungle Ruins** - Ancient structures
12. **Caves** - Underground passages
13. **Underground Paths** - Tunnel network
14. **Volcano** - Volcanic crater
15. **Central Storm Core** - Secret location (Storm objective)

## 🌪️ Storm Mechanics

- **Initial Phase**: Safe zone appears on map
- **Shrinking**: Storm radius gradually decreases
- **Damage Ring**: Players outside safe zone take damage
- **Storm Core**: Hidden location revealed mid-match
- **Special Storms**: Core captor chooses storm type:
  - 🌪️ **Tornado** - High wind movement effects
  - ⚡ **Lightning** - Electrical hazards
  - 🔥 **Firestorm** - Heat damage over area
  - ❄️ **Ice Storm** - Slowed movement
  - 🌊 **Floodstorm** - Rising water level

## 🎯 Game Modes

### Solo
- 30 players compete individually
- Last player standing wins
- Full autonomy required

### Duo
- 15 teams of 2 players
- Storm Core capturing requires teamwork
- One teammate captures, other protects
- Team victory when last duo survives

## 💾 Project Structure

```
world-storm-game/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── game.js             # Core game logic and engine
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🚀 Getting Started

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation needed - runs directly in browser

### Running the Game

1. **Clone or download** the repository
2. **Open `index.html`** in your web browser
3. **Click Solo or Duo** to start a match
4. **Wait for lobby** (simulated 2-second loading)
5. **Play!** - Movement, shooting, and survival

### Local Development

```bash
# No build process needed!
# Simply edit files and refresh browser

# For local testing with server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 📚 Game Classes

### `Player`
Represents a player character with:
- Position and velocity
- Health, armor, and ammo
- Weapon inventory
- Stats tracking (kills, damage, survival time)

### `Storm`
Manages the shrinking storm with:
- Center position and radius
- Damage calculation
- Special storm mechanics
- Phase progression

### `GameState`
Handles overall game logic:
- Player management
- Match duration
- Win conditions
- Map locations

### `CameraController`
Manages player perspective:
- 3D camera rotation
- Mouse look controls
- Field of view

### `InputHandler`
Processes user input:
- Keyboard movement
- Mouse look and actions
- Action handling (jump, crouch, shoot, reload)

### `GameEngine`
Main game loop coordinator:
- Rendering updates
- Physics simulation
- HUD updates
- Game state transitions

## 📈 Development Roadmap

### Phase 1 ✅ Player + Camera + Movement
- Character movement system
- Free 360° camera
- Input handling

### Phase 2 🔄 Island
- 3D environment rendering
- 15 unique locations
- Terrain and collision

### Phase 3 🔄 Weapons + Shooting
- Multiple weapon types
- Bullet physics
- Damage calculation

### Phase 4 📦 Loot + Inventory
- Item pickup system
- Inventory management
- Equipment system

### Phase 5 🌪️ Storm
- Dynamic shrinking safe zone
- Storm damage
- Phase transitions

### Phase 6 🎯 Storm Core
- Core location reveal
- Capture mechanics
- Progress bar system

### Phase 7 👹 Storm Warden
- Boss AI entity
- Attack patterns
- Defeat mechanics

### Phase 8 ⚡ Special Storms
- Tornado effects
- Lightning strikes
- Firestorm spread
- Ice storm slowness
- Floodstorm water

### Phase 9 🤖 Bots
- AI player logic
- Combat behavior
- Movement patterns

### Phase 10 👥 Solo + Duo Modes
- Mode-specific rules
- Team mechanics
- Respawn systems

### Phase 11 🌐 Multiplayer
- WebSocket server
- Player synchronization
- Real-time communication

### Phase 12 📱 Mobile Optimization
- Touch controls
- Responsive layout
- Performance tuning

### Phase 13 ✅ Testing
- QA testing
- Bug fixes
- Balance adjustments

### Phase 14 🔨 Platform Builds
- Android APK
- iOS compilation
- PC executable

### Phase 15 📤 Publishing
- Store submission
- Marketing
- Community management

## 🎨 Customization

### Change Colors
Edit `styles.css` - Look for color values like `#00d4ff` (cyan)

### Adjust Game Settings
Edit `game.js` - Modify constants in class constructors:
```javascript
const maxPlayers = 30;
const stormShrinkRate = 0.5;
const damagePerSecond = 2;
```

### Weapon Balance
Modify weapon stats in `Player.weapons`:
```javascript
assaultRifle: {
    damage: 35,
    fireRate: 600,
    accuracy: 0.8,
    recoil: 0.15,
    magSize: 30,
    reloadTime: 2.5
}
```

## 🐛 Known Limitations

- No 3D rendering yet (using canvas 2D)
- No actual bullet physics
- No multiplayer connectivity
- No sound effects
- No particle effects
- Basic bot AI

## 🔜 Next Steps

1. **Add 3D Rendering** - Implement Three.js for 3D graphics
2. **Create Island Terrain** - Build detailed map geometry
3. **Add Weapons** - Implement SMG, Shotgun, Sniper, Pistol, Melee
4. **Implement Loot System** - Add item spawning and pickup
5. **Enhance Storm Effects** - Visual representations of special storms
6. **Create Sound System** - Audio for shooting, effects, music

## 📝 License

Original game design by heshwing2
All code, assets, and game design are original creations.
Not affiliated with PUBG, BGMI, Free Fire, or other battle royale games.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, suggestions, or feedback:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed descriptions

## 🎉 Enjoy Playing!

**WORLD STORM** is constantly evolving. Thanks for being part of this journey!

---

**Last Updated**: September 2026  
**Current Version**: 0.1.0 (Alpha)  
**Status**: Active Development 🚀
