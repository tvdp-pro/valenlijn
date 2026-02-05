const ribbon = document.getElementById("ribbon");
const ribbonWrapper = document.querySelector(".ribbon-wrapper");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const letter = document.getElementById("letter");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let ribbonPulled = false;
let envelopeOpened = false;
let letterExtracted = false;
let letterAnimationComplete = false;
let yesScale = 1;
const circleRadius = 120; // Cirkel grootte in pixels

// Store viewport dimensions at page load
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

// Update viewport dimensions dynamically
window.addEventListener('resize', () => {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
});

ribbon.addEventListener("click", () => {
  if (ribbonPulled) return;
  ribbonPulled = true;
  ribbonWrapper.classList.add("pull");
  ribbon.classList.add("pull");
});

flap.addEventListener("click", () => {
  if (!ribbonPulled || envelopeOpened) return;
  envelopeOpened = true;
  flap.classList.add("open");
  envelope.classList.add("open");
});

letter.addEventListener("click", () => {
  if (!envelopeOpened || letterExtracted) return;
  letterExtracted = true;
  letter.classList.add("extracted");
  
  // De animatie duurt 1.2s (uit de CSS: letter-extract 1.2s ease forwards)
  setTimeout(() => {
    letterAnimationComplete = true;
    noBtn.classList.add('visible');
  }, 1200);
});

const moveNoButton = () => {
  if (!letterAnimationComplete) return;
  
  const noBounds = noBtn.getBoundingClientRect();
  const padding = 20;
  
  const maxX = window.innerWidth - noBounds.width - padding;
  const maxY = window.innerHeight - noBounds.height - padding;
  
  const randomX = padding + Math.random() * (maxX - padding);
  const randomY = padding + Math.random() * (maxY - padding);
  
  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  
  yesScale *= 1.1;
  yesBtn.style.transform = `scale(${yesScale})`;
};

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  letter.classList.add("flip");
});
