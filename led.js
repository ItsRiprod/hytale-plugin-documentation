import https from "https";

async function makeRequest(path, payload) {
  const options = {
    hostname: "leds.benglsoftware.com",
    port: 443,
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "connect.sid=s%3AkwKUxqeMXwqJmHkNMDxen2Ff7JeQ9TR6.jQwvGHP5cCaJhW9rBMOtthuDTwp3uLROepwjZFAMVIU",
    },
  };

  console.log(`Making request to ${path}`, payload);
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        console.log(`Response from ${path}:`, data);
        resolve(data);
      });
    });
    req.on("error", (err) => {
      console.error(`Request error for ${path}:`, err);
      reject(err);
    });
    req.write(JSON.stringify(payload));
    req.end();
  });
}

async function animateStrobe(color, speed, duration) {
  console.log(
    `Animating strobe: color ${color}, speed ${speed}, duration ${duration}ms`,
  );
  const payload = { color, speed, duration };
  return makeRequest("/animate-strobe", payload);
}

async function animateRainbow(numRainbows, value, speed) {
  console.log(
    `Animating rainbow: ${numRainbows} rainbows, value ${value}, speed ${speed}`,
  );
  const payload = {
    num_rainbows: numRainbows.toString(),
    value: value.toString(),
    speed: speed.toString(),
  };
  return makeRequest("/animate-rainbow", payload);
}

async function animateBreathe(color, speed) {
  console.log(`Animating breathe: color ${color}, speed ${speed}`);
  const payload = { color, speed };
  return makeRequest("/animate-breathe", payload);
}

async function setSolidColor(r, g, b) {
  console.log(`Setting solid color: RGB(${r}, ${g}, ${b})`);
  const payload = { rgb: { r, g, b } };
  return makeRequest("/update-led-color", payload);
}

async function animateExplicit(ledStates) {
  console.log(`Setting ${ledStates.length} individual LEDs`);
  const payload = { led_state: ledStates };
  return makeRequest("/animate-explicit", payload);
}

async function animateRedBlueToggle(speed, duration) {
  console.log(
    `Animating red/blue toggle: speed ${speed}ms, duration ${duration}ms`,
  );
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    await setSolidColor(255, 0, 0); // Red
    await new Promise((resolve) => setTimeout(resolve, speed));
    await setSolidColor(0, 0, 255); // Blue
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
}

async function cursedLightSequence() {
  const colors = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [255, 0, 255],
    [0, 255, 255],
    [255, 128, 0],
    [128, 0, 255],
    [255, 255, 255],
    [128, 128, 128],
    [255, 69, 0],
    [30, 144, 255],
    [255, 215, 0],
    [220, 20, 60],
    [75, 0, 130],
  ];

  while (true) {
    console.log("🔴 CURSED CYCLE INITIATED 🔴");

    // Phase 1: Violent rapid flashing
    console.log("⚡ VIOLENT FLASHING");
    const flashCount = Math.floor(Math.random() * 20) + 15;
    for (let i = 0; i < flashCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      await setSolidColor(...color);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 50 + 10),
      );
    }

    // Phase 2: Random strobe cascade
    console.log("🌀 STROBE CASCADE");
    for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) {
      const color =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      const speed = String(Math.floor(Math.random() * 80) + 30);
      const duration = String(Math.floor(Math.random() * 800) + 1000);
      await animateStrobe(color, speed, duration);
    }

    // Phase 3: Breathing chaos
    console.log("🫁 BREATHING NIGHTMARE");
    for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
      const color =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      const speed = String(Math.floor(Math.random() * 100) + 20);
      await animateBreathe(color, speed);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 800 + 500),
      );
    }

    // Phase 4: Rainbow madness
    console.log("🌈 RAINBOW INSANITY");
    const rainbows = String(Math.floor(Math.random() * 8) + 2);
    const value = String(Math.floor(Math.random() * 8000) + 800);
    const speed = String(Math.floor(Math.random() * 1500) + 500);
    await animateRainbow(rainbows, value, speed);

    // Phase 5: Pure random color seizure
    console.log("💥 COMPLETE CHAOS");
    const seizureLength = Math.floor(Math.random() * 60) + 40;
    for (let i = 0; i < seizureLength; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      await setSolidColor(r, g, b);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 80 + 5),
      );
    }

    // Phase 5.5: INDIVIDUALLY ADDRESSABLE MADNESS
    console.log("🎨 INDIVIDUAL LED INSANITY");
    const individualPhases = Math.floor(Math.random() * 15) + 25;
    for (let phase = 0; phase < individualPhases; phase++) {
      const pattern = Math.floor(Math.random() * 10);
      let ledStates = [];

      if (pattern === 0) {
        // Random every LED
        console.log("  ⚡ Total randomness");
        ledStates = Array.from({ length: 640 }, () => ({
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        }));
      } else if (pattern === 1) {
        // Rainbow gradient across all LEDs
        console.log("  🌈 Rainbow gradient");
        ledStates = Array.from({ length: 640 }, (_, i) => {
          const hue = (i / 640) * 360 + Math.random() * 60;
          const r = Math.floor(
            (255 * (1 + Math.sin(((hue + 0) * Math.PI) / 180))) / 2,
          );
          const g = Math.floor(
            (255 * (1 + Math.sin(((hue + 120) * Math.PI) / 180))) / 2,
          );
          const b = Math.floor(
            (255 * (1 + Math.sin(((hue + 240) * Math.PI) / 180))) / 2,
          );
          return { r, g, b };
        });
      } else if (pattern === 2) {
        // Alternating colors
        console.log("  🔴🔵 Alternating madness");
        const numColors = Math.floor(Math.random() * 5) + 2;
        const colors = Array.from({ length: numColors }, () => ({
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        }));
        ledStates = Array.from(
          { length: 640 },
          (_, i) => colors[i % numColors],
        );
      } else if (pattern === 3) {
        // Wave effect
        console.log("  🌊 Wave pattern");
        const offset = Math.random() * 100;
        const frequency = Math.random() * 0.3 + 0.05;
        ledStates = Array.from({ length: 640 }, (_, i) => {
          const intensity = Math.floor(
            128 + 127 * Math.sin(i * frequency + offset),
          );
          return {
            r: intensity,
            g: Math.floor(Math.random() * 128),
            b: 255 - intensity,
          };
        });
      } else if (pattern === 4) {
        // Blocks of random colors
        console.log("  📦 Block chaos");
        const blockSize = Math.floor(Math.random() * 30) + 5;
        ledStates = Array.from({ length: 640 }, (_, i) => {
          const blockIndex = Math.floor(i / blockSize);
          return {
            r: Math.floor(Math.sin(blockIndex * 1.5) * 127 + 128),
            g: Math.floor(Math.cos(blockIndex * 2.3) * 127 + 128),
            b: Math.floor(Math.sin(blockIndex * 0.7) * 127 + 128),
          };
        });
      } else if (pattern === 5) {
        // Sparkle effect - mostly off with random bright spots
        console.log("  ✨ Sparkle chaos");
        ledStates = Array.from({ length: 640 }, () => {
          if (Math.random() > 0.85) {
            return {
              r: Math.floor(Math.random() * 256),
              g: Math.floor(Math.random() * 256),
              b: Math.floor(Math.random() * 256),
            };
          }
          return { r: 0, g: 0, b: 0 };
        });
      } else if (pattern === 6) {
        // Stripes
        console.log("  🦓 Stripe insanity");
        const stripeWidth = Math.floor(Math.random() * 20) + 3;
        const color1 = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        const color2 = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        ledStates = Array.from({ length: 640 }, (_, i) =>
          Math.floor(i / stripeWidth) % 2 === 0 ? color1 : color2,
        );
      } else if (pattern === 7) {
        // Gradient between two random colors
        console.log("  🎨 Color gradient");
        const startColor = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        const endColor = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        ledStates = Array.from({ length: 640 }, (_, i) => {
          const ratio = i / 621;
          return {
            r: Math.floor(startColor.r + (endColor.r - startColor.r) * ratio),
            g: Math.floor(startColor.g + (endColor.g - startColor.g) * ratio),
            b: Math.floor(startColor.b + (endColor.b - startColor.b) * ratio),
          };
        });
      } else if (pattern === 8) {
        // Noise/static
        console.log("  📺 Static noise");
        const baseColor = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        ledStates = Array.from({ length: 640 }, () => ({
          r: Math.max(
            0,
            Math.min(255, baseColor.r + Math.floor(Math.random() * 100 - 50)),
          ),
          g: Math.max(
            0,
            Math.min(255, baseColor.g + Math.floor(Math.random() * 100 - 50)),
          ),
          b: Math.max(
            0,
            Math.min(255, baseColor.b + Math.floor(Math.random() * 100 - 50)),
          ),
        }));
      } else {
        // Checker pattern
        console.log("  🏁 Checker madness");
        const checkSize = Math.floor(Math.random() * 15) + 2;
        const color1 = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        const color2 = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        ledStates = Array.from({ length: 640 }, (_, i) =>
          Math.floor(i / checkSize) % 2 === 0 ? color1 : color2,
        );
      }

      await animateExplicit(ledStates);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 400 + 100),
      );
    }

    // Phase 5.75: ANIMATED INDIVIDUAL LED HELL
    console.log("🎬 ANIMATED LED NIGHTMARE");
    const animationTypes = Math.floor(Math.random() * 3) + 3;
    for (let animType = 0; animType < animationTypes; animType++) {
      const animPattern = Math.floor(Math.random() * 5);
      const frames = Math.floor(Math.random() * 40) + 30;

      if (animPattern === 0) {
        // Moving rainbow
        console.log("  🌈➡️ Moving rainbow");
        for (let frame = 0; frame < frames; frame++) {
          const ledStates = Array.from({ length: 640 }, (_, i) => {
            const hue = ((i + frame * 5) / 640) * 360;
            const r = Math.floor(
              (255 * (1 + Math.sin(((hue + 0) * Math.PI) / 180))) / 2,
            );
            const g = Math.floor(
              (255 * (1 + Math.sin(((hue + 120) * Math.PI) / 180))) / 2,
            );
            const b = Math.floor(
              (255 * (1 + Math.sin(((hue + 240) * Math.PI) / 180))) / 2,
            );
            return { r, g, b };
          });
          await animateExplicit(ledStates);
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
      } else if (animPattern === 1) {
        // Chasing lights
        console.log("  💫 Chaser effect");
        const chaseSize = Math.floor(Math.random() * 20) + 5;
        const color = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        for (let frame = 0; frame < frames; frame++) {
          const ledStates = Array.from({ length: 640 }, (_, i) => {
            const pos = (i - frame * 3) % 640;
            if (pos >= 0 && pos < chaseSize) {
              return color;
            }
            return { r: 0, g: 0, b: 0 };
          });
          await animateExplicit(ledStates);
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
      } else if (animPattern === 2) {
        // Pulsing sections
        console.log("  💓 Pulse madness");
        const sections = Math.floor(Math.random() * 5) + 3;
        for (let frame = 0; frame < frames; frame++) {
          const ledStates = Array.from({ length: 640 }, (_, i) => {
            const section = Math.floor((i / 640) * sections);
            const pulse = Math.sin(frame / 10 + section) * 0.5 + 0.5;
            return {
              r: Math.floor(Math.random() * 128 * pulse + 50),
              g: Math.floor(Math.random() * 128 * pulse + 50),
              b: Math.floor(Math.random() * 128 * pulse + 50),
            };
          });
          await animateExplicit(ledStates);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
      } else if (animPattern === 3) {
        // Bouncing light
        console.log("  🏀 Bouncing chaos");
        const color = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
        const trailLength = Math.floor(Math.random() * 30) + 10;
        for (let frame = 0; frame < frames; frame++) {
          const pos = Math.abs(Math.sin(frame / 15) * 640);
          const ledStates = Array.from({ length: 640 }, (_, i) => {
            const distance = Math.abs(i - pos);
            if (distance < trailLength) {
              const intensity = 1 - distance / trailLength;
              return {
                r: Math.floor(color.r * intensity),
                g: Math.floor(color.g * intensity),
                b: Math.floor(color.b * intensity),
              };
            }
            return { r: 0, g: 0, b: 0 };
          });
          await animateExplicit(ledStates);
          await new Promise((resolve) => setTimeout(resolve, 35));
        }
      } else {
        // Exploding sparkles
        console.log("  💥✨ Exploding sparkles");
        for (let frame = 0; frame < frames; frame++) {
          const ledStates = Array.from({ length: 640 }, (_, i) => {
            if (Math.random() > 0.7) {
              const intensity = Math.random();
              return {
                r: Math.floor(Math.random() * 255 * intensity),
                g: Math.floor(Math.random() * 255 * intensity),
                b: Math.floor(Math.random() * 255 * intensity),
              };
            }
            return { r: 0, g: 0, b: 0 };
          });
          await animateExplicit(ledStates);
          await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 30 + 20),
          );
        }
      }
    }

    // Phase 6: Alternating extremes
    console.log("⚫⚪ EXTREME ALTERNATION");
    const alternateCount = Math.floor(Math.random() * 30) + 20;
    for (let i = 0; i < alternateCount; i++) {
      if (Math.random() > 0.5) {
        await setSolidColor(255, 255, 255); // White
      } else {
        await setSolidColor(0, 0, 0); // Black
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 60 + 10),
      );
    }

    // Brief pause before repeating
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500),
    );
    console.log("🔴 CYCLING... 🔴\n");
  }
}

async function funAnimation() {
  console.log("✨ FUN ANIMATION START ✨\n");

  while (true) {
    // 1. Smooth color fade intro
    console.log("🌅 Smooth color fade");
    const fadeColors = [
      [255, 0, 128], // Pink
      [128, 0, 255], // Purple
      [0, 128, 255], // Light blue
      [0, 255, 128], // Mint
      [255, 255, 0], // Yellow
      [255, 128, 0], // Orange
    ];
    for (const color of fadeColors) {
      await setSolidColor(...color);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // 2. Gentle rainbow wave
    console.log("🌈 Rainbow wave animation");
    for (let frame = 0; frame < 60; frame++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const hue = ((i + frame * 8) / 640) * 360;
        const r = Math.floor(
          (255 * (1 + Math.sin(((hue + 0) * Math.PI) / 180))) / 2,
        );
        const g = Math.floor(
          (255 * (1 + Math.sin(((hue + 120) * Math.PI) / 180))) / 2,
        );
        const b = Math.floor(
          (255 * (1 + Math.sin(((hue + 240) * Math.PI) / 180))) / 2,
        );
        return { r, g, b };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // 3. Sparkle effect
    console.log("✨ Sparkle magic");
    const sparkleColor = [255, 215, 0]; // Gold
    await setSolidColor(20, 20, 60); // Dark blue base
    await new Promise((resolve) => setTimeout(resolve, 500));
    for (let i = 0; i < 40; i++) {
      const ledStates = Array.from({ length: 640 }, (_, idx) => {
        if (Math.random() > 0.92) {
          return { r: sparkleColor[0], g: sparkleColor[1], b: sparkleColor[2] };
        }
        return { r: 20, g: 20, b: 60 };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // 4. Smooth breathing effect
    console.log("🫁 Gentle breathing");
    await animateBreathe("#4169E1", "150"); // Royal blue
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 5. Fire effect
    console.log("🔥 Fire animation");
    for (let frame = 0; frame < 80; frame++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const flicker = Math.random() * 0.5 + 0.5;
        const position = i / 640;
        const baseIntensity = Math.sin(position * Math.PI) * 0.3 + 0.7;
        const r = Math.floor(255 * flicker * baseIntensity);
        const g = Math.floor(100 * flicker * baseIntensity);
        const b = Math.floor(10 * flicker);
        return { r, g, b };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }

    // 6. Ocean wave
    console.log("🌊 Ocean waves");
    for (let frame = 0; frame < 100; frame++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const wave1 = Math.sin(i / 50 + frame / 10) * 0.5 + 0.5;
        const wave2 = Math.sin(i / 30 - frame / 15) * 0.5 + 0.5;
        const combined = (wave1 + wave2) / 2;
        return {
          r: Math.floor(10 * combined),
          g: Math.floor(150 * combined + 50),
          b: Math.floor(80 * combined + 55),
        };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }

    // 7. Comet chaser
    console.log("☄️ Comet trail");
    for (let frame = 0; frame < 100; frame++) {
      const cometPos = (frame * 8) % 640;
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const distance = Math.abs(i - cometPos);
        const trailLength = 40;
        if (distance < trailLength) {
          const intensity = 1 - distance / trailLength;
          return {
            r: Math.floor(255 * intensity),
            g: Math.floor(255 * intensity),
            b: Math.floor(255 * intensity),
          };
        }
        return { r: 10, g: 0, b: 30 };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    // 8. Color pulse sections
    console.log("💫 Pulsing sections");
    const sectionColors = [
      [255, 0, 100],
      [100, 0, 255],
      [0, 255, 80],
      [255, 80, 0],
    ];
    for (let frame = 0; frame < 60; frame++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const section = Math.floor((i / 640) * 4);
        const pulse = Math.sin(frame / 8 + section * 1.5) * 0.5 + 0.5;
        const color = sectionColors[section];
        return {
          r: Math.floor(color[0] * pulse),
          g: Math.floor(color[1] * pulse),
          b: Math.floor(color[2] * pulse),
        };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // 9. Smooth rainbow
    console.log("🌈 Smooth rainbow");
    await animateRainbow("3", "8000", "1000");
    await new Promise((resolve) => setTimeout(resolve, 8000));

    // Brief pause before loop
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("✨ Looping...\n");
  }
}
async function explicitOnlyAnimation() {
  console.log("🎯 EXPLICIT CONTROL ONLY ANIMATION 🎯\n");

  while (true) {
    // 1. Theater chase
    console.log("🎭 Theater chase");
    for (let offset = 0; offset < 10; offset++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        if ((i + offset) % 10 < 3) {
          return { r: 255, g: 50, b: 0 };
        }
        return { r: 0, g: 0, b: 0 };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 2));
    }

    // 2. Build up from center
    // console.log("📍 Center expansion");
    // const center = 311;
    // for (let radius = 0; radius < 311; radius += 3) {
    //   const ledStates = Array.from({ length: 640 }, (_, i) => {
    //     const distance = Math.abs(i - center);
    //     if (distance <= radius) {
    //       const hue = (distance / radius) * 180;
    //       return {
    //         r: Math.floor(255 * Math.sin((hue * Math.PI) / 180)),
    //         g: Math.floor(255 * Math.cos((hue * Math.PI) / 180)),
    //         b: Math.floor(128 + 127 * Math.sin((hue * 2 * Math.PI) / 180)),
    //       };
    //     }
    //     return { r: 0, g: 0, b: 0 };
    //   });
    //   await animateExplicit(ledStates);
    //   await new Promise((resolve) => setTimeout(resolve, 80));
    // }

    // 3. Matrix rain effect
    console.log("💚 Matrix rain");
    const drops = Array.from({ length: 30 }, () => ({
      pos: Math.floor(Math.random() * 640),
      speed: Math.floor(Math.random() * 5) + 2,
    }));
    for (let frame = 0; frame < 150; frame++) {
      const ledStates = Array.from({ length: 640 }, () => ({
        r: 0,
        g: 0,
        b: 0,
      }));
      drops.forEach((drop) => {
        for (let trail = 0; trail < 15; trail++) {
          const pos = (drop.pos - trail) % 640;
          if (pos >= 0 && pos < 640) {
            const intensity = 1 - trail / 15;
            ledStates[pos] = {
              r: 0,
              g: Math.floor(255 * intensity),
              b: Math.floor(50 * intensity),
            };
          }
        }
        drop.pos = (drop.pos + drop.speed) % 640;
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    // 4. Dual color wipe collision
    console.log("💥 Color collision");
    for (let pos = 0; pos < 311; pos += 2) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        if (i <= pos) {
          return { r: 255, g: 0, b: 100 };
        } else if (i >= 640 - pos) {
          return { r: 0, g: 100, b: 255 };
        }
        return { r: 0, g: 0, b: 0 };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    // 5. Perlin-like noise
    console.log("🌫️ Smooth noise");
    for (let t = 0; t < 100; t++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const val1 = Math.sin(i / 50 + t / 10) * 0.5 + 0.5;
        const val2 = Math.sin(i / 30 - t / 15) * 0.5 + 0.5;
        const val3 = Math.sin(i / 70 + t / 20) * 0.5 + 0.5;
        return {
          r: Math.floor(255 * val1),
          g: Math.floor(255 * val2),
          b: Math.floor(255 * val3),
        };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    // 6. Scanning larson scanner (Knight Rider)
    console.log("🚗 Larson scanner");
    for (let cycle = 0; cycle < 3; cycle++) {
      for (let pos = 0; pos < 640; pos += 4) {
        const ledStates = Array.from({ length: 640 }, (_, i) => {
          const distance = Math.abs(i - pos);
          const width = 20;
          if (distance < width) {
            const intensity = 1 - distance / width;
            return {
              r: Math.floor(255 * intensity),
              g: 0,
              b: 0,
            };
          }
          return { r: 0, g: 0, b: 0 };
        });
        await animateExplicit(ledStates);
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      for (let pos = 640; pos >= 0; pos -= 4) {
        const ledStates = Array.from({ length: 640 }, (_, i) => {
          const distance = Math.abs(i - pos);
          const width = 20;
          if (distance < width) {
            const intensity = 1 - distance / width;
            return {
              r: Math.floor(255 * intensity),
              g: 0,
              b: 0,
            };
          }
          return { r: 0, g: 0, b: 0 };
        });
        await animateExplicit(ledStates);
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
    }

    // 7. Twinkle field
    console.log("⭐ Twinkle field");
    const stars = Array.from({ length: 640 }, () => ({
      brightness: Math.random(),
      speed: Math.random() * 0.1 + 0.02,
    }));
    for (let frame = 0; frame < 100; frame++) {
      const ledStates = stars.map((star) => {
        star.brightness += star.speed;
        if (star.brightness > 1) {
          star.brightness = 0;
          star.speed = Math.random() * 0.1 + 0.02;
        }
        const intensity = Math.sin(star.brightness * Math.PI);
        return {
          r: Math.floor(255 * intensity),
          g: Math.floor(80 * intensity),
          b: Math.floor(100 * intensity),
        };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    // 8. Segments rotating colors
    console.log("🎨 Rotating segments");
    const segments = 8;
    const segmentColors = Array.from({ length: segments }, (_, i) => {
      const hue = (i / segments) * 360;
      return {
        r: Math.floor((255 * (1 + Math.sin(((hue + 0) * Math.PI) / 180))) / 2),
        g: Math.floor(
          (255 * (1 + Math.sin(((hue + 120) * Math.PI) / 180))) / 2,
        ),
        b: Math.floor(
          (255 * (1 + Math.sin(((hue + 240) * Math.PI) / 180))) / 2,
        ),
      };
    });
    for (let rotation = 0; rotation < 100; rotation++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const segment = Math.floor(
          ((i + rotation * 5) % 640) / (640 / segments),
        );
        return segmentColors[segment];
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    // 9. Breathing rainbow
    console.log("🌈💨 Breathing rainbow");
    for (let breath = 0; breath < 60; breath++) {
      const intensity = Math.sin(breath / 10) * 0.5 + 0.5;
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const hue = (i / 640) * 360;
        return {
          r: Math.floor(
            ((255 * (1 + Math.sin(((hue + 0) * Math.PI) / 180))) / 2) *
              intensity,
          ),
          g: Math.floor(
            ((255 * (1 + Math.sin(((hue + 120) * Math.PI) / 180))) / 2) *
              intensity,
          ),
          b: Math.floor(
            ((255 * (1 + Math.sin(((hue + 240) * Math.PI) / 180))) / 2) *
              intensity,
          ),
        };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    // 10. Plasma effect
    console.log("🌀 Plasma effect");
    for (let t = 0; t < 120; t++) {
      const ledStates = Array.from({ length: 640 }, (_, i) => {
        const v =
          Math.sin(i / 16.0) +
          Math.sin(t / 8.0) +
          Math.sin((i + t) / 16.0) +
          Math.sin(Math.sqrt(i * i + t * t) / 8.0);
        const normalized = (v + 4) / 8;
        return {
          r: Math.floor(255 * Math.sin(normalized * Math.PI)),
          g: Math.floor(255 * Math.sin(normalized * Math.PI + Math.PI / 3)),
          b: Math.floor(
            255 * Math.sin(normalized * Math.PI + (2 * Math.PI) / 3),
          ),
        };
      });
      await animateExplicit(ledStates);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("🎯 Looping explicit animation...\n");
  }
}
async function runAnimation() {
  const settings = [
    { type: "solid", r: 62, g: 255, b: 41 },
    { type: "strobe", color: "#ff0000", speed: "80", duration: "3000" },
    { type: "rainbow", rainbows: "2", value: "10000", speed: "180" },
    { type: "strobe", color: "#00ff00", speed: "150", duration: "800" },
    { type: "breathe", color: "#ff0000", speed: "100" },
    { type: "strobe", color: "#0000ff", speed: "250", duration: "2500" },
  ];

  console.log("Starting animation sequence...");
  for (const setting of settings) {
    if (setting.type === "solid") {
      await setSolidColor(setting.r, setting.g, setting.b);
    } else if (setting.type === "strobe") {
      await animateStrobe(setting.color, setting.speed, setting.duration);
    } else if (setting.type === "breathe") {
      await animateBreathe(setting.color, setting.speed);
    } else {
      await animateRainbow(setting.rainbows, setting.value, setting.speed);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log("Animation sequence completed");
}

explicitOnlyAnimation().catch(console.error);
