const tabs = document.querySelector(".tabs");
const panels = document.querySelectorAll(".panel");
const selectElement = element => document.querySelector(element);
const selectAllElements = elements => document.querySelectorAll(elements);

function isMobile() {
  return document.body.clientWidth < 1024 ? true : false;
}

function isInHeader() {
  return window.pageYOffset < 600 ? true : false;
}

// Handles hamburger and brands color on click

selectElement(".hamburger").addEventListener("click", function() {
  if (isInHeader() && isMobile()) {
    selectElement(".navbar-brand").classList.toggle("navbar-brand-onscroll");
    selectElement(".hamburger").classList.toggle("active");
    selectAllElements(".hamburger .line").forEach(line =>
      line.classList.toggle("hamburger-line-onscroll")
    );
  } else {
    selectElement(".hamburger").classList.toggle("active");
  }

  selectElement(".nav-list").classList.toggle("active");
});

// Widthdraws the white background on the menu on click on mobile

selectElement(".nav-list").addEventListener("click", function(event) {
  if (event.target.tagName === "A" && isMobile() && isInHeader()) {
    event.target.parentElement.parentElement.classList.remove("active");
    selectElement(".hamburger").classList.remove("active");
    selectElement(".navbar-brand").classList.remove("navbar-brand-onscroll");
    selectAllElements(".hamburger .line").forEach(line =>
      line.classList.remove("hamburger-line-onscroll")
    );
  } else if (event.target.tagName === "A" && isMobile()) {
    selectElement(".hamburger").classList.remove("active");
    event.target.parentElement.parentElement.classList.remove("active");
  }
});

// Auxiliar functions to handle multiple style changes

function addColoredStyleToNavigation() {
  selectElement(".container").classList.add("nav-container-onscroll");
  selectElement(".navbar-brand").classList.add("navbar-brand-onscroll");
  selectAllElements(".nav-link").forEach(link =>
    link.classList.add("nav-link-onscroll")
  );
  selectAllElements(".hamburger .line").forEach(line =>
    line.classList.add("hamburger-line-onscroll")
  );
}

function removeColoredStyleToNavigation() {
  selectElement(".container").classList.remove("nav-container-onscroll");
  selectElement(".navbar-brand").classList.remove("navbar-brand-onscroll");
  selectAllElements(".nav-link").forEach(link =>
    link.classList.remove("nav-link-onscroll")
  );
  selectAllElements(".hamburger .line").forEach(line =>
    line.classList.remove("hamburger-line-onscroll")
  );
}

// Handles the nav main colors on scroll

document.addEventListener("scroll", function(event) {
  const isActive = [...selectElement(".nav-list").classList].includes("active");

  if (isMobile() && isInHeader() && isActive) {
    addColoredStyleToNavigation();
  } else if (isMobile() && !isInHeader()) {
    addColoredStyleToNavigation();
  } else if (!isInHeader()) {
    addColoredStyleToNavigation();
  } else {
    removeColoredStyleToNavigation();
  }
});

tabs.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    const targetPanel = document.querySelector(event.target.dataset.target);
    panels.forEach(panel => {
      if (panel.id === targetPanel.id) {
        panel.classList.add("active");
        const activeButton = document.getElementById(`${panel.id}Button`);
        activeButton.classList.add("activeButton");
      } else {
        const notActiveButton = document.getElementById(`${panel.id}Button`);
        panel.classList.remove("active");
        notActiveButton.classList.remove("activeButton");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", init);

class Typewritter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDelenting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullText = this.words[current];
    if (this.isDelenting) {
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class'txt'>${this.txt}</span>`;

    let typeSpeed = 300;
    if (this.isDelenting) {
      typeSpeed /= 2;
    }

    if (!this.isDelenting && this.txt === fullText) {
      typeSpeed = this.wait;
      this.isDelenting = true;
    } else if (this.isDelenting && this.txt === "") {
      this.isDelenting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

function init() {
  const txtElement = document.querySelector(".text-typing");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new Typewritter(txtElement, words, wait);
}
