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
