"use strict";

// ---------- Init Values
const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;
let scrollPositionY = window.scrollY;
window.addEventListener("scroll", function () {
  scrollPositionY = window.scrollY;
});

// ---------- Splited Text Effect----------
const allSplitedTextEl = document.querySelectorAll(".splited-text");

const callSplitedAnimation = function (splitedEl) {
  if (splitedEl.getBoundingClientRect().top <= innerHeight) {
    animateSplitedTextEl(splitedEl, 300, 30);
  }
};

allSplitedTextEl.forEach(function (splitedEl) {
  const text = splitedEl.textContent;
  splitedEl.textContent = "";
  const splited_words = text.split("");
  splited_words.forEach((splited_word) => {
    splitedEl.innerHTML += `<span>${splited_word}</span>`;
  });

  window.addEventListener("scroll", function () {
    callSplitedAnimation(splitedEl);
  });
  window.addEventListener("load", function () {
    callSplitedAnimation(splitedEl);
  });
});

function animateSplitedTextEl(
  splitedTextEl,
  animateTime,
  delayIncrement,
  initTimer
) {
  const spanEls = splitedTextEl.children;
  let timer = initTimer ?? 0;
  for (let i = 0; i < spanEls.length; i++) {
    spanEls[
      i
    ].style.animation = `fade_up_splited ${animateTime}ms ${timer}ms ease-out forwards`;
    timer += delayIncrement;
  }
}

// animateSplitedTextEl(allSplitedTextEl[0], 300, 30, 800);
