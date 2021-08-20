"use strict";

// ---------- Init Values --------------
const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;
const scrollAnimateOffsetHeight = innerHeight - 50;
const scrollAnimateOffsetHeight_2 = innerHeight - innerHeight / 4;

// ---------- Splited Text Effect & Multiple element's animation----------
const allSplitedTextEls = document.querySelectorAll(".splited_text_animate");
const allMultipleAnimateEls = document.querySelectorAll(".multiple_el_animate");
const fadeUpEls = document.querySelectorAll(".fade_up_el");
const scrachedBgEls = document.querySelectorAll(".scrached-background");
const allMultipleAnimateElsHover = document.querySelectorAll(
  ".multiple_el_animate_hover"
);

// ---------- For Splited Text Effect----------
allSplitedTextEls.forEach(function (splitedEl) {
  const text = splitedEl.textContent;
  splitedEl.textContent = "";
  const splited_words = text.split("");
  splited_words.forEach((splited_word) => {
    splitedEl.innerHTML += `<span>${splited_word}</span>`;
  });
});

// ---------- For anomate 1 element on scroll ----------
const animateEl = function (...mainEls) {
  mainEls.forEach(function (mainEl) {
    let isAnimated = mainEl.dataset.isAnimated ?? false;
    if (!isAnimated) {
      if (mainEl.getBoundingClientRect().top <= scrollAnimateOffsetHeight) {
        const animation_delay = mainEl.dataset.animation_delay ?? 0;
        const animationClass = mainEl.dataset.animation_class;
        if (animation_delay)
          setTimeout(function () {
            mainEl.classList.add(animationClass);
          }, animation_delay);
        else mainEl.classList.add(animationClass);
        mainEl.dataset.isAnimated = true;
      }
    }
  });
};

// ---------- For Multiple element's animation----------
const callMultipleAnimateEl = function (...mainParentEls) {
  mainParentEls.forEach(function (mainParentEl) {
    if (
      mainParentEl.getBoundingClientRect().top <= scrollAnimateOffsetHeight_2
    ) {
      const overallDelay = mainParentEl.dataset.overall_delay ?? 0;
      const animation_delay = mainParentEl.dataset.animation_delay ?? 0;
      const animationClass = mainParentEl.dataset.animation_class;
      let timer = 0;
      const callAnimation = function () {
        const childrenEls = mainParentEl.children;
        for (let i = 0; i < childrenEls.length; i++) {
          const childrenEl = childrenEls[i];
          let isAnimated = childrenEl.dataset.isAnimated ?? false;
          if (!isAnimated) {
            if (
              childrenEl.getBoundingClientRect().top <=
              scrollAnimateOffsetHeight_2
            ) {
              childrenEl.dataset.isAnimated = true;
              setTimeout(function () {
                childrenEl.classList.add(animationClass);
              }, timer);
              timer += Number(animation_delay);
            }
          }
        }
      };
      if (overallDelay)
        setTimeout(function () {
          callAnimation();
          mainParentEl.dataset.overall_delay = 0;
        }, overallDelay);
      else callAnimation();
      setTimeout(function () {
        timer = 0;
      }, 1000);
    }
  });
};

// ---------- For Multiple element's animation Hover ----------
const callMultipleAnimateElHover = function (...mainParentEls) {
  mainParentEls.forEach(function (mainParentEl) {
    const animation_delay = mainParentEl.dataset.animation_delay ?? 0;
    const hover_parentEl_num = mainParentEl.dataset.parent_el ?? 1;
    const animationClass = mainParentEl.dataset.animation_class;
    let hoverParentEl = mainParentEl;
    for (let i = 1; i <= hover_parentEl_num; i++) {
      hoverParentEl = hoverParentEl.parentElement;
    }
    const callAnimation = function (addClass) {
      let timer = 0;
      const childrenEls = mainParentEl.children;
      for (let i = 0; i < childrenEls.length; i++) {
        const childrenEl = childrenEls[i];
        setTimeout(function () {
          if (addClass) childrenEl.classList.add(animationClass);
          else childrenEl.classList.remove(animationClass);
        }, timer);
        timer += Number(animation_delay);
      }
      timer = 0;
    };
    hoverParentEl.addEventListener("mouseover", callAnimation);
    hoverParentEl.addEventListener("mouseout", function () {
      callAnimation(false);
    });
  });
};

// ------ call the function -----
// ---------- Now calling the functions on scroll ----------
window.addEventListener("scroll", function () {
  // const animateOnScroll = setTimeout(function () {
  scrachedBgEls.forEach(function (scrachedBgRoundedEl) {
    const childrenEls = scrachedBgRoundedEl.children;
    animateEl(childrenEls[1], childrenEls[2], childrenEls[3]);
  });
  animateEl(...fadeUpEls);
  callMultipleAnimateEl(...allSplitedTextEls, ...allMultipleAnimateEls);
  // }, 300);
  // this.clearTimeout(animateOnScroll);
});

// ---------- Now calling the functions on hover ----------
callMultipleAnimateElHover(...allMultipleAnimateElsHover);

// ---------- calling the initial functions on load ----------
setTimeout(function () {
  callMultipleAnimateEl(allSplitedTextEls[0], allMultipleAnimateEls[0]);
  animateEl(fadeUpEls[0], fadeUpEls[1]);
  const childrenEls = scrachedBgEls[0].children;
  animateEl(childrenEls[1], childrenEls[2], childrenEls[3]);
}, 600);
