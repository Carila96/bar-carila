export function formatCarilaText(text) {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/\n[\t \u3000]*\n(?:[\t \u3000]*\n)*/g, '\n');
}
