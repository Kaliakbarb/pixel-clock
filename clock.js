const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const SEGS = {
  "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc",
  "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abfgcd",
};
// segment: [x, y, w, h] in a 4x7 digit box, unit = pixel size
const GEOM = {
  a: [1, 0, 2, 1], b: [3, 1, 1, 2], c: [3, 4, 1, 2], d: [1, 6, 2, 1],
  e: [0, 4, 1, 2], f: [0, 1, 1, 2], g: [1, 3, 2, 1],
};
const U = 14;
let dark = true;

function drawDigit(ch, ox) {
  const on = SEGS[ch] || "";
  for (const [seg, [x, y, w, h]] of Object.entries(GEOM)) {
    ctx.fillStyle = on.includes(seg)
      ? (dark ? "#39d353" : "#1a7f37")
      : (dark ? "#161b22" : "#e6e6e0");
    ctx.fillRect(ox + x * U, y * U + U, w * U - 2, h * U - 2);
  }
}

function drawColon(ox, visible) {
  ctx.fillStyle = visible ? (dark ? "#39d353" : "#1a7f37") : "transparent";
  ctx.fillRect(ox, 3 * U, U - 2, U - 2);
  ctx.fillRect(ox, 5 * U, U - 2, U - 2);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = new Date();
  const parts = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(n => String(n).padStart(2, "0"));
  let x = 10;
  parts.forEach((pair, i) => {
    drawDigit(pair[0], x); x += 5 * U;
    drawDigit(pair[1], x); x += 5 * U;
    if (i < 2) { drawColon(x, now.getMilliseconds() < 500); x += 2 * U; }
  });
}

document.getElementById("toggle").addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("light", !dark);
});

setInterval(render, 100);
render();
