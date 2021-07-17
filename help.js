//implementing tabbed feature

let tabContainer = document.querySelector(".operations__header");
let tabs = document.querySelectorAll(".tab");
let operationsContent = document.querySelectorAll(".operations__content");
//adding the tabbed component
tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  let clicked = e.target.closest(".tab");

  //managing the click!
  if (!clicked.classList.contains("tab")) return;
  //main function
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //changing the content

  operationsContent.forEach((each) =>
    each.classList.remove("operations__content--active")
  );

  let num = +clicked.dataset.tab;
  console.log(num);

  document
    .querySelector(`.operations__content[data-content ="${num}"]`)
    .classList.add("operations__content--active");
});

//smooth displaying
let sect1 = document.querySelector(".section--1");
let sect = document.querySelectorAll(".sect");
let sections = document.querySelectorAll(".section");

let o = {
  root: null,
  threshold: 0.15,
};

sect1.classList.add("section__hidden");
let c = function (entries) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting === true) {
      sections.forEach((section) => section.classList.add("section__hidden"));
      entry.target
        .querySelector(".section")
        .classList.remove("section__hidden");
    } else {
      entry.target.querySelector(".section").classList.add("section__hidden");
    }
  });
};

let sectionObserver = new IntersectionObserver(c, o);
sect.forEach((section) => sectionObserver.observe(section));

//adding lazy loading images

let featuresImage = document.querySelectorAll(".features__image");
let workFunction = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting === false) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function (e) {
      e.target.classList.remove("blur");
    });
  });
};

let optionsObject = {
  root: null,
  threshold: 0.15,
  rootMargin: `5px`,
};

let imageObserver = new IntersectionObserver(workFunction, optionsObject);

featuresImage.forEach((image) => imageObserver.observe(image));

//slider component
let slides = document.querySelectorAll(".slide");
let btnLeft = document.querySelector(".btn-left");
let btnRight = document.querySelector(".btn-right");
let currentSlide = 0;

//setting initial conditions

let slider = document.querySelector(".slider");

let html = `<div class = "dot-container" ></div>`; //set display  inline block

slider.insertAdjacentHTML("beforeend", html);

let dotContainer = document.querySelector(".dot-container");

dotContainer;
slides.forEach((_, index) =>
  dotContainer.insertAdjacentHTML(
    "beforeend",
    `<button class = "dot" data-dot = "${index}"> </button>`
  )
);

let dots = document.querySelectorAll(".dot");

//1 go to slide
let goToSlide = function (slideNum) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translate(${(index - slideNum) * 100}%)`)
  );
};

//2 activatig dots
let activateDot = function () {
  //current slide <=> dot pressed
  dots.forEach((dot) => dot.classList.add("dot__transition"));
  document
    .querySelector(`.dot[data-dot = "${currentSlide}"]`)
    .classList.remove("dot__transition");
};

let init = function () {
  goToSlide(0);
  activateDot();
};

init();

//adding functions

//go to next slide
let goToNextSlide = function () {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
    goToSlide(currentSlide);
  } else {
    currentSlide++;
    goToSlide(currentSlide);
  }
  activateDot();
};

//go to previous slide
let goToPreviousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
    goToSlide(currentSlide);
  } else {
    currentSlide--;
    goToSlide(currentSlide);
  }
  activateDot();
};

/////////////////////////////////////event listeners
//adding left right buttons
btnRight.addEventListener("click", goToNextSlide);
btnLeft.addEventListener("click", goToPreviousSlide);

////////////////////////////adding dots in the slider component

dots.forEach((dot) => dot.classList.add("dot__transition"));

dotContainer.addEventListener("mouseover", function (e) {
  e.preventDefault();
  //relevent clicks
  if (!e.target.classList.contains("dot")) return;

  e.target.classList.remove("dot__transition");
});

dotContainer.addEventListener("mouseout", function (e) {
  e.preventDefault();
  //checking relevent clicks
  if (!e.target.classList.contains("dot")) return;

  dots.forEach((dote) => {
    if (+dote.dataset.dot !== currentSlide) {
      dote.classList.add("dot__transition");
    }
  });
});

//adding event listener to dots
dotContainer.addEventListener("click", function (e) {
  e.preventDefault();

  //checking clicks
  if (!e.target.classList.contains("dot")) return;
  currentSlide = +e.target.dataset.dot;
  console.log(currentSlide);
  goToSlide(currentSlide);
  activateDot();
});
// };

//implementing with keyboard
document.addEventListener("keydown", function (e) {
  if (e.key === `ArrowLeft`) goToPreviousSlide();
  else if (e.key === `ArrowRight`) goToNextSlide();

  activateDot();
});

//smooth scrolling
let modalButton = document.querySelector(".modal-button");
let modal = document.querySelector(".modal");

let navLinkContainer = document.querySelector(".nav__links");

navLinkContainer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(`hey`);

  //matching

  if (e.target.classList.contains("nav__link")) {
    console.log(`hey`);
    let id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  } else if (e.target.classList.contains("btn--Open-Account")) {
    console.log(`in the btn`);
    modal.classList.remove("modal-hidden");
  } else return;
});

navLinkContainer.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("nav__link")) return;
  e.target.classList.add("animated-navigation");
});

navLinkContainer.addEventListener("mouseout", function (e) {
  if (!e.target.classList.contains("nav__link")) return;
  e.target.classList.remove("animated-navigation");
});
//learn more feature
let section1 = document.querySelector("#section1");
let btnLearnMore = document.querySelector(".btn--learn-more");

btnLearnMore.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

//modal window display

let btnCreateAccount = document.querySelector(".btn--create-account");
btnCreateAccount.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(`in the terminating bnt`);
  modal.classList.add("modal-hidden");
});

//sticky navigation
let navigation = document.querySelector("nav");
let header = document.querySelector("header");

let working = {
  root: null,
  threshold: [0, 1],
  rootMargin: `${navigation.getBoundingClientRect().height}px`,
};

let calling = function (entries) {
  // console.log(`in the header`);
  entries.forEach((entry) => {
    if (entry.isIntersecting === false) {
      // console.log(entry.target);
      navigation.classList.add("sticky");
    } else {
      navigation.classList.remove("sticky");
    }
  });
};

let headerObserever = new IntersectionObserver(calling, working);
headerObserever.observe(header);

console.log(navigation.children);

let navLinks = document.querySelectorAll(".nav__link");

navLinkContainer.addEventListener("mouseover", function (e) {
  e.preventDefault();
  //managing clicks
  if (
    !e.target.classList.contains("nav__link") ||
    !e.target.classList.contains("btn--Open-Account")
  )
    return;

  //task
  console.log(`good to se u`);

  e.target.classList.add("animated-navigation");
});

console.log();

navigation.querySelector("img").addEventListener("mouseover", function (e) {
  e.target.classList.add("rotateLogo");
});

navigation.querySelector("img").addEventListener("mouseout", function (e) {
  e.target.classList.remove("rotateLogo");
});
//additional events
