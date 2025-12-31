// utils/generateTornClipPath.js

export function generateTornClipPath(intensity = 10) {
  const points = [];
  const step = 100 / intensity;

  points.push(`0% 0%`);
  for (let i = 0; i <= intensity; i++) {
    const x = (i * step).toFixed(2);
    const y = (Math.random() * 10 + (i % 2 === 0 ? 90 : 95)).toFixed(2);
    points.push(`${x}% ${y}%`);
  }
  points.push(`100% 0%`);

  return `polygon(${points.join(",")})`;
}
