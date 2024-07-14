let menuicon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuicon.onclick = () => {
  menuicon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header .navbar a");

window.onscroll = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header .navbar a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuicon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 500,
});

ScrollReveal().reveal(".home-content , heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container , .portfolio-box , .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-contact h1 , .about-img", { origin: "left" });
Scrollreveal().reveal(".home-contact p , .about-content", { origin: "right" });

var typed = new typed("#multiple-text", {
  strings: ["Front-end", "Back-end", "Web Developer", "Programmer"],
  typeSpeed: 100,
  loop: true,
});
