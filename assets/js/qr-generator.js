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
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M,
        logo: null
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

    // Download functionality
    downloadBtn.addEventListener('click', function() {
        const format = document.querySelector('input[name="format"]:checked').value;
        const container = previewLight; // Use light version for download
        
        if (format === 'png') {
            // For PNG, we'll create a canvas to combine QR code and logo
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = currentSettings.width;
            canvas.height = currentSettings.height;
            
            // Draw QR code
            const qrImage = container.querySelector('img');
            ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);
            
            // Draw logo if present
            if (currentSettings.logo) {
                const logoSize = currentSettings.width * 0.2;
                const logoX = (canvas.width - logoSize) / 2;
                const logoY = (canvas.height - logoSize) / 2;
                
                const logo = new Image();
                logo.onload = function() {
                    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
                    // Create download link
                    const link = document.createElement('a');
                    link.download = 'qr-code.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                };
                logo.src = currentSettings.logo;
            } else {
                // If no logo, download immediately
                const link = document.createElement('a');
                link.download = 'qr-code.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        } else {
            // For SVG
            const svgElement = container.querySelector('svg');
            if (svgElement) {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const link = document.createElement('a');
                link.download = 'qr-code.svg';
                link.href = URL.createObjectURL(blob);
                link.click();
            }
        }
    });

    // Initial QR code generation
    updateQRCodes();
}); 