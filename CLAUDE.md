# Throwing Eights Project Guidelines

## Build/Development
- For local development: Open the HTML files directly in browser
- Local server: `python -m http.server` or `npx live-server`
- Service worker testing: Must use HTTP server (not file://)
- Preview with: `open index.html` or `firefox index.html`

## Code Style
- JavaScript: Modern ES6+ syntax, semicolons at end of statements
- Functions: Use camelCase for function and variable names
- HTML: Use semantic elements, lowercase for attributes
- CSS: BEM-like class naming (.block__element--modifier)
- Error handling: Always use try/catch for I/O operations (localStorage, files)

## Project Structure
- `/assets` - Contains CSS, JS, and fonts
- Root - Contains main HTML pages
- Media files - Store in root or appropriate subdirectory
- External libraries - Imported via CDN or in `/assets` directory

## Documentation
- Comment complex logic or non-obvious features
- Use JSDoc-style comments for function documentation
- Include attribution for third-party code/assets