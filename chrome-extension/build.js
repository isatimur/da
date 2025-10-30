const fs = require('fs');
const path = require('path');

// CSS Minification function
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around specific characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove trailing semicolons
        .replace(/;}/g, '}')
        // Remove leading/trailing whitespace
        .trim();
}

// Bundle CSS files
function bundleCSS() {
    const cssDir = path.join(__dirname, 'css');
    const outputPath = path.join(__dirname, 'css', 'bundle.css');
    
    const cssFiles = [
        'fonts.css',
        'styles.css',
        'premium.css',
        'info-dialogs.css',
        'saved-backgrounds.css',
        'shepherd.css',
        'breathing.css',
        'todo.css',
        'onboarding.css'
    ];
    
    let bundledCSS = '';
    
    cssFiles.forEach(file => {
        const filePath = path.join(cssDir, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            bundledCSS += `/* ${file} */\n${content}\n\n`;
            console.log(`Bundled ${file}`);
        } else {
            console.warn(`CSS file not found: ${file}`);
        }
    });
    
    // Minify the bundled CSS
    const minifiedCSS = minifyCSS(bundledCSS);
    
    // Write bundled CSS
    fs.writeFileSync(outputPath, bundledCSS);
    console.log(`CSS bundle created: ${outputPath}`);
    
    // Write minified CSS
    const minifiedPath = path.join(__dirname, 'css', 'bundle.min.css');
    fs.writeFileSync(minifiedPath, minifiedCSS);
    console.log(`Minified CSS created: ${minifiedPath}`);
    
    return {
        bundle: outputPath,
        minified: minifiedPath,
        size: {
            original: bundledCSS.length,
            minified: minifiedCSS.length,
            savings: Math.round((1 - minifiedCSS.length / bundledCSS.length) * 100)
        }
    };
}

// Optimize images (placeholder for future implementation)
function optimizeImages() {
    const imagesDir = path.join(__dirname, 'images');
    console.log('Image optimization placeholder - implement with imagemin or similar');
}

// Generate build manifest
function generateBuildManifest() {
    // Read version from manifest.json
    const manifestPath = path.join(__dirname, 'manifest.json');
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifestJson = JSON.parse(manifestContent);
    const extensionVersion = manifestJson.version || '1.2.3';
    
    const manifest = {
        buildTime: new Date().toISOString(),
        version: extensionVersion,
        files: {
            css: ['bundle.css', 'bundle.min.css'],
            js: ['app.js', 'init.js'],
            images: fs.readdirSync(path.join(__dirname, 'images')).filter(f => f.match(/\.(png|jpg|jpeg|gif|svg)$/i))
        }
    };
    
    const manifestPath = path.join(__dirname, 'build-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Build manifest created: ${manifestPath}`);
    
    return manifest;
}

// Main build process
function build() {
    console.log('Starting build process...');
    
    try {
        // 1. Inject extension key
        const extensionKey = process.env.EXTENSION_KEY || generateSecureKey();
        const configPath = path.join(__dirname, 'js', 'config.js');
        let configContent = fs.readFileSync(configPath, 'utf8');
        configContent = configContent.replace('__EXTENSION_KEY__', extensionKey);
        fs.writeFileSync(configPath, configContent);
        console.log('Extension key injected successfully');
        
        // 2. Bundle and minify CSS
        const cssResult = bundleCSS();
        console.log(`CSS optimization complete - ${cssResult.size.savings}% size reduction`);
        
        // 3. Optimize images (placeholder)
        optimizeImages();
        
        // 4. Generate build manifest
        const manifest = generateBuildManifest();
        
        console.log('Build process completed successfully!');
        console.log(`Build time: ${manifest.buildTime}`);
        console.log(`CSS bundle size: ${cssResult.size.original} bytes`);
        console.log(`CSS minified size: ${cssResult.size.minified} bytes`);
        
    } catch (error) {
        console.error('Build process failed:', error);
        process.exit(1);
    }
}

// Helper function to generate a secure key
function generateSecureKey() {
    return require('crypto').randomBytes(32).toString('hex');
}

// Run build if this script is executed directly
if (require.main === module) {
    build();
}

module.exports = {
    build,
    bundleCSS,
    minifyCSS,
    generateBuildManifest
}; 