"use strict";

// ---------- Init Values
const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;
const scrollAnimateOffsetHeight = innerHeight - 50;
const scrollAnimateOffsetHeight_3 = innerHeight - innerHeight / 3;
let scrollPositionY = window.scrollY;
window.addEventListener("scroll", function () {
  scrollPositionY = window.scrollY;
});

// ---------- Splited Text Effect----------
const allSplitedTextEls = document.querySelectorAll(".splited_text_animate");
const allMultipleAnimateEls = document.querySelectorAll(".multiple_el_animate");
const fadeUpEls = document.querySelectorAll(".fade_up_el");
const crachedBgRoundedEls = document.querySelectorAll(
  ".crached-background-rounded"
);

allSplitedTextEls.forEach(function (splitedEl) {
  const text = splitedEl.textContent;
  splitedEl.textContent = "";
  const splited_words = text.split("");
  splited_words.forEach((splited_word) => {
    splitedEl.innerHTML += `<span>${splited_word}</span>`;
  });
});

const animateEl = function (mainEls, header, extentions) {
  mainEls.forEach(function (mainEl) {
    let isAnimated = mainEl.dataset.isAnimated ?? false;
    if (!isAnimated) {
      if (mainEl.getBoundingClientRect().top <= scrollAnimateOffsetHeight) {
        const animationDelay = mainEl.dataset.animate_delay ?? "0ms";
        mainEl.style.animation = `${header} ${animationDelay} ${extentions}`;
      }
    }
  });
};

const animateIndividualEl = function (mainEl, header, extentions) {
  let isAnimated = mainEl.dataset.isAnimated ?? false;
  if (!isAnimated) {
    if (mainEl.getBoundingClientRect().top <= scrollAnimateOffsetHeight) {
      const animationDelay = mainEl.dataset.animate_delay ?? "0ms";
      mainEl.style.animation = `${header} ${animationDelay} ${extentions}`;
    }
  }
};

const callMultipleAnimateEl = function (
  mainParentEls,
  header,
  delayIncrement,
  extentions,
  initTimer
) {
  mainParentEls.forEach(function (mainParentEl) {
    let isAnimated = mainParentEl.dataset.isAnimated ?? false;
    if (!isAnimated) {
      if (
        mainParentEl.getBoundingClientRect().top <= scrollAnimateOffsetHeight_3
      ) {
        mainParentEl.dataset.isAnimated = true;
        const overallDelay = mainParentEl.dataset.overall_delay ?? 0;
        setTimeout(function () {
          const childrenEls = mainParentEl.children;
          let timer = initTimer ?? 0;
          for (let i = 0; i < childrenEls.length; i++) {
            childrenEls[
              i
            ].style.animation = `${header} ${timer}ms ${extentions}`;
            timer += delayIncrement;
          }
        }, overallDelay);
      }
    }
  });
};

window.addEventListener("scroll", function () {
  callMultipleAnimateEl(
    allSplitedTextEls,
    "fade_up_splited 0.3s",
    30,
    "ease-out forwards"
  );
  callMultipleAnimateEl(
    allMultipleAnimateEls,
    "fade_up 0.8s",
    300,
    "cubic-bezier(0.45, 0, 0.5, 0.8) forwards"
  );
  animateEl(fadeUpEls, "fade_up 1.5s", "ease-out forwards");
  crachedBgRoundedEls.forEach(function (crachedBgRoundedEl) {
    const childrenEls = crachedBgRoundedEl.children;
    animateIndividualEl(
      childrenEls[1],
      "animate-crach_2 3s",
      "ease-out forwards"
    );
    animateIndividualEl(
      childrenEls[2],
      "animate-crach_3 4s",
      "ease-out forwards"
    );
    animateIndividualEl(
      childrenEls[3],
      "animate-crach_4 5s",
      "ease-out forwards"
    );
  });
});

window.addEventListener("load", function () {
  callMultipleAnimateEl(
    allSplitedTextEls,
    "fade_up_splited 0.3s",
    30,
    "ease-out forwards"
  );
  callMultipleAnimateEl(
    allMultipleAnimateEls,
    "fade_up 0.8s",
    300,
    "cubic-bezier(0.45, 0, 0.5, 0.8) forwards"
  );
  animateEl(fadeUpEls, "fade_up 1.5s", "ease-out forwards");

  crachedBgRoundedEls.forEach(function (crachedBgRoundedEl) {
    const childrenEls = crachedBgRoundedEl.children;
    animateIndividualEl(
      childrenEls[1],
      "animate-crach_2 3s",
      "ease-out forwards"
    );
    animateIndividualEl(
      childrenEls[2],
      "animate-crach_3 4s",
      "ease-out forwards"
    );
    animateIndividualEl(
      childrenEls[3],
      "animate-crach_4 5s",
      "ease-out forwards"
    );
  });
});
