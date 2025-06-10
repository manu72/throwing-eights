# Throwing Eights Website

A modern, responsive website for Throwing Eights, a software development company based in Melbourne, Australia.

## 🌟 Project Overview

This website serves as the online presence for Throwing Eights, showcasing our services, expertise, and providing a platform for potential clients to learn about and contact us.

## 🚀 Features

- Responsive design that works on all devices
- Modern and clean user interface
- Interactive navigation with smooth scrolling
- Service showcase with human-centered design focus
- Company information and founder profiles
- Interactive games:
  - Flappy Bird-style game with coins and progressive difficulty
- QR code generation and styling tools:
  - Basic QR code generator with customization options
  - Advanced QR code styling with color pickers and design options

## 📁 Project Structure

throwing-eights/
│
├── index.html # Main homepage
├── about.html # About page with company information
├── flappygame.html # Flappy Bird-style game
├── qr-generator.html # Basic QR code generator
├── qr-code-styling.html # Advanced QR code styling tool
├── assets/ # Static assets directory
│ ├── css/ # CSS stylesheets
│ │ ├── main.css # Main site styles
│ │ └── qr-generator.css # QR generator specific styles
│ ├── js/ # JavaScript files
│ │ ├── main.js # Main site functionality
│ │ ├── modal.js # Modal functionality
│ │ └── qr-generator.js # QR generator logic
│ ├── fonts/ # Self-hosted web fonts
│ └── images/ # Image assets
├── images/ # Additional images (banners, logos, etc.)
├── package.json # NPM dependencies
└── README.md # Project documentation

## 🛠️ Technology Stack

- HTML5
- CSS3 with modern features (Flexbox, Grid, Media Queries)
- JavaScript (ES6+)
- Font Awesome Icons
- jQuery - DOM manipulation and event handling
- Canvas API - 2D game rendering and background animations
- QR Code Libraries:
  - QRious for basic QR code generation
  - QR Code Styling for advanced customization
- Color Picker Library (@simonwep/pickr)
- Self-hosted web fonts (Google Fonts: Open Sans, Lobster)

## 🎮 Flappy Game

The Flappy Bird-style game is a fully-featured HTML5 Canvas game with progressive difficulty, coin collection, and mobile-responsive controls.

### How to Play

- **Desktop:** Press `Space` to make the bird flap
- **Mobile:** Tap the screen to make the bird flap
- Navigate through green pipes while collecting gold coins
- Game gets progressively harder as your score increases
- Avoid hitting pipes or the ground/ceiling

### Game Features

- **Progressive Difficulty:** Pipe gaps get smaller and spacing decreases as score increases
- **Coin Collection:** Collect gold coins for bonus points (5 points each)
- **High Score Tracking:** Automatically saves high scores and games played to localStorage
- **Mobile Responsive:** Adapts canvas size for different screen sizes and orientations
- **Sound Effects:** Crash sounds when hitting obstacles, coin collection sounds
- **Background Animation:** Scrolling background with custom imagery
- **Custom Bird:** Uses custom image (pam.png) with rotation based on velocity

### Configuration Settings

All game settings can be modified in `flappygame.html:188-277`. Key configuration constants:

#### Pipe Configuration
```javascript
const INITIAL_PIPE_GAP = 250;     // Starting gap between top and bottom pipes
const MIN_PIPE_GAP = 70;          // Minimum gap (hardest difficulty)
const GAP_REDUCTION = 10;         // Gap reduction per difficulty level
const SCORE_INTERVAL = 10;        // Points needed to increase difficulty
const INITIAL_PIPE_SPACING = 300; // Starting horizontal distance between pipes
const MIN_PIPE_SPACING = 100;     // Minimum horizontal spacing
const SPACING_REDUCTION = 10;     // Spacing reduction per difficulty level
const PIPE_WIDTH = 40;            // Width of pipes
const MIN_PIPE_HEIGHT = 50;       // Minimum height for pipe segments
```

#### Coin Configuration
```javascript
const COIN_SIZE = 15;             // Radius of coins in pixels
const COIN_VALUE = 5;             // Points awarded per coin
const COIN_SPAWN_CHANCE = 0.2;    // Probability of coin spawning (20%)
```

#### Game Physics
```javascript
// In resetGame() function (flappygame.html:267-269)
gravity = 0.3;                    // Downward acceleration
jumpStrength = -7;                // Upward velocity when flapping
pipeSpeed = 3;                    // Horizontal speed of pipes
```

#### Bird Configuration
```javascript
// Bird object properties (flappygame.html:257-264)
bird = {
  x: 50,                          // Horizontal position (fixed)
  y: HEIGHT / 3,                  // Starting vertical position
  radius: 15,                     // Collision radius (fallback)
  width: 30,                      // Image width
  height: 30,                     // Image height
  velocity: 0                     // Current vertical velocity
};
```

#### Visual Settings
```javascript
const BG_SCROLL_SPEED = 1;        // Background scrolling speed
// Canvas sizing in getCanvasSize() function (flappygame.html:145-159)
// Default: 600x600, mobile portrait: 90% width x 600 height
```

### Difficulty Progression

The game automatically increases difficulty based on score:
- Every 10 points (`SCORE_INTERVAL`), the pipe gap decreases by 10 pixels
- Horizontal spacing between pipes also decreases by 10 pixels
- Minimum limits prevent impossible gameplay
- Progression formula: `current = max(minimum, initial - (score/10) * reduction)`

### Audio Assets

- `squawk.mp3` - Crash/collision sound effect
- `coin.mp3` - Coin collection sound effect
- Sounds are dynamically loaded for better performance

### Image Assets

- `pam.png` - Custom bird sprite
- `bg.jpg` - Scrolling background image
- Fallback: Brown circle if bird image fails to load

## ⚙️ Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/throwing-eights.git
   cd throwing-eights
   ```

2. Install dependencies (for QR code generation):

   ```bash
   npm install
   ```

3. No build process is required - this is a static website. Simply open `index.html` in your browser to view the site.

4. For development, we recommend using a local server. You can use any of these options:
   - Python: `python -m http.server`
   - Node.js: `npx live-server`
   - Direct browser access: `open index.html` or `firefox index.html`

**Note:** Some features (like service worker for the Flappy Game) require HTTP server access and won't work with file:// protocol.

## 🚀 Deployment

The website can be deployed to any static hosting service. Some recommended options:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📝 Development Guidelines

- Follow semantic HTML practices
- Use BEM-like class naming for CSS (.block\_\_element--modifier)
- Ensure responsive design works on all screen sizes
- Test across multiple browsers
- Optimize images before committing
- Ensure game features work on both desktop and touch devices
- Use modern ES6+ JavaScript syntax with semicolons
- Use camelCase for function and variable names
- Always use try/catch for I/O operations (localStorage, files)
- Comment complex logic or non-obvious features
- Reference CLAUDE.md for complete project-specific guidelines

## 📞 Contact

- Website: [www.throwingeights.com.au](https://www.throwingeights.com.au)
- Location: Melbourne, Australia

## 📄 License

This project is proprietary. All rights reserved.
