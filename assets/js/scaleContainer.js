// Escalado proporcional del contenedor principal
let baseWidth = window.innerWidth;
let baseHeight = window.innerHeight;
function scaleMainContainer() {
  const container = document.getElementById("main-fixed-container");
  if (!container) return;
  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;
  const scale = Math.min(scaleX, scaleY, 1);
  container.style.transform = `scale(${scale})`;
  container.style.transformOrigin = "top center";
}
window.addEventListener("resize", scaleMainContainer);
window.addEventListener("DOMContentLoaded", () => {
  baseWidth = window.innerWidth;
  baseHeight = window.innerHeight;
  scaleMainContainer();
});
