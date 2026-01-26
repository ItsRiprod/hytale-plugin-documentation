import https from 'https';

async function makeRequest(path, payload) {
    const options = {
        hostname: 'leds.benglsoftware.com',
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'connect.sid=s%3AkwKUxqeMXwqJmHkNMDxen2Ff7JeQ9TR6.jQwvGHP5cCaJhW9rBMOtthuDTwp3uLROepwjZFAMVIU'
        }
    };

    console.log(`Making request to ${path}`, payload);
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log(`Response from ${path}:`, data);
                resolve(data);
            });
        });
        req.on('error', (err) => {
            console.error(`Request error for ${path}:`, err);
            reject(err);
        });
        req.write(JSON.stringify(payload));
        req.end();
    });
}

async function animateStrobe(color, speed, duration) {
    console.log(`Animating strobe: color ${color}, speed ${speed}, duration ${duration}ms`);
    const payload = { color, speed, duration };
    return makeRequest('/animate-strobe', payload);
}

async function animateRainbow(numRainbows, value, speed) {
    console.log(`Animating rainbow: ${numRainbows} rainbows, value ${value}, speed ${speed}`);
    const payload = {
        num_rainbows: numRainbows.toString(),
        value: value.toString(),
        speed: speed.toString()
    };
    return makeRequest('/animate-rainbow', payload);
}

async function animateBreathe(color, speed) {
    console.log(`Animating breathe: color ${color}, speed ${speed}`);
    const payload = { color, speed };
    return makeRequest('/animate-breathe', payload);
}

async function setSolidColor(r, g, b) {
    console.log(`Setting solid color: RGB(${r}, ${g}, ${b})`);
    const payload = { rgb: { r, g, b } };
    return makeRequest('/update-led-color', payload);
}

async function animateRedBlueToggle(speed, duration) {
    console.log(`Animating red/blue toggle: speed ${speed}ms, duration ${duration}ms`);
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        await setSolidColor(255, 0, 0); // Red
        await new Promise(resolve => setTimeout(resolve, speed));
        await setSolidColor(0, 0, 255); // Blue
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function cursedLightSequence() {
    const colors = [
        [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 0, 255],
        [0, 255, 255], [255, 128, 0], [128, 0, 255], [255, 255, 255], [128, 128, 128],
        [255, 69, 0], [30, 144, 255], [255, 215, 0], [220, 20, 60], [75, 0, 130],
    ];

    while (true) {
        console.log('🔴 CURSED CYCLE INITIATED 🔴');
        
        // Phase 1: Violent rapid flashing
        console.log('⚡ VIOLENT FLASHING');
        const flashCount = Math.floor(Math.random() * 20) + 15;
        for (let i = 0; i < flashCount; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            await setSolidColor(...color);
            await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 10));
        }

        // Phase 2: Random strobe cascade
        console.log('🌀 STROBE CASCADE');
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) {
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            const speed = String(Math.floor(Math.random() * 200) + 30);
            const duration = String(Math.floor(Math.random() * 2000) + 1000);
            await animateStrobe(color, speed, duration);
        }

        // Phase 3: Breathing chaos
        console.log('🫁 BREATHING NIGHTMARE');
        for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            const speed = String(Math.floor(Math.random() * 100) + 20);
            await animateBreathe(color, speed);
            await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
        }

        // Phase 4: Rainbow madness
        console.log('🌈 RAINBOW INSANITY');
        const rainbows = String(Math.floor(Math.random() * 8) + 2);
        const value = String(Math.floor(Math.random() * 8000) + 2000);
        const speed = String(Math.floor(Math.random() * 1500) + 500);
        await animateRainbow(rainbows, value, speed);

        // Phase 5: Pure random color seizure
        console.log('💥 COMPLETE CHAOS');
        const seizureLength = Math.floor(Math.random() * 60) + 40;
        for (let i = 0; i < seizureLength; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            await setSolidColor(r, g, b);
            await new Promise(resolve => setTimeout(resolve, Math.random() * 80 + 5));
        }

        // Phase 6: Alternating extremes
        console.log('⚫⚪ EXTREME ALTERNATION');
        const alternateCount = Math.floor(Math.random() * 30) + 20;
        for (let i = 0; i < alternateCount; i++) {
            if (Math.random() > 0.5) {
                await setSolidColor(255, 255, 255); // White
            } else {
                await setSolidColor(0, 0, 0); // Black
            }
            await new Promise(resolve => setTimeout(resolve, Math.random() * 60 + 10));
        }

        // Brief pause before repeating
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        console.log('🔴 CYCLING... 🔴\n');
    }
}

async function runAnimation() {
    const settings = [
        { type: 'solid', r: 62, g: 255, b: 41 },
        { type: 'strobe', color: '#ff0000', speed: '200', duration: '3000' },
        { type: 'rainbow', rainbows: '2', value: '10000', speed: '1200' },
        { type: 'strobe', color: '#00ff00', speed: '150', duration: '2000' },
        { type: 'breathe', color: '#ff0000', speed: '100' },
        { type: 'strobe', color: '#0000ff', speed: '250', duration: '2500' }
    ];

    console.log('Starting animation sequence...');
    for (const setting of settings) {
        if (setting.type === 'solid') {
            await setSolidColor(setting.r, setting.g, setting.b);
        } else if (setting.type === 'strobe') {
            await animateStrobe(setting.color, setting.speed, setting.duration);
        } else if (setting.type === 'breathe') {
            await animateBreathe(setting.color, setting.speed);
        } else {
            await animateRainbow(setting.rainbows, setting.value, setting.speed);
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('Animation sequence completed');
}

cursedLightSequence().catch(console.error);