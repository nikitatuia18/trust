// Пружина → CSS linear(). Запуск: node tools/spring.mjs [duration_ms damping ...]
// Считает затухающий осциллятор x(t) = 1 − e^(−ζωt)(cos ωd·t + ζω/ωd · sin ωd·t), нормированный на длительность.
// damping (ζ): 1 — без отскока, 0.7 — чуть-чуть, 0.5 — заметно резиновый. Результат вставляем в src/styles/motion.css.
const spring = (damping, points = 48) => {
  const settle = Math.log(1 / 0.004); // до 0.4% от финала = «остановилась»
  const zw = settle;                  // ζ·ω при t∈[0,1]
  const w = zw / damping;
  const wd = w * Math.sqrt(1 - damping * damping);
  const out = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const x = 1 - Math.exp(-zw * t) * (Math.cos(wd * t) + (zw / wd) * Math.sin(wd * t));
    out.push(i === points ? 1 : +x.toFixed(4));
  }
  return `linear(${out.join(', ')})`;
};
const overshoot = (d) => Math.exp((-Math.PI * d) / Math.sqrt(1 - d * d));

const presets = process.argv.length > 2
  ? process.argv.slice(2).map(Number)
  : [0.72, 0.6, 0.5];
for (const d of presets) {
  console.log(`/* ζ=${d}, перелёт ≈ ${(overshoot(d) * 100).toFixed(1)}% */`);
  console.log(spring(d));
}
