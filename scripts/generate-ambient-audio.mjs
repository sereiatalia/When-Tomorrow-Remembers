import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sampleRate = 22050;
const seconds = 10;
const samples = sampleRate * seconds;
const dataSize = samples * 2;
const wav = Buffer.alloc(44 + dataSize);

wav.write("RIFF", 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(dataSize, 40);

let noise = 0;
for (let i = 0; i < samples; i += 1) {
  const time = i / sampleRate;
  const hum = 0.22 * Math.sin(Math.PI * 2 * 55 * time) + 0.08 * Math.sin(Math.PI * 2 * 110 * time);
  noise = noise * 0.985 + (Math.random() * 2 - 1) * 0.000525;
  const pulse = 0.72 + 0.28 * Math.sin(Math.PI * 2 * 0.09 * time);
  const sample = Math.max(-1, Math.min(1, (hum + noise) * pulse));
  wav.writeInt16LE(Math.round(sample * 28000), 44 + i * 2);
}

const output = resolve("public/ambient.wav");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, wav);

