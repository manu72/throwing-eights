document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const urlInput = document.getElementById('url');
    const sizeInput = document.getElementById('size');
    const sizeValue = document.querySelector('.size-value');
    const cornerStyle = document.getElementById('corner-style');
    const errorCorrection = document.getElementById('error-correction');
    const logoInput = document.getElementById('logo');
    const downloadBtn = document.getElementById('download-btn');
    const previewLight = document.querySelector('.preview-light');
    const previewDark = document.querySelector('.preview-dark');
    const switchBgBtn = document.getElementById('switch-bg');
    const downloadModal = document.getElementById('download-modal');
    const downloadOptions = document.querySelectorAll('.download-option');
    const modalClose = document.querySelector('.modal-close');

    // Update size input default value
    sizeInput.value = 140;
    sizeValue.textContent = '140 x 140';

    // Initialize color pickers
    const foregroundPicker = Pickr.create({
        el: '#foreground-picker',
        theme: 'classic',
        default: '#000000',
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                hex: true,
                rgba: true,
                input: true,
                save: true
            }
        }
    });

    const backgroundPicker = Pickr.create({
        el: '#background-picker',
        theme: 'classic',
        default: '#FFFFFF',
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                hex: true,
                rgba: true,
                input: true,
                save: true
            }
        }
    });

    // State object to track current settings
    let currentSettings = {
        text: "https://throwingeights.com.au",
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M,
        logo: null,
        isDarkMode: false // track which background is active
    };

    // Clear existing content
    previewLight.innerHTML = '';
    previewDark.innerHTML = '';

    // Function to update QR codes
    function updateQRCodes() {
        previewLight.innerHTML = '';
        previewDark.innerHTML = '';

        // Create light version
        new QRCode(previewLight, {
            text: currentSettings.text,
            width: currentSettings.width,
            height: currentSettings.height,
            colorDark: currentSettings.colorDark,
            colorLight: currentSettings.colorLight,
            correctLevel: currentSettings.correctLevel
        });

        // Create dark version
        new QRCode(previewDark, {
            text: currentSettings.text,
            width: currentSettings.width,
            height: currentSettings.height,
            colorDark: currentSettings.colorLight, // Swapped colors
            colorLight: currentSettings.colorDark,
            correctLevel: currentSettings.correctLevel
        });

        // Add logo if present
        if (currentSettings.logo) {
            const containers = [previewLight, previewDark];
            containers.forEach(container => {
                const qrImage = container.querySelector('img');
                const logoSize = currentSettings.width * 0.2; // Logo size 20% of QR code
                const logo = document.createElement('img');
                logo.src = currentSettings.logo;
                logo.style.position = 'absolute';
                logo.style.width = `${logoSize}px`;
                logo.style.height = `${logoSize}px`;
                logo.style.top = '50%';
                logo.style.left = '50%';
                logo.style.transform = 'translate(-50%, -50%)';
                container.style.position = 'relative';
                container.appendChild(logo);
            });
        }
    }

    // Event Listeners
    urlInput.addEventListener('input', function(e) {
        currentSettings.text = e.target.value || "https://throwingeights.com.au";
        updateQRCodes();
    });

    sizeInput.addEventListener('input', function(e) {
        const size = parseInt(e.target.value);
        sizeValue.textContent = `${size} x ${size}`;
        currentSettings.width = size;
        currentSettings.height = size;
        updateQRCodes();
    });

    errorCorrection.addEventListener('change', function(e) {
        switch(e.target.value) {
            case 'L': currentSettings.correctLevel = QRCode.CorrectLevel.L; break;
            case 'M': currentSettings.correctLevel = QRCode.CorrectLevel.M; break;
            case 'Q': currentSettings.correctLevel = QRCode.CorrectLevel.Q; break;
            case 'H': currentSettings.correctLevel = QRCode.CorrectLevel.H; break;
        }
        updateQRCodes();
    });

    foregroundPicker.on('save', (color) => {
        currentSettings.colorDark = color.toHEXA().toString();
        foregroundPicker.hide();
        updateQRCodes();
    });

    backgroundPicker.on('save', (color) => {
        currentSettings.colorLight = color.toHEXA().toString();
        backgroundPicker.hide();
        updateQRCodes();
    });

    logoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentSettings.logo = e.target.result;
                updateQRCodes();
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to toggle preview
    function togglePreview() {
        currentSettings.isDarkMode = !currentSettings.isDarkMode;
        previewLight.classList.toggle('active');
        previewDark.classList.toggle('active');
        switchBgBtn.textContent = currentSettings.isDarkMode ? 'Light Background' : 'Dark Background';
    }

    // Add switch button listener
    switchBgBtn.addEventListener('click', togglePreview);

    // Simplified modal handlers
    downloadBtn.addEventListener('click', function() {
        const modal = document.getElementById('download-modal');
        modal.style.display = 'flex';
    });

    document.querySelector('.modal-close').addEventListener('click', function() {
        const modal = document.getElementById('download-modal');
        modal.style.display = 'none';
    });

    document.getElementById('download-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Update the canvas generation in both PNG and SVG sections
    function createDownloadCanvas(qrImage, format) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Match SVG proportions
        const padding = 40;
        const textHeight = 30;
        const qrSize = currentSettings.width;
        const frameSize = qrSize + 40;
        
        // Set canvas size to match SVG
        canvas.width = frameSize + (padding * 2);
        canvas.height = frameSize + (padding * 2) + (textHeight * 2);
        
        // Fill background
        ctx.fillStyle = currentSettings.isDarkMode ? '#000000' : '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add "SCAN ME" text at the top with consistent spacing
        ctx.fillStyle = currentSettings.isDarkMode ? '#FFFFFF' : '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SCAN ME', canvas.width / 2, padding);
        
        // Draw frame corners
        const cornerLength = 40;
        const frameX = padding;
        const frameY = padding + textHeight;
        ctx.strokeStyle = '#0088ff';
        ctx.lineWidth = 4;
        
        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(frameX, frameY + cornerLength);
        ctx.lineTo(frameX, frameY);
        ctx.lineTo(frameX + cornerLength, frameY);
        ctx.stroke();
        
        // Top-right corner
        ctx.beginPath();
        ctx.moveTo(frameX + frameSize - cornerLength, frameY);
        ctx.lineTo(frameX + frameSize, frameY);
        ctx.lineTo(frameX + frameSize, frameY + cornerLength);
        ctx.stroke();
        
        // Bottom-left corner
        ctx.beginPath();
        ctx.moveTo(frameX, frameY + frameSize - cornerLength);
        ctx.lineTo(frameX, frameY + frameSize);
        ctx.lineTo(frameX + cornerLength, frameY + frameSize);
        ctx.stroke();
        
        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(frameX + frameSize - cornerLength, frameY + frameSize);
        ctx.lineTo(frameX + frameSize, frameY + frameSize);
        ctx.lineTo(frameX + frameSize, frameY + frameSize - cornerLength);
        ctx.stroke();
        
        // Draw QR code (centered within frame)
        const qrX = padding + 20;
        const qrY = padding + textHeight + 20;
        ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
        
        // Add URL text at the bottom with consistent spacing
        ctx.font = '16px Arial';
        ctx.fillStyle = currentSettings.isDarkMode ? '#FFFFFF' : '#000000';
        ctx.fillText(currentSettings.text, canvas.width / 2, frameSize + (padding * 2) + textHeight);
        
        // If there's a logo, add it
        if (currentSettings.logo) {
            const logoSize = qrSize * 0.2;
            const logoX = qrX + (qrSize - logoSize) / 2;
            const logoY = qrY + (qrSize - logoSize) / 2;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        }
        
        return canvas;
    }

    // Update the download handler to use the new canvas function
    downloadOptions.forEach(option => {
        option.addEventListener('click', function() {
            const format = this.dataset.format;
            const activePreview = currentSettings.isDarkMode ? previewDark : previewLight;
            const qrImage = activePreview.querySelector('img');
            
            if (format === 'png') {
                const canvas = createDownloadCanvas(qrImage, format);
                downloadCanvas(canvas);
            } else {
                // For SVG, create equivalent SVG structure
                const svgNS = "http://www.w3.org/2000/svg";
                const svg = document.createElementNS(svgNS, "svg");
                const padding = 40;
                const textHeight = 30;
                const qrSize = currentSettings.width;
                const frameSize = qrSize + 40;
                
                // Set SVG size
                svg.setAttribute("width", (frameSize + (padding * 2)).toString());
                svg.setAttribute("height", (frameSize + (padding * 2) + (textHeight * 2)).toString());
                svg.setAttribute("xmlns", svgNS);
                
                // Add background
                const rect = document.createElementNS(svgNS, "rect");
                rect.setAttribute("width", "100%");
                rect.setAttribute("height", "100%");
                rect.setAttribute("fill", currentSettings.isDarkMode ? "#000000" : "#FFFFFF");
                svg.appendChild(rect);
                
                // Add frame corners
                const cornerLength = 40;
                const frameX = padding;
                const frameY = padding + textHeight;
                
                const corners = document.createElementNS(svgNS, "path");
                corners.setAttribute("d", `
                    M ${frameX} ${frameY + cornerLength} L ${frameX} ${frameY} L ${frameX + cornerLength} ${frameY}
                    M ${frameX + frameSize - cornerLength} ${frameY} L ${frameX + frameSize} ${frameY} L ${frameX + frameSize} ${frameY + cornerLength}
                    M ${frameX} ${frameY + frameSize - cornerLength} L ${frameX} ${frameY + frameSize} L ${frameX + cornerLength} ${frameY + frameSize}
                    M ${frameX + frameSize - cornerLength} ${frameY + frameSize} L ${frameX + frameSize} ${frameY + frameSize} L ${frameX + frameSize} ${frameY + frameSize - cornerLength}
                `);
                corners.setAttribute("stroke", "#0088ff");
                corners.setAttribute("stroke-width", "4");
                corners.setAttribute("fill", "none");
                svg.appendChild(corners);
                
                // Add "SCAN ME" text
                const scanText = document.createElementNS(svgNS, "text");
                scanText.setAttribute("x", "50%");
                scanText.setAttribute("y", padding.toString());
                scanText.setAttribute("text-anchor", "middle");
                scanText.setAttribute("font-family", "Arial");
                scanText.setAttribute("font-size", "24");
                scanText.setAttribute("font-weight", "bold");
                scanText.setAttribute("fill", currentSettings.isDarkMode ? "#FFFFFF" : "#000000");
                scanText.textContent = "SCAN ME";
                svg.appendChild(scanText);
                
                // Add QR code
                const image = document.createElementNS(svgNS, "image");
                image.setAttribute("x", (padding + 20).toString());
                image.setAttribute("y", (padding + textHeight + 20).toString());
                image.setAttribute("width", qrSize.toString());
                image.setAttribute("height", qrSize.toString());
                image.setAttribute("href", qrImage.src);
                svg.appendChild(image);
                
                // Add URL text
                const urlText = document.createElementNS(svgNS, "text");
                urlText.setAttribute("x", "50%");
                urlText.setAttribute("y", (frameSize + (padding * 2) + textHeight).toString());
                urlText.setAttribute("text-anchor", "middle");
                urlText.setAttribute("font-family", "Arial");
                urlText.setAttribute("font-size", "16");
                urlText.setAttribute("fill", currentSettings.isDarkMode ? "#FFFFFF" : "#000000");
                urlText.textContent = currentSettings.text;
                svg.appendChild(urlText);
                
                // Download SVG
                const svgData = new XMLSerializer().serializeToString(svg);
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'qr-code.svg';
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            }
            downloadModal.style.display = 'none';
        });
    });

    // Helper function for downloading canvas
    function downloadCanvas(canvas) {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // Initial QR code generation
    updateQRCodes();

    // Initialize UI
    previewLight.classList.add('active'); // Start with light mode
    switchBgBtn.textContent = 'Switch to Dark Background';
}); 