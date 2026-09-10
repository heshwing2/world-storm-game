# 🚀 Quick Start Guide - World Storm

Get World Storm running in **30 seconds**!

## ⚡ Fastest Way to Play

### Option 1: Direct File Open (Easiest)
1. Download or clone the repository
2. Open `index.html` directly in your web browser
3. Click **SOLO** or **DUO**
4. Wait 2 seconds for lobby
5. **Play!**

✅ No installation needed  
✅ No server required  
✅ Works offline

### Option 2: Local Web Server (Recommended)

**Using Python 3:**
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

## 🎮 How to Play

### Main Menu
- Click **👤 SOLO** for solo mode (30 players, last one wins)
- Click **👥 DUO** for duo mode (15 teams, team cooperation needed)

### In-Game Controls (PC)

| Key | Action |
|-----|--------|
| **W** | Move Forward |
| **A** | Move Left |
| **S** | Move Backward |
| **D** | Move Right |
| **SPACE** | Jump |
| **SHIFT** | Sprint (Run Faster) |
| **C** | Crouch |
| **MOUSE** | Look Around |
| **LEFT CLICK** | Shoot |
| **RIGHT CLICK** | Aim |
| **R** | Reload |
| **E** | Interact |

### Mobile Controls (Touch)
- **Left Joystick** - Move around
- **Right Side** - Swipe to look around
- **Buttons** - Jump, Crouch, Sprint, Shoot, etc.

## 📊 Game Objective

### Solo Mode
- 30 players land on the island
- Fight other players to survive
- Storm shrinks, forcing players together
- **Last player alive wins!**

### Duo Mode
- 15 teams of 2 players each
- Cooperate to find weapons and survive
- One teammate can capture the Storm Core
- **Last team alive wins!**

## 🌪️ The Storm

The storm is the center mechanic:
- **Red zone on minimap** = Dangerous area
- **Safe zone (blue circle)** = Where you need to be
- **Storm damage** = Takes health if you're outside safe zone
- **Shrinking speed** = Gets tighter over time
- Forces all players to eventually meet

### Storm Core (Special Mechanic)
1. Hidden at match start
2. Symbol appears in sky mid-match
3. Players race to capture it
4. Capturer chooses the next storm type:
   - 🌪️ Tornado
   - ⚡ Lightning
   - 🔥 Firestorm
   - ❄️ Ice Storm
   - 🌊 Floodstorm

## 📍 Map Locations

Choose where to land:

```
BIG CITY          SMALL VILLAGE      PORT
  ▌▌                    ▌              ▌▌▌
                                     BEACH
MOUNTAINS         FOREST             ▌▌▌▌

MOUNTAIN VIL.     JUNGLE RUINS
    ▌              CAVES      VOLCANO
CAVES/TUNNELS     JUNGLE     WATERFALLS
                  ▌▌▌         ▌▌
          STORM CORE (Hidden)
          Appears Mid-Match
```

## ❤️ Health System

- **Health**: 0-100 HP
- **Armor**: 0-100 protection
- **Damage**: Armor absorbs 75% of damage first
- **Healing**: Find health items to restore
- **Death**: Health reaches 0 = eliminated

### Example Damage:
- Taking 100 damage with 50 armor:
  - Armor loses: 75 points → Now 0 armor
  - Health loses: 25 points → Health -25

## 🔫 Weapons & Ammo

Start with: **Assault Rifle**
- Magazine: 30 bullets
- Reserve: 120 ammo
- Damage per shot: 35

**Other weapons to find:**
- SMG (fast, less damage)
- Shotgun (powerful, close range)
- Sniper (long range, slow)
- Pistol (backup weapon)
- Melee (close combat)

### Ammo Management
- **Current ammo** shown as: `30/120`
- First number = bullets in magazine
- Second number = ammo in reserve
- Press **R** to reload

## 🏆 Victory Screen

When you win, you'll see:

```
VICTORY

Position:        #1
Kills:          5
Damage:         234
Survival Time:  12:45

[RETURN TO MENU]
```

- **Position**: Your final ranking (1st = Winner)
- **Kills**: How many players you eliminated
- **Damage**: Total damage dealt to all players
- **Survival Time**: How long you lasted

## 🐛 Troubleshooting

### Game won't start?
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check browser console for errors (F12)
- Try opening `index.html` with a web server instead of direct file

### Mouse look not working?
- Click the game canvas first to activate it
- Move mouse inside the game window
- Some browsers require pointer lock permission

### Controls not responding?
- Make sure the game window is focused (clicked on)
- Try reloading the page
- Check browser console (F12) for JavaScript errors

### Mobile not working?
- Use a modern mobile browser (Chrome, Safari)
- Make sure touch is enabled
- Try landscape orientation
- Check screen size is sufficient

## 📱 Mobile Optimization

World Storm is designed to work on:
- ✅ Desktop (PC/Mac/Linux)
- ✅ Tablet (iPad, Android tablets)
- 🚧 Mobile (iPhone/Android - in development)

**Current mobile support**: Partial  
**Full support**: Coming in Phase 12

## 🎮 Tips & Tricks

### Survival Tips
1. **Land smart** - Avoid hot zones early
2. **Loot efficiently** - Grab weapons and ammo
3. **Use the minimap** - Watch other player locations
4. **Stay in safe zone** - Don't get caught in storm
5. **Listen for audio** - Enemy positions (coming soon)

### Combat Tips
1. **Aim carefully** - Each shot counts
2. **Reload strategically** - Find cover first
3. **Manage ammo** - Don't waste shots
4. **Team up in Duo** - Never fight alone
5. **Capture the Core** - Extra advantage (duo mode)

### Storm Tips
1. **Plan rotation** - Always move toward safe zone
2. **Watch circle** - Next safe zone appears early
3. **Avoid edges** - Storm pushes players inward
4. **Storm Core** - Best weapon choice wins
5. **Special storms** - Different mechanics each

## 📈 Game Phases

This is **Phase 1** with:
- ✅ Player movement
- ✅ Camera controls
- ✅ Basic combat system
- ✅ Storm mechanics
- ✅ Solo/Duo modes

**Coming next:**
- Phase 2: 3D Island terrain
- Phase 3: Full weapon variety
- Phase 4: Loot & inventory
- ... and 11 more phases!

## 🔧 Customization

### Change Game Settings
Edit `game.js`:

```javascript
// Max players per match
this.maxPlayers = 30;

// Storm shrink speed
this.shrinkRate = 0.5;

// Storm damage per second
this.damagePerSecond = 2;
```

### Change Colors
Edit `styles.css`:

```css
/* Primary color (currently cyan) */
#00d4ff

/* Success color (currently green) */
#51cf66

/* Danger color (currently red) */
#ff6b6b
```

### Adjust Difficulty
- Increase `damagePerSecond` = Harder
- Increase `shrinkRate` = Tighter timing
- Adjust weapon `damage` values = Different balance

## 📞 Getting Help

**Common Questions:**
- **Q: How do I win?**  
  A: Be the last player/team alive

- **Q: Where do I find weapons?**  
  A: Scattered across all map locations

- **Q: Can I play with friends?**  
  A: Solo/Duo modes only (multiplayer coming Phase 11)

- **Q: Is there a tutorial?**  
  A: This guide is it! Just play and learn

- **Q: Can I customize my character?**  
  A: Coming in future phases

**Need Technical Help?**
1. Check browser console (F12 → Console tab)
2. Look at DEVELOPMENT.md for code details
3. Open an issue on GitHub
4. Check repository issues for solutions

## 🎉 You're Ready!

You now know everything to play World Storm!

**Next steps:**
1. Open `index.html`
2. Click SOLO or DUO
3. Have fun! 🎮

---

**Welcome to World Storm!**  
*Where 30 players compete, 15 locations await, and only 1 emerges victorious.*

**Happy gaming! 🌪️⚡🔥❄️🌊**
