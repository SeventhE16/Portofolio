// REVEAL
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// TYPING
const text = "I am a Web Developer";
let index = 0;

function typeEffect() {
  const el = document.querySelector(".typing");
  if (!el) return;

  el.innerHTML = "";

  function typing() {
    if (index < text.length) {
      el.innerHTML += text.charAt(index);
      index++;
      setTimeout(typing, 70);
    }
  }

  typing();
}

window.onload = typeEffect;