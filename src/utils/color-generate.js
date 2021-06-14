export default function colorGenerate(color) {
  const col = (color) ? `#${color}` : `#F7F9FE`
  return { background: col }
}