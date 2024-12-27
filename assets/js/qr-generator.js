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

    // Modify download functionality to only use active preview
    downloadBtn.addEventListener('click', function() {
        const format = document.querySelector('input[name="format"]:checked').value;
        const activePreview = currentSettings.isDarkMode ? previewDark : previewLight;
        
        if (format === 'png') {
            // Create canvas for single QR code
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const padding = 20;
            const textHeight = 40;
            const qrSize = currentSettings.width;
            
            // Set canvas size for single QR code
            canvas.width = padding * 2 + qrSize;
            canvas.height = padding * 2 + qrSize + textHeight;
            
            // Fill background
            ctx.fillStyle = currentSettings.isDarkMode ? '#000000' : '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add URL text at the top
            ctx.fillStyle = currentSettings.isDarkMode ? '#FFFFFF' : '#000000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(currentSettings.text, canvas.width / 2, padding + 20);
            
            // Draw QR code
            const qrImage = activePreview.querySelector('img');
            ctx.drawImage(qrImage, padding, padding + textHeight, qrSize, qrSize);
            
            // If there's a logo, add it
            if (currentSettings.logo) {
                const logo = new Image();
                logo.onload = function() {
                    const logoSize = qrSize * 0.2;
                    const logoX = padding + (qrSize - logoSize) / 2;
                    const logoY = padding + textHeight + (qrSize - logoSize) / 2;
                    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
                    downloadCanvas(canvas);
                };
                logo.src = currentSettings.logo;
            } else {
                downloadCanvas(canvas);
            }
        } else {
            // For SVG
            const svg = activePreview.querySelector('svg');
            
            if (svg) {
                const svgNS = "http://www.w3.org/2000/svg";
                const wrapper = document.createElementNS(svgNS, "svg");
                const padding = 20;
                const textHeight = 40;
                const qrSize = currentSettings.width;
                
                wrapper.setAttribute("width", (padding * 2 + qrSize).toString());
                wrapper.setAttribute("height", (padding * 2 + qrSize + textHeight).toString());
                wrapper.setAttribute("xmlns", svgNS);
                
                // Add background
                const rect = document.createElementNS(svgNS, "rect");
                rect.setAttribute("width", "100%");
                rect.setAttribute("height", "100%");
                rect.setAttribute("fill", currentSettings.isDarkMode ? "#000000" : "#FFFFFF");
                wrapper.appendChild(rect);
                
                // Add URL text
                const text = document.createElementNS(svgNS, "text");
                text.setAttribute("x", (padding * 2 + qrSize) / 2);
                text.setAttribute("y", padding + 20);
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("font-family", "Arial");
                text.setAttribute("font-size", "16");
                text.setAttribute("fill", currentSettings.isDarkMode ? "#FFFFFF" : "#000000");
                text.textContent = currentSettings.text;
                wrapper.appendChild(text);
                
                // Add QR code
                const qrGroup = document.createElementNS(svgNS, "g");
                qrGroup.setAttribute("transform", `translate(${padding},${padding + textHeight})`);
                qrGroup.innerHTML = svg.innerHTML;
                wrapper.appendChild(qrGroup);
                
                // Download the SVG
                const svgData = new XMLSerializer().serializeToString(wrapper);
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const link = document.createElement('a');
                link.download = 'qr-code.svg';
                link.href = URL.createObjectURL(blob);
                link.click();
            }
        }
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