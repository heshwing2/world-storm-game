// World Storm - Battle Royale Game
// Game Logic and Engine

class Player {
    constructor(id, x, y, z) {
        this.id = id;
        this.position = { x, y, z };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.health = 100;
        this.maxHealth = 100;
        this.armor = 0;
        this.maxArmor = 100;
        this.ammo = { current: 30, reserve: 120 };
        this.isAlive = true;
        this.isSprinting = false;
        this.isCrouching = false;
        this.isJumping = false;
        this.kills = 0;
        this.damage = 0;
        this.survivalTime = 0;
        
        // Weapon stats
        this.currentWeapon = 'assaultRifle';
        this.weapons = {
            assaultRifle: {
                name: 'Assault Rifle',
                damage: 35,
                fireRate: 600,
                accuracy: 0.8,
                recoil: 0.15,
                magSize: 30,
                reloadTime: 2.5
            }
        };
    }

    update(deltaTime) {
        if (!this.isAlive) return;

        // Update velocity
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.position.z += this.velocity.z * deltaTime;

        // Apply gravity
        this.velocity.y -= 9.81 * deltaTime;

        // Update survival time
        this.survivalTime += deltaTime;

        // Clamp to ground
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            this.isJumping = false;
        }
    }

    takeDamage(amount) {
        const armorAbsorb = Math.min(this.armor, amount * 0.75);
        const healthDamage = amount - armorAbsorb;
        
        this.armor -= armorAbsorb;
        this.health -= healthDamage;
        this.damage += amount;

        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    addArmor(amount) {
        this.armor = Math.min(this.maxArmor, this.armor + amount);
    }
}

class Storm {
    constructor(mapSize) {
        this.mapSize = mapSize;
        this.centerX = mapSize / 2;
        this.centerZ = mapSize / 2;
        this.radius = mapSize / 2;
        this.minRadius = 50;
        this.shrinkRate = 0.5; // units per second
        this.damagePerSecond = 2;
        this.phase = 0;
        this.isActive = false;
        this.damageRingWidth = 50;
        
        // Special storm properties
        this.specialStormType = null;
        this.specialStormActive = false;
        this.specialStormDuration = 30;
        this.specialStormTimer = 0;
    }

    update(deltaTime) {
        if (this.isActive) {
            this.radius = Math.max(this.minRadius, this.radius - this.shrinkRate * deltaTime);
            
            if (this.specialStormActive) {
                this.specialStormTimer += deltaTime;
                if (this.specialStormTimer >= this.specialStormDuration) {
                    this.specialStormActive = false;
                    this.specialStormType = null;
                }
            }
        }
    }

    getDamageForPlayer(playerX, playerZ) {
        const distance = Math.sqrt(
            Math.pow(playerX - this.centerX, 2) + 
            Math.pow(playerZ - this.centerZ, 2)
        );

        if (distance > this.radius + this.damageRingWidth) {
            return this.damagePerSecond;
        }
        return 0;
    }

    activateSpecialStorm(stormType) {
        this.specialStormType = stormType;
        this.specialStormActive = true;
        this.specialStormTimer = 0;
    }

    start() {
        this.isActive = true;
        this.phase = 0;
    }
}

class GameState {
    constructor() {
        this.mode = 'solo'; // 'solo' or 'duo'
        this.players = new Map();
        this.playerId = Math.random().toString(36).substr(2, 9);
        this.localPlayer = null;
        this.maxPlayers = 30;
        this.playersAlive = this.maxPlayers;
        this.gameStarted = false;
        this.gameEnded = false;
        this.matchDuration = 0;
        this.mapSize = 2000;
        this.storm = new Storm(this.mapSize);
        
        // Map locations
        this.locations = [
            { name: 'Big City', x: 300, z: 300, radius: 200 },
            { name: 'Small Village', x: 1700, z: 500, radius: 150 },
            { name: 'Port', x: 500, z: 1800, radius: 180 },
            { name: 'Beach', x: 1800, z: 1700, radius: 200 },
            { name: 'Industrial Area', x: 1000, z: 100, radius: 160 },
            { name: 'Mountains', x: 200, z: 1000, radius: 250 },
            { name: 'Mountain Village', x: 300, z: 1400, radius: 140 },
            { name: 'Forest', x: 800, z: 800, radius: 300 },
            { name: 'Jungle', x: 1400, z: 1200, radius: 280 },
            { name: 'Waterfalls', x: 1600, z: 800, radius: 120 },
            { name: 'Jungle Ruins', x: 1500, z: 1500, radius: 100 },
            { name: 'Caves', x: 600, z: 600, radius: 110 },
            { name: 'Underground Paths', x: 700, z: 700, radius: 130 },
            { name: 'Volcano', x: 1200, z: 1600, radius: 180 },
            { name: 'Central Storm Core', x: 1000, z: 1000, radius: 80 }
        ];
    }

    initializeGame(mode) {
        this.mode = mode;
        this.localPlayer = new Player(this.playerId, 1000, 500, 1000);
        this.players.set(this.playerId, this.localPlayer);
        
        // Simulate other players for testing
        for (let i = 0; i < this.maxPlayers - 1; i++) {
            const botId = 'bot_' + i;
            const randomLocation = this.locations[Math.floor(Math.random() * this.locations.length)];
            const botX = randomLocation.x + (Math.random() - 0.5) * randomLocation.radius;
            const botZ = randomLocation.z + (Math.random() - 0.5) * randomLocation.radius;
            const bot = new Player(botId, botX, 0, botZ);
            this.players.set(botId, bot);
        }
        
        this.gameStarted = true;
        this.storm.start();
    }

    startMatch() {
        this.gameStarted = true;
        this.matchDuration = 0;
        this.storm.start();
    }

    update(deltaTime) {
        if (!this.gameStarted || this.gameEnded) return;

        this.matchDuration += deltaTime;

        // Update all players
        this.players.forEach(player => {
            player.update(deltaTime);
            
            // Apply storm damage
            if (player.isAlive) {
                const stormDamage = this.storm.getDamageForPlayer(player.position.x, player.position.z);
                if (stormDamage > 0) {
                    player.takeDamage(stormDamage * deltaTime);
                }
            }
        });

        // Update storm
        this.storm.update(deltaTime);

        // Count alive players
        this.playersAlive = Array.from(this.players.values()).filter(p => p.isAlive).length;

        // Check win condition
        if (this.playersAlive <= 1) {
            this.gameEnded = true;
        }
    }

    getPlayerStats() {
        if (!this.localPlayer) return null;
        
        const aliveCount = Array.from(this.players.values()).filter(p => p.isAlive).length;
        const position = aliveCount + 1;

        return {
            position,
            kills: this.localPlayer.kills,
            damage: Math.floor(this.localPlayer.damage),
            survivalTime: Math.floor(this.localPlayer.survivalTime),
            playersAlive: this.playersAlive
        };
    }
}

// Camera Controller
class CameraController {
    constructor(player, canvas) {
        this.player = player;
        this.canvas = canvas;
        this.pitch = 0;
        this.yaw = 0;
        this.sensitivity = 0.005;
        this.fov = 75;
        
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', () => this.canvas.requestPointerLock?.());
    }

    onMouseMove(event) {
        if (document.pointerLockElement === this.canvas) {
            this.yaw += event.movementX * this.sensitivity;
            this.pitch -= event.movementY * this.sensitivity;
            
            // Clamp pitch
            this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
        }
    }

    getViewMatrix() {
        return {
            pitch: this.pitch,
            yaw: this.yaw,
            x: this.player.position.x,
            y: this.player.position.y + 1.6, // Eye height
            z: this.player.position.z
        };
    }
}

// Input Handler
class InputHandler {
    constructor(player, gameState) {
        this.player = player;
        this.gameState = gameState;
        this.keys = {};
        this.mouseDown = { left: false, right: false };
        
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onKeyDown(event) {
        this.keys[event.key.toLowerCase()] = true;
        this.handleAction(event.key.toLowerCase());
    }

    onKeyUp(event) {
        this.keys[event.key.toLowerCase()] = false;
    }

    onMouseDown(event) {
        if (event.button === 0) this.mouseDown.left = true;
        if (event.button === 2) this.mouseDown.right = true;
    }

    onMouseUp(event) {
        if (event.button === 0) this.mouseDown.left = false;
        if (event.button === 2) this.mouseDown.right = false;
    }

    handleAction(key) {
        switch(key) {
            case ' ':
                if (!this.player.isJumping) {
                    this.player.velocity.y = 7;
                    this.player.isJumping = true;
                }
                break;
            case 'c':
                this.player.isCrouching = !this.player.isCrouching;
                break;
            case 'r':
                this.reload();
                break;
            case 'e':
                this.interact();
                break;
        }
    }

    reload() {
        const weapon = this.player.weapons[this.player.currentWeapon];
        const needed = weapon.magSize - this.player.ammo.current;
        const transfer = Math.min(needed, this.player.ammo.reserve);
        this.player.ammo.current += transfer;
        this.player.ammo.reserve -= transfer;
    }

    interact() {
        // Proximity check for items/loot
        console.log('Player interacting...');
    }

    update(deltaTime) {
        if (!this.player.isAlive) return;

        // Movement
        const moveSpeed = this.player.isSprinting ? 8 : (this.player.isCrouching ? 2 : 4);
        const forward = (this.keys['w'] ? 1 : 0) - (this.keys['s'] ? 1 : 0);
        const right = (this.keys['d'] ? 1 : 0) - (this.keys['a'] ? 1 : 0);

        this.player.isSprinting = this.keys['shift'];

        // Simplified movement (forward in world space)
        this.player.velocity.x = right * moveSpeed;
        this.player.velocity.z = forward * moveSpeed;

        // Shooting
        if (this.mouseDown.left) {
            this.shoot();
        }
    }

    shoot() {
        const weapon = this.player.weapons[this.player.currentWeapon];
        if (this.player.ammo.current > 0) {
            this.player.ammo.current--;
            // Bullet logic would go here
            console.log('Pew! Ammo:', this.player.ammo.current);
        }
    }
}

// Game Engine
class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.gameState = new GameState();
        this.lastTime = Date.now();
        this.running = false;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('soloBtn').addEventListener('click', () => this.startGame('solo'));
        document.getElementById('duoBtn').addEventListener('click', () => this.startGame('duo'));
        document.getElementById('cancelLobbyBtn').addEventListener('click', () => this.returnToMenu());
        document.getElementById('returnToMenuBtn').addEventListener('click', () => this.returnToMenu());
    }

    startGame(mode) {
        this.showMenu('mainMenu', false);
        this.showMenu('lobbyScreen', true);
        
        // Simulate lobby
        setTimeout(() => {
            this.gameState.initializeGame(mode);
            this.localCamera = new CameraController(this.gameState.localPlayer, this.canvas);
            this.inputHandler = new InputHandler(this.gameState.localPlayer, this.gameState);
            
            this.showMenu('lobbyScreen', false);
            this.showMenu('gameHUD', true);
            
            this.gameState.startMatch();
            this.running = true;
            this.gameLoop();
        }, 2000);
    }

    returnToMenu() {
        this.running = false;
        this.gameState = new GameState();
        this.showMenu('mainMenu', true);
        this.showMenu('lobbyScreen', false);
        this.showMenu('gameHUD', false);
        this.showMenu('victoryScreen', false);
    }

    showMenu(menuId, show) {
        const menu = document.getElementById(menuId);
        if (menu) {
            if (show) {
                menu.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
            }
        }
    }

    gameLoop() {
        if (!this.running) return;

        const now = Date.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        // Update game state
        this.gameState.update(deltaTime);

        // Update input
        if (this.inputHandler) {
            this.inputHandler.update(deltaTime);
        }

        // Update HUD
        this.updateHUD();

        // Check win condition
        if (this.gameState.gameEnded) {
            this.showGameOver();
            return;
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    updateHUD() {
        const stats = this.gameState.getPlayerStats();
        if (!stats) return;

        // Update player counts
        document.getElementById('playerAliveCount').textContent = `Players Alive: ${stats.playersAlive}`;

        // Update health
        const healthPercent = (this.gameState.localPlayer.health / this.gameState.localPlayer.maxHealth) * 100;
        const healthBar = document.getElementById('healthBar');
        if (healthBar) {
            healthBar.style.width = healthPercent + '%';
        }
        document.getElementById('healthText').textContent = 
            `${Math.floor(this.gameState.localPlayer.health)}/${this.gameState.localPlayer.maxHealth}`;

        // Update ammo
        document.getElementById('ammoText').textContent = 
            `${this.gameState.localPlayer.ammo.current}/${this.gameState.localPlayer.ammo.reserve}`;

        // Update minimap
        this.updateMinimap();

        // Storm warning
        const distanceToCenter = Math.sqrt(
            Math.pow(this.gameState.localPlayer.position.x - this.gameState.storm.centerX, 2) +
            Math.pow(this.gameState.localPlayer.position.z - this.gameState.storm.centerZ, 2)
        );
        
        const stormWarning = document.getElementById('stormWarning');
        if (distanceToCenter > this.gameState.storm.radius + this.gameState.storm.damageRingWidth) {
            stormWarning.textContent = '⚠️ DANGER: Move to Safe Zone!';
            stormWarning.style.color = '#ff6b6b';
            document.getElementById('stormIndicator').classList.remove('hidden');
        } else {
            stormWarning.textContent = 'Safe Zone Stable';
            stormWarning.style.color = '#51cf66';
            document.getElementById('stormIndicator').classList.add('hidden');
        }
    }

    updateMinimap() {
        const canvas = document.getElementById('minimapCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const scale = canvas.width / this.gameState.mapSize;

        // Clear
        ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw storm circle
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.6)';
        ctx.beginPath();
        ctx.arc(
            this.gameState.storm.centerX * scale,
            this.gameState.storm.centerZ * scale,
            this.gameState.storm.radius * scale,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        // Draw player
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(
            this.gameState.localPlayer.position.x * scale,
            this.gameState.localPlayer.position.z * scale,
            3,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Draw other players
        ctx.fillStyle = 'rgba(255, 107, 107, 0.7)';
        this.gameState.players.forEach((player, id) => {
            if (id !== this.gameState.playerId && player.isAlive) {
                ctx.beginPath();
                ctx.arc(
                    player.position.x * scale,
                    player.position.z * scale,
                    2,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        });
    }

    showGameOver() {
        this.running = false;
        const stats = this.gameState.getPlayerStats();
        
        document.getElementById('statPosition').textContent = '#' + stats.position;
        document.getElementById('statKills').textContent = stats.kills;
        document.getElementById('statDamage').textContent = stats.damage;
        
        const minutes = Math.floor(stats.survivalTime / 60);
        const seconds = Math.floor(stats.survivalTime % 60);
        document.getElementById('statSurvivalTime').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        this.showMenu('gameHUD', false);
        this.showMenu('victoryScreen', true);
    }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    const engine = new GameEngine();
});
